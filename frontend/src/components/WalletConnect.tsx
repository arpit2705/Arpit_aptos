"use client";

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useEffect, useState } from "react";

export function WalletConnect() {
    const { connect, disconnect, connected, account, wallets } = useWallet();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // If only Petra is installed/configured, we can try to connect to it directly
    const handleConnect = async () => {
        try {
            const petra = wallets?.find((w) => w.name === "Petra");
            if (petra) {
                await connect(petra.name);
            } else {
                // Fallback or show modal if multiple wallets
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error("Error connecting wallet:", error);
            alert("Failed to connect wallet. Please make sure Petra wallet is installed.");
        }
    };

    if (connected && account) {
        return (
            <div className="flex items-center gap-2">
                <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700 text-sm font-mono text-teal-400">
                    {account.address.slice(0, 6)}...{account.address.slice(-4)}
                </div>
                <button
                    onClick={disconnect}
                    className="bg-red-500/10 text-red-400 px-3 py-2 rounded-lg hover:bg-red-500/20 transition-colors text-sm font-semibold"
                    suppressHydrationWarning
                >
                    Disconnect
                </button>
            </div>
        );
    }

    return (
        <>
            <button
                onClick={handleConnect}
                className="bg-teal-500 text-slate-900 px-6 py-2 rounded-lg font-bold hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/20"
                suppressHydrationWarning
            >
                Connect Petra
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 max-w-sm w-full">
                        <h3 className="text-xl font-bold mb-4">Select Wallet</h3>
                        <div className="space-y-2">
                            {wallets?.map((wallet) => (
                                <button
                                    key={wallet.name}
                                    onClick={async () => {
                                        try {
                                            await connect(wallet.name);
                                            setIsModalOpen(false);
                                        } catch (error) {
                                            console.error("Error connecting wallet:", error);
                                            alert("Failed to connect wallet. Please try again.");
                                        }
                                    }}
                                    className="w-full text-left px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors flex items-center justify-between"
                                >
                                    <span>{wallet.name}</span>
                                    {wallet.readyState === "Installed" && (
                                        <span className="text-xs bg-teal-500/20 text-teal-400 px-2 py-1 rounded">Installed</span>
                                    )}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="mt-4 w-full py-2 text-slate-400 hover:text-white"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
