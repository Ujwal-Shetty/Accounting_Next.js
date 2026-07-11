"use server"

import bcrypt from "bcryptjs"
import crypto from "crypto"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import {
    CreateCompanySchema,
    InviteUserSchema,
    AcceptInviteSchema,
    type CreateCompanyInput,
    type InviteUserInput,
    type AcceptInviteInput,
} from "@/lib/validations"

type ActionResult<T = undefined> = { success: boolean; error?: string; data?: T }

function generateToken() {
    return crypto.randomBytes(32).toString("hex")
}

export async function createCompanyAction(
    input: CreateCompanyInput
): Promise<ActionResult<{ companyId: string }>> {
    const session = await auth()
    if (!session?.user?.id) {
        return { success: false, error: "You must be signed in to create a company." }
    }

    const parsed = CreateCompanySchema.safeParse(input)
    if (!parsed.success) {
        return { success: false, error: parsed.error.issues[0].message }
    }

    const company = await prisma.$transaction(async (tx) => {
        const newCompany = await tx.company.create({ data: parsed.data })

        await tx.companyUser.create({
            data: {
                companyId: newCompany.id,
                userId: session.user.id,
                role: "OWNER",
            },
        })

        return newCompany
    })

    return { success: true, data: { companyId: company.id } }
}

export async function inviteUserAction(input: InviteUserInput): Promise<ActionResult> {
    const session = await auth()
    if (!session?.user?.id) {
        return { success: false, error: "You must be signed in to invite users." }
    }

    const parsed = InviteUserSchema.safeParse(input)
    if (!parsed.success) {
        return { success: false, error: parsed.error.issues[0].message }
    }

    const { email, role, companyId } = parsed.data

    // Only Owners/Admins of this specific company may invite.
    const membership = await prisma.companyUser.findUnique({
        where: { companyId_userId: { companyId, userId: session.user.id } },
    })

    if (!membership || (membership.role !== "OWNER" && membership.role !== "ADMIN")) {
        return { success: false, error: "You don't have permission to invite users to this company." }
    }

    const existingInvite = await prisma.invitation.findUnique({
        where: { companyId_email: { companyId, email } },
    })
    if (existingInvite && existingInvite.status === "PENDING") {
        return { success: false, error: "An invitation is already pending for this email." }
    }

    const token = generateToken()
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 7 days

    await prisma.invitation.upsert({
        where: { companyId_email: { companyId, email } },
        create: {
            email,
            role,
            companyId,
            invitedById: session.user.id,
            token,
            expiresAt,
        },
        update: {
            role,
            token,
            expiresAt,
            status: "PENDING",
            invitedById: session.user.id,
        },
    })

    console.log(
        `Invitation link for ${email}: http://localhost:3000/invite/${token}`
    )

    return { success: true }
}

export async function acceptInviteAction(
    input: AcceptInviteInput
): Promise<ActionResult> {
    const parsed = AcceptInviteSchema.safeParse(input)
    if (!parsed.success) {
        return { success: false, error: parsed.error.issues[0].message }
    }

    const { token, name, password } = parsed.data

    const invitation = await prisma.invitation.findUnique({ where: { token } })

    if (!invitation || invitation.status !== "PENDING") {
        return { success: false, error: "This invitation is invalid or has already been used." }
    }

    if (invitation.expiresAt < new Date()) {
        await prisma.invitation.update({
            where: { id: invitation.id },
            data: { status: "EXPIRED" },
        })
        return { success: false, error: "This invitation has expired." }
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    await prisma.$transaction(async (tx) => {
        // Reuse the account if this email already has one; otherwise create it.
        let user = await tx.user.findUnique({ where: { email: invitation.email } })

        if (!user) {
            user = await tx.user.create({
                data: {
                    name,
                    email: invitation.email,
                    password: hashedPassword,
                    emailVerified: true, // accepting an invite implicitly confirms the email
                },
            })
        }

        await tx.companyUser.upsert({
            where: {
                companyId_userId: { companyId: invitation.companyId, userId: user!.id },
            },
            create: {
                companyId: invitation.companyId,
                userId: user!.id,
                role: invitation.role,
            },
            update: { role: invitation.role, status: "ACTIVE" },
        })

        await tx.invitation.update({
            where: { id: invitation.id },
            data: { status: "ACCEPTED" },
        })
    })

    return { success: true }
}

export async function getUserCompaniesAction() {
    const session = await auth()
    if (!session?.user?.id) return []

    return prisma.companyUser.findMany({
        where: { userId: session.user.id },
        include: { company: true },
    })
}

export async function getTeamMembersAction(companyId: string) {
    const session = await auth()
    if (!session?.user?.id) return []

    // Any active member of the company can view the team list.
    const membership = await prisma.companyUser.findUnique({
        where: { companyId_userId: { companyId, userId: session.user.id } },
    })
    if (!membership) return []

    return prisma.companyUser.findMany({
        where: { companyId },
        include: { user: true },
    })
}