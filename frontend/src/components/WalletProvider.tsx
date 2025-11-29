"use client";

import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { PropsWithChildren } from "react";
import { PetraWallet } from "petra-plugin-wallet-adapter";

const wallets = [new PetraWallet()];

export const WalletProvider = ({ children }: PropsWithChildren) => {
    // Disable autoConnect to prevent errors when wallet is not ready
    // autoConnect can cause issues if the wallet extension hasn't loaded yet
    return (
        <AptosWalletAdapterProvider 
            plugins={wallets} 
            autoConnect={false}
        >
            {children}
        </AptosWalletAdapterProvider>
    );
};
