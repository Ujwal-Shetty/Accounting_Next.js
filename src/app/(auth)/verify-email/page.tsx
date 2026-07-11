"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { verifyEmailAction } from "@/actions/auth-actions";

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!token) {
            setStatus("error");
            setError("No verification token was provided.");
            return;
        }
        verifyEmailAction(token).then((result) => {
            if (result.success) setStatus("success");
            else {
                setStatus("error");
                setError(result.error ?? "Verification failed.");
            }
        });
    }, [token]);

    if (status === "verifying") {
        return (
            <div className="text-center py-4">
                <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-sm text-slate-600 dark:text-slate-400">Verifying your email...</p>
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Verification failed</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">{error}</p>
                <Link href="/signin" className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/25">
                    Back to sign in
                </Link>
            </div>
        );
    }

    return (
        <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Email verified</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">Your email has been confirmed. Let&apos;s set up your company.</p>
            <Link href="/create-company" className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
                Continue to create your company
            </Link>
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />}>
            <VerifyEmailContent />
        </Suspense>
    );
}