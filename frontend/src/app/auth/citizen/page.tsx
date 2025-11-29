"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { ArrowRight, User } from "lucide-react";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";

export default function CitizenAuthPage() {
    const { connected } = useWallet();
    const router = useRouter();

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-8">
            <div className="text-center space-y-4 max-w-md">
                <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <User className="w-10 h-10 text-blue-600" />
                </div>
                <h1 className="text-4xl font-extrabold text-slate-900">Citizen Sign In</h1>
                <p className="text-slate-600 text-lg">
                    Connect your wallet to report issues, track progress, and earn rewards.
                </p>
            </div>

            <div className="w-full max-w-sm bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col items-center space-y-6">
                <div className="w-full">
                    <WalletSelector />
                </div>

                {connected && (
                    <div className="w-full pt-4 border-t border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <p className="text-sm text-center text-emerald-600 font-medium mb-4 bg-emerald-50 py-2 rounded-lg">
                            Wallet Connected Successfully!
                        </p>
                        <button
                            onClick={() => router.push("/feed")}
                            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all hover:scale-[1.02]"
                        >
                            Continue to App <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
