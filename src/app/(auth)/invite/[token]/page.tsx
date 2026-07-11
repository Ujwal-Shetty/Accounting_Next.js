import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { InviteAcceptForm } from "./invite-accept-form";

export default async function InvitePage({
    params,
}: {
    params: Promise<{ token: string }>;
}) {
    const { token } = await params;

    const invitation = await prisma.invitation.findUnique({
        where: { token },
        include: { company: true },
    });

    if (!invitation || invitation.status !== "PENDING" || invitation.expiresAt < new Date()) {
        return (
            <div className="text-center">
                <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Invitation not found</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">This invitation link is invalid, has already been used, or has expired.</p>
                <Link href="/signin" className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/25">
                    Go to sign in
                </Link>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                Join {invitation.company.name}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                You&apos;ve been invited as{" "}
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                    {invitation.role.charAt(0) + invitation.role.slice(1).toLowerCase()}
                </span>
                . Create your account to accept.
            </p>

            <InviteAcceptForm token={token} email={invitation.email} />
        </div>
    );
}