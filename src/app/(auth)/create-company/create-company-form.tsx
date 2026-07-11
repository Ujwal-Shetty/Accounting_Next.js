"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCompanyAction } from "@/actions/company-actions";

export function CreateCompanyForm() {
    const router = useRouter();
    const [form, setForm] = useState({ name: "", gstNumber: "", address: "", phone: "", email: "" });
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        const result = await createCompanyAction({ ...form, financialYearStart: 4 });
        setIsSubmitting(false);

        if (!result.success) {
            setError(result.error ?? "Something went wrong. Please try again.");
            return;
        }
        router.push("/dashboard");
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Set up your company</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">You&apos;ll be the Owner of this company and can invite your team afterward.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Company name</label>
                    <input id="name" type="text" required value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Acme Manufacturing Pvt Ltd" />
                </div>

                <div>
                    <label htmlFor="gstNumber" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        GST number <span className="text-slate-400 font-normal">(optional)</span>
                    </label>
                    <input id="gstNumber" type="text" value={form.gstNumber}
                        onChange={(e) => setForm({ ...form, gstNumber: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="22AAAAA0000A1Z5" />
                </div>

                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Address <span className="text-slate-400 font-normal">(optional)</span>
                    </label>
                    <input id="address" type="text" value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Street, City, State" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                            Phone <span className="text-slate-400 font-normal">(optional)</span>
                        </label>
                        <input id="phone" type="tel" value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="+91 98765 43210" />
                    </div>

                    <div>
                        <label htmlFor="companyEmail" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                            Email <span className="text-slate-400 font-normal">(optional)</span>
                        </label>
                        <input id="companyEmail" type="email" value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="accounts@acme.com" />
                    </div>
                </div>

                {error && <p className="text-sm text-red-500 bg-red-50 dark:bg-red-500/10 rounded-lg px-3 py-2">{error}</p>}

                <button type="submit" disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:hover:scale-100">
                    {isSubmitting ? "Creating company..." : "Create company & continue"}
                </button>
            </form>
        </div>
    );
}