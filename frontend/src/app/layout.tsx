import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/components/WalletProvider";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "CrowdFix",
    description: "Web3 Social Reporting & Reward App",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <WalletProvider>
                    <div className="min-h-screen flex flex-col">
                        <Navbar />
                        <main className="flex-1 container mx-auto px-4 py-8 relative z-10">
                            {children}
                        </main>
                    </div>
                </WalletProvider>
            </body>
        </html>
    );
}
