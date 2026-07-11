"use client";

import { useState } from "react";
import Link from "next/link";
import { forgotPasswordAction } from "@/actions/auth-actions";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        const result = await forgotPasswordAction({ email });
        setIsSubmitting(false);

        if (!result.success) {
            setError(result.error ?? "Something went wrong. Please try again.");
            return;
        }
        setSubmitted(true);
    }

    if (submitted) {
        return (
            <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                </div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Check your email</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                    If an account exists for <strong>{email}</strong>, we&apos;ve sent a password reset link.
                </p>
                <Link href="/signin" className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">Back to sign in</Link>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Forgot your password?</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">Enter your email and we&apos;ll send you a link to reset it.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
                    <input id="email" type="email" required value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="you@company.com" />
                </div>

                {error && <p className="text-sm text-red-500 bg-red-50 dark:bg-red-500/10 rounded-lg px-3 py-2">{error}</p>}

                <button type="submit" disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:hover:scale-100">
                    {isSubmitting ? "Sending..." : "Send reset link"}
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
                Remembered your password?{" "}
                <Link href="/signin" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">Sign in</Link>
            </p>
        </div>
    );
}