"use client";

import { useState } from "react";
import Link from "next/link";
import { signInAction } from "@/actions/auth-actions";

export default function SignInPage() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);
        try {
            // On success, signIn()'s internal redirect throws a special error that
            // Next.js intercepts to navigate — this line never resolves in that case.
            const result = await signInAction(form);
            if (!result.success) setError(result.error ?? "Invalid email or password.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Welcome back</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">Sign in to your AccuBooks account.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
                    <input id="email" type="email" required value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="you@company.com" />
                </div>

                <div>
                    <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                        <Link href="/forgot-password" className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline">Forgot password?</Link>
                    </div>
                    <input id="password" type="password" required value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Enter your password" />
                </div>

                {error && <p className="text-sm text-red-500 bg-red-50 dark:bg-red-500/10 rounded-lg px-3 py-2">{error}</p>}

                <button type="submit" disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:hover:scale-100">
                    {isSubmitting ? "Signing in..." : "Sign in"}
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">Create Free Account</Link>
            </p>
        </div>
    );
}