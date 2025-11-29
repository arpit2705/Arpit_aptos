"use client";

import Link from "next/link";
import { User, Building2, ArrowRight } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="min-h-[80vh] flex flex-col justify-center items-center space-y-20 relative">
            {/* Decorative Background Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-indigo-200/20 to-blue-200/20 blur-3xl -z-10 rounded-full pointer-events-none" />

            <header className="text-center space-y-6 max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-4">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">Live on Aptos Testnet</span>
                </div>
                <h1 className="text-6xl font-extrabold tracking-tight lg:text-8xl text-slate-900">
                    Empowering <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">Communities</span>
                </h1>
                <p className="text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
                    The decentralized platform for civic engagement. Report issues, verify fixes, and earn rewards on-chain.
                </p>
            </header>

            <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl px-4 relative z-10">
                {/* Citizen Card */}
                <div className="group relative bg-white rounded-3xl p-10 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-2">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-indigo-500" />
                    <div className="space-y-6">
                        <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <User className="w-8 h-8 text-blue-600" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold text-slate-900">Citizen</h2>
                            <p className="text-slate-600 text-lg">
                                I want to report issues, track progress, and earn rewards for improving my city.
                            </p>
                        </div>
                        <Link href="/auth/citizen" className="inline-flex items-center gap-2 text-blue-600 font-bold text-lg group-hover:gap-4 transition-all">
                            Citizen Login <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

                {/* Government Card */}
                <div className="group relative bg-white rounded-3xl p-10 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-2">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-slate-700 to-slate-900" />
                    <div className="space-y-6">
                        <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Building2 className="w-8 h-8 text-slate-700" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold text-slate-900">Government</h2>
                            <p className="text-slate-600 text-lg">
                                I am an official reviewing reports, verifying fixes, and distributing rewards.
                            </p>
                        </div>
                        <Link href="/auth/gov" className="inline-flex items-center gap-2 text-slate-700 font-bold text-lg group-hover:gap-4 transition-all">
                            Government Login <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
