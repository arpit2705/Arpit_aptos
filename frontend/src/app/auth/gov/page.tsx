"use client";

import { useRouter } from "next/navigation";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { ArrowRight, Building2, ShieldCheck } from "lucide-react";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";

export default function GovAuthPage() {
    const { connected } = useWallet();
    const router = useRouter();

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-8">
            <div className="text-center space-y-4 max-w-md">
                <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6 relative">
                    <Building2 className="w-10 h-10 text-slate-700" />
                    <div className="absolute -top-2 -right-2 bg-emerald-500 p-1.5 rounded-full border-4 border-white">
                        <ShieldCheck className="w-4 h-4 text-white" />
                    </div>
                </div>
                <h1 className="text-4xl font-extrabold text-slate-900">Government Login</h1>
                <p className="text-slate-600 text-lg">
                    Authorized personnel only. Connect admin wallet to access the dashboard.
                </p>
            </div>

            <div className="w-full max-w-sm bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col items-center space-y-6">
                <div className="w-full">
                    <WalletSelector />
                </div>

                {connected && (
                    <div className="w-full pt-4 border-t border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <p className="text-sm text-center text-emerald-600 font-medium mb-4 bg-emerald-50 py-2 rounded-lg">
                            Admin Wallet Connected!
                        </p>
                        <button
                            onClick={() => router.push("/admin")}
                            className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl transition-all hover:scale-[1.02]"
                        >
                            Enter Dashboard <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
