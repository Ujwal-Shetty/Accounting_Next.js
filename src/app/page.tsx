import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-[family-name:var(--font-geist-sans)]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-indigo-100/60 via-violet-100/40 to-transparent dark:from-indigo-950/40 dark:via-violet-950/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-sky-100/50 via-cyan-100/30 to-transparent dark:from-sky-950/30 dark:via-cyan-950/15 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200/50 dark:border-indigo-500/20 mb-8 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                Trusted by 10,000+ businesses
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-balance">
              <span className="bg-gradient-to-br from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                Smart Accounting
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>

            <p className="mt-6 text-lg md:text-xl leading-8 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-balance">
              Streamline your finances with intelligent invoicing, real-time expense tracking, and automated reports. Everything you need to grow your business — in one platform.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signin"
                className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                Get Started Free
                <svg
                  className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-slate-700 dark:text-slate-300 rounded-2xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-slate-400 dark:hover:border-slate-600 transition-all duration-200"
              >
                See How It Works
              </Link>
            </div>

            {/* Social Proof */}
            <div className="mt-14 flex items-center justify-center gap-3">
              <div className="flex -space-x-3">
                {[
                  "bg-gradient-to-br from-amber-400 to-orange-500",
                  "bg-gradient-to-br from-emerald-400 to-teal-500",
                  "bg-gradient-to-br from-sky-400 to-blue-500",
                  "bg-gradient-to-br from-pink-400 to-rose-500",
                ].map((color, i) => (
                  <div
                    key={i}
                    className={`w-9 h-9 rounded-full ${color} ring-2 ring-white dark:ring-slate-950 flex items-center justify-center text-xs font-bold text-white`}
                  >
                    {["AK", "SJ", "MR", "LP"][i]}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  4.9/5 from 2,000+ reviews
                </p>
              </div>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-20 relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-purple-500/20 rounded-3xl blur-2xl" />
            <div className="relative rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-2xl shadow-slate-900/10 dark:shadow-black/30 overflow-hidden">
              {/* Browser Chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-7 rounded-lg bg-slate-200/80 dark:bg-slate-700/50 max-w-md mx-auto flex items-center justify-center">
                    <span className="text-xs text-slate-400 dark:text-slate-500">app.accubooks.com/dashboard</span>
                  </div>
                </div>
              </div>
              {/* Dashboard Content */}
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
                  {[
                    { label: "Total Revenue", value: "₹12,45,890", change: "+12.5%", color: "text-emerald-500", icon: "↗" },
                    { label: "Pending Invoices", value: "₹3,24,500", change: "23 invoices", color: "text-amber-500", icon: "⏳" },
                    { label: "Expenses", value: "₹5,67,230", change: "-8.3%", color: "text-emerald-500", icon: "↘" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50"
                    >
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                      <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                      <p className={`mt-1 text-sm font-medium ${stat.color}`}>
                        {stat.icon} {stat.change}
                      </p>
                    </div>
                  ))}
                </div>
                {/* Chart Placeholder */}
                <div className="h-48 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/30 dark:to-slate-800/50 border border-slate-100 dark:border-slate-700/50 flex items-end justify-around px-6 pb-6 gap-3">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-md bg-gradient-to-t from-indigo-500 to-violet-400 opacity-80"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 lg:px-8 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">Features</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Everything you need to manage finances
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              From invoicing to tax filing, AccuBooks covers every aspect of your accounting workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Smart Invoicing",
                description: "Create professional invoices in seconds with customizable templates and automated reminders.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                ),
                gradient: "from-indigo-500 to-blue-600",
              },
              {
                title: "Expense Tracking",
                description: "Automatically categorize and track expenses with receipt scanning and bank integrations.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                ),
                gradient: "from-emerald-500 to-teal-600",
              },
              {
                title: "Financial Reports",
                description: "Generate profit & loss, balance sheets, and cash flow reports with a single click.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                ),
                gradient: "from-violet-500 to-purple-600",
              },
              {
                title: "Tax Compliance",
                description: "Stay GST-ready with automatic tax calculations, e-invoicing, and filing-ready reports.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                ),
                gradient: "from-amber-500 to-orange-600",
              },
              {
                title: "Multi-User Access",
                description: "Invite your team with role-based permissions. Accountants, managers, and staff — all in sync.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                ),
                gradient: "from-sky-500 to-cyan-600",
              },
              {
                title: "Bank Reconciliation",
                description: "Auto-match transactions with your bank statements and keep your books error-free.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                ),
                gradient: "from-rose-500 to-pink-600",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/50 hover:border-indigo-200 dark:hover:border-indigo-800/50 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg mb-5`}>
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    {feature.icon}
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative rounded-3xl overflow-hidden px-8 py-16 md:px-16 md:py-20">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Ready to simplify your accounting?
              </h2>
              <p className="mt-4 text-lg text-indigo-100 max-w-xl mx-auto">
                Join thousands of businesses that trust AccuBooks for their financial management. Start your free trial today.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/signin"
                  className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-indigo-600 bg-white rounded-2xl shadow-xl hover:bg-indigo-50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="#features"
                  className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white rounded-2xl border-2 border-white/25 hover:bg-white/10 transition-all duration-200"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-white">AccuBooks</span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} AccuBooks. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
