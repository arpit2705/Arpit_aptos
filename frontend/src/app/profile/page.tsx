"use client";

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useEffect, useState } from "react";
import { MODULE_ADDRESS } from "../../constants";
import { aptosClient } from "@/lib/aptosClient";

export default function ProfilePage() {
    const { account } = useWallet();
    const [profile, setProfile] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!account) return;
        fetchProfile();
    }, [account]);

    const fetchProfile = async () => {
        setIsLoading(true);
        try {
            const resource = await aptosClient.getAccountResource(
                account!.address,
                `${MODULE_ADDRESS}::crowdfix::UserProfile`
            );
            setProfile(resource.data);
        } catch (e) {
            console.log("Profile not found or error fetching:", e);
        } finally {
            setIsLoading(false);
        }
    };

    if (!account) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <h1 className="text-2xl font-bold mb-4">Please connect your wallet</h1>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8">User Profile</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard label="Total Issues" value={profile?.issue_count || 0} icon="📝" />
                <StatCard label="Resolved" value={profile?.resolved_count || 0} icon="✅" />
                <StatCard label="CrowdPoints" value={profile?.crowd_points || 0} icon="💰" />
                <StatCard label="Day Streak" value={profile?.streak || 0} icon="🔥" />
            </div>

            {/* Badges Section */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h2 className="text-xl font-bold mb-4">Achievements</h2>
                <div className="flex flex-wrap gap-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex-shrink-0 w-24 h-24 bg-slate-900 rounded-lg flex flex-col items-center justify-center border border-slate-700 opacity-75 hover:opacity-100 transition-opacity">
                            <div className="text-2xl mb-1">🏅</div>
                            <div className="text-xs text-center text-slate-400">Badge {i}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, icon }: { label: string, value: number, icon: string }) {
    return (
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex items-center space-x-4">
            <div className="text-4xl">{icon}</div>
            <div>
                <div className="text-slate-400 text-sm">{label}</div>
                <div className="text-2xl font-bold">{value}</div>
            </div>
        </div>
    );
}
