"use client";

import { useEffect, useState } from "react";
import { MapPin, ThumbsUp } from "lucide-react";
import { MODULE_ADDRESS, MODULE_NAME } from "@/constants";
import { aptosClient } from "@/lib/aptosClient";

type Issue = {
    id: string;
    reporter: string;
    category: string;
    description: string;
    location: string;
    image_url: string;
    status: number; // 0: Pending, 1: Resolved, 2: Rejected
    timestamp: string;
};

export default function FeedPage() {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchIssues();
    }, []);

    const fetchIssues = async () => {
        setIsLoading(true);
        try {
            const payload = {
                function: `${MODULE_ADDRESS}::${MODULE_NAME}::get_all_issues`,
                type_arguments: [],
                arguments: [],
            };
            const response = await aptosClient.view(payload);
            const allIssues = response[0] as any[];

            const formattedIssues = allIssues.map((issue: any) => ({
                id: issue.id,
                reporter: issue.reporter,
                category: issue.category,
                description: issue.description,
                location: issue.location,
                image_url: issue.image_url,
                status: issue.status,
                timestamp: new Date(parseInt(issue.timestamp) * 1000).toLocaleString(),
            }));

            // Show all issues (Pending, Resolved, Rejected) or filter if needed
            // For feed, we probably want to show everything to show activity
            setIssues(formattedIssues.reverse()); // Newest first
        } catch (error) {
            console.error("Error fetching issues:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusLabel = (status: number) => {
        switch (status) {
            case 0: return "Pending";
            case 1: return "Resolved";
            case 2: return "Rejected";
            default: return "Unknown";
        }
    };

    const getStatusColor = (status: number) => {
        switch (status) {
            case 0: return "bg-amber-500";
            case 1: return "bg-emerald-500";
            case 2: return "bg-red-500";
            default: return "bg-slate-500";
        }
    };

    return (
        <div className="space-y-16 relative py-12">
            <header className="text-center space-y-8">
                <div className="space-y-4">
                    <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-4">
                        Community Feed
                    </span>
                    <h1 className="text-5xl font-extrabold tracking-tight lg:text-6xl text-slate-900">
                        Recent <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">Reports</span>
                    </h1>
                </div>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
                    See what's happening in your community and vote on issues that matter.
                </p>
            </header>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                    <p className="text-slate-500 font-medium">Loading community reports...</p>
                </div>
            ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {issues.map((issue) => (
                        <div key={issue.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                            <div className="aspect-video relative bg-slate-100 overflow-hidden">
                                <img
                                    src={issue.image_url}
                                    alt={issue.category}
                                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=No+Image";
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute top-4 right-4 bg-white/95 px-3 py-1.5 rounded-full text-xs font-bold text-slate-800 shadow-sm backdrop-blur-sm flex items-center gap-1.5">
                                    <span className={`w-2 h-2 rounded-full ${getStatusColor(issue.status)}`} />
                                    {getStatusLabel(issue.status)}
                                </div>
                            </div>
                            <div className="p-6 space-y-5">
                                <div className="flex items-center justify-between">
                                    <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{issue.category}</span>
                                    <span className="text-slate-400 text-xs font-medium">{issue.timestamp}</span>
                                </div>
                                <h3 className="font-bold text-xl text-slate-900 leading-snug group-hover:text-primary transition-colors line-clamp-2">{issue.description}</h3>
                                <div className="flex items-center text-slate-500 text-sm">
                                    <MapPin className="w-4 h-4 mr-2 text-indigo-400" />
                                    {issue.location}
                                </div>
                                <div className="pt-5 border-t border-slate-50 flex items-center justify-between text-slate-500">
                                    <button className="flex items-center space-x-2 hover:text-primary transition-colors group/btn">
                                        <div className="p-1.5 rounded-full bg-slate-50 group-hover/btn:bg-indigo-50 transition-colors">
                                            <ThumbsUp className="w-4 h-4" />
                                        </div>
                                        <span className="font-semibold">0</span>
                                    </button>
                                    <div className="text-xs font-medium flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400" />
                                        <span className="text-slate-700">{issue.reporter.slice(0, 6)}...{issue.reporter.slice(-4)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {issues.length === 0 && (
                        <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-slate-200 border-dashed">
                            <p className="text-slate-500 text-lg">No reports yet. Be the first to report an issue!</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
