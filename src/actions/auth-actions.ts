"use server"

import bcrypt from "bcryptjs"
import crypto from "crypto"
import { AuthError } from "next-auth"
import { prisma } from "@/lib/prisma"
import { signIn, signOut } from "@/auth"
import {
    SignUpSchema,
    SignInSchema,
    ForgotPasswordSchema,
    ResetPasswordSchema,
    ChangePasswordSchema,
    type SignUpInput,
    type SignInInput,
    type ForgotPasswordInput,
    type ResetPasswordInput,
    type ChangePasswordInput,
} from "@/lib/validations"

type ActionResult = { success: boolean; error?: string }

function generateToken() {
    return crypto.randomBytes(32).toString("hex")
}

export async function signUpAction(input: SignUpInput): Promise<ActionResult> {
    const parsed = SignUpSchema.safeParse(input)
    if (!parsed.success) {
        return { success: false, error: parsed.error.issues[0].message }
    }

    const { name, email, password } = parsed.data

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
        return { success: false, error: "An account with this email already exists." }
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const emailVerificationToken = generateToken()

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            emailVerificationToken,
        },
    })

    // No email provider wired up yet — log the link so you can test the flow manually.
    // Swap this for a real email send (e.g. Resend) once you're ready.
    console.log(
        `Verification link for ${email}: http://localhost:3000/verify-email?token=${emailVerificationToken}`
    )

    return { success: true }
}

export async function verifyEmailAction(token: string): Promise<ActionResult> {
    if (!token) return { success: false, error: "Missing verification token." }

    const user = await prisma.user.findFirst({
        where: { emailVerificationToken: token },
    })

    if (!user) {
        return { success: false, error: "Invalid or expired verification link." }
    }

    await prisma.user.update({
        where: { id: user.id },
        data: {
            emailVerified: true,
            emailVerificationToken: null,
        },
    })

    return { success: true }
}

export async function signInAction(input: SignInInput): Promise<ActionResult> {
    const parsed = SignInSchema.safeParse(input)
    if (!parsed.success) {
        return { success: false, error: parsed.error.issues[0].message }
    }

    try {
        await signIn("credentials", {
            email: parsed.data.email,
            password: parsed.data.password,
            redirectTo: "/dashboard",
        })
        return { success: true }
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { success: false, error: "Invalid email or password." }
                default:
                    return { success: false, error: error.message || "Sign in failed." }
            }
        }
        // NextAuth throws a special redirect error on success — let it propagate.
        throw error
    }
}

export async function signOutAction(): Promise<void> {
    await signOut({ redirectTo: "/signin" })
}

export async function forgotPasswordAction(
    input: ForgotPasswordInput
): Promise<ActionResult> {
    const parsed = ForgotPasswordSchema.safeParse(input)
    if (!parsed.success) {
        return { success: false, error: parsed.error.issues[0].message }
    }

    const user = await prisma.user.findUnique({ where: { email: parsed.data.email } })

    // Deliberately return success even if no user is found, so this endpoint
    // can't be used to enumerate registered emails.
    if (!user) return { success: true }

    const passwordResetToken = generateToken()
    const passwordResetExpires = new Date(Date.now() + 1000 * 60 * 60) // 1 hour

    await prisma.user.update({
        where: { id: user.id },
        data: { passwordResetToken, passwordResetExpires },
    })

    console.log(
        `Password reset link for ${user.email}: http://localhost:3000/reset-password?token=${passwordResetToken}`
    )

    return { success: true }
}

export async function resetPasswordAction(
    input: ResetPasswordInput
): Promise<ActionResult> {
    const parsed = ResetPasswordSchema.safeParse(input)
    if (!parsed.success) {
        return { success: false, error: parsed.error.issues[0].message }
    }

    const { token, password } = parsed.data

    const user = await prisma.user.findFirst({
        where: {
            passwordResetToken: token,
            passwordResetExpires: { gt: new Date() },
        },
    })

    if (!user) {
        return { success: false, error: "This reset link is invalid or has expired." }
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    await prisma.user.update({
        where: { id: user.id },
        data: {
            password: hashedPassword,
            passwordResetToken: null,
            passwordResetExpires: null,
        },
    })

    return { success: true }
}

export async function changePasswordAction(
    userId: string,
    input: ChangePasswordInput
): Promise<ActionResult> {
    const parsed = ChangePasswordSchema.safeParse(input)
    if (!parsed.success) {
        return { success: false, error: parsed.error.issues[0].message }
    }

    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) return { success: false, error: "User not found." }

    const isValid = await bcrypt.compare(parsed.data.currentPassword, user.password)
    if (!isValid) {
        return { success: false, error: "Current password is incorrect." }
    }

    const hashedPassword = await bcrypt.hash(parsed.data.newPassword, 12)

    await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
    })

    return { success: true }
}