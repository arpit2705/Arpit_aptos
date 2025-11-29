"use client";

import Link from "next/link";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { WalletConnect } from "./WalletConnect";

export function Navbar() {
    const { connected } = useWallet();

    return (
        <nav className="sticky top-0 z-50 flex items-center justify-between p-6 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm transition-all" suppressHydrationWarning>
            <Link href="/" className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-500 tracking-tight">
                CrowdFix
            </Link>
            <div className="flex items-center gap-8">
                <Link href="/feed" className="text-slate-600 hover:text-primary transition-colors font-medium text-sm uppercase tracking-wide">
                    Feed
                </Link>
                <Link href="/report" className="text-slate-600 hover:text-primary transition-colors font-medium text-sm uppercase tracking-wide">
                    Report Issue
                </Link>
                <Link href="/profile" className="text-slate-600 hover:text-primary transition-colors font-medium text-sm uppercase tracking-wide">
                    Profile
                </Link>
                <Link href="/admin" className="text-slate-600 hover:text-primary transition-colors font-medium text-sm uppercase tracking-wide">
                    Government
                </Link>
                <WalletConnect />
            </div>
        </nav>
    );
}
