"use client";

import { useState } from "react";
import { MapPin, ThumbsUp, MessageSquare } from "lucide-react";

// Mock data for now
const MOCK_ISSUES = [
    {
        id: 1,
        category: "Pothole",
        description: "Deep pothole on Main St, dangerous for bikes.",
        location: "Main St & 5th Ave",
        reporter: "0x123...abc",
        votes: 12,
        status: "Pending",
        image: "https://placehold.co/600x400/2dd4bf/0f172a?text=Pothole",
        timestamp: "2 hours ago",
    },
    {
        id: 2,
        category: "Garbage",
        description: "Pile of trash left near the park entrance.",
        location: "Central Park West",
        reporter: "0x456...def",
        votes: 8,
        status: "Resolved",
        image: "https://placehold.co/600x400/2dd4bf/0f172a?text=Garbage",
        timestamp: "5 hours ago",
    },
];

export default function Home() {
    const [issues, setIssues] = useState(MOCK_ISSUES);

    return (
        <div className="space-y-8">
            <header className="text-center space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-teal-400">
                    Fix Your City, Earn Rewards
                </h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                    Report civic issues, track their resolution, and earn CrowdPoints for making your community better.
                </p>
            </header>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {issues.map((issue) => (
                    <div key={issue.id} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-teal-500/50 transition-all">
                        <div className="aspect-video relative bg-slate-900">
                            <img src={issue.image} alt={issue.category} className="object-cover w-full h-full" />
                            <div className="absolute top-2 right-2 bg-slate-900/80 px-2 py-1 rounded text-xs font-medium backdrop-blur-sm">
                                {issue.status}
                            </div>
                        </div>
                        <div className="p-5 space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-teal-400 font-semibold text-sm uppercase tracking-wider">{issue.category}</span>
                                <span className="text-slate-500 text-xs">{issue.timestamp}</span>
                            </div>
                            <h3 className="font-bold text-lg leading-tight">{issue.description}</h3>
                            <div className="flex items-center text-slate-400 text-sm">
                                <MapPin className="w-4 h-4 mr-1" />
                                {issue.location}
                            </div>
                            <div className="pt-4 border-t border-slate-700 flex items-center justify-between text-slate-400">
                                <button className="flex items-center space-x-1 hover:text-teal-400 transition-colors">
                                    <ThumbsUp className="w-4 h-4" />
                                    <span>{issue.votes}</span>
                                </button>
                                <div className="text-xs">
                                    by {issue.reporter}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
