"use client";

import { useState } from "react";
import { Camera } from "lucide-react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { MODULE_ADDRESS, MODULE_NAME } from "@/constants";
import { aptosClient } from "@/lib/aptosClient";
import dynamic from "next/dynamic";

// Dynamically import LocationPicker to avoid SSR issues with Leaflet
const LocationPicker = dynamic(() => import("@/components/LocationPicker"), {
    ssr: false,
    loading: () => <div className="h-[300px] w-full bg-slate-100 rounded-xl animate-pulse flex items-center justify-center text-slate-400">Loading Map...</div>
});

export default function ReportPage() {
    const { account, signAndSubmitTransaction } = useWallet();
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("Pothole");
    const [description, setDescription] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!account) {
            alert("Please connect your wallet first!");
            return;
        }
        if (!location || !description) {
            alert("Please fill in all fields");
            return;
        }

        try {
            const payload: any = {
                data: {
                    function: `${MODULE_ADDRESS}::${MODULE_NAME}::report_issue`,
                    typeArguments: [],
                    functionArguments: [
                        category,
                        description,
                        location,
                        // imagePreview is too large (base64). In a real app, upload to IPFS and send URL.
                        // For now, we send a placeholder to avoid EXCEEDED_MAX_TRANSACTION_SIZE.
                        "https://placehold.co/600x400?text=Issue+Image",
                    ],
                },
            };

            const response = await signAndSubmitTransaction(payload);
            await aptosClient.waitForTransaction(response.hash);
            alert("Issue reported successfully! Transaction Hash: " + response.hash);
            // Reset form
            setDescription("");
            setLocation("");
            setImagePreview(null);
        } catch (error) {
            console.error("Error reporting issue:", error);
            alert("Failed to report issue.");
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8 py-8">
            <div className="space-y-3 text-center">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Report an Issue</h1>
                <p className="text-lg text-slate-600 max-w-xl mx-auto">
                    Spot a problem? Pinpoint it on the map and earn points for helping your city.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50">
                {/* Image Upload */}
                <div className="space-y-3">
                    <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide">
                        Photo Evidence
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl hover:border-indigo-500 hover:bg-slate-50 transition-all cursor-pointer relative group">
                        <div className="space-y-2 text-center">
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="mx-auto h-64 object-cover rounded-lg shadow-md"
                                />
                            ) : (
                                <>
                                    <div className="mx-auto w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Camera className="h-6 w-6 text-indigo-600" />
                                    </div>
                                    <div className="flex text-sm text-slate-600 justify-center">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md font-semibold text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                                        >
                                            <span>Upload a file</span>
                                            <input
                                                id="file-upload"
                                                name="file-upload"
                                                type="file"
                                                className="sr-only"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Category */}
                    <div className="space-y-3">
                        <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide">
                            Category
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="block w-full rounded-xl border-slate-300 bg-slate-50 text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 transition-shadow"
                        >
                            <option>Pothole</option>
                            <option>Garbage Dump</option>
                            <option>Broken Streetlight</option>
                            <option>Wrong Parking</option>
                            <option>Water Leakage</option>
                            <option>Other</option>
                        </select>
                    </div>

                    {/* Description */}
                    <div className="space-y-3">
                        <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide">
                            Description
                        </label>
                        <textarea
                            rows={1}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="block w-full rounded-xl border-slate-300 bg-slate-50 text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 transition-shadow resize-none h-[46px]"
                            placeholder="Describe the issue..."
                        />
                    </div>
                </div>

                {/* Location */}
                <div className="space-y-3">
                    <LocationPicker onLocationSelect={setLocation} />
                    <input type="hidden" value={location} required />
                </div>

                {/* Submit */}
                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-indigo-500/30 text-base font-bold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:-translate-y-0.5 transition-all"
                    >
                        Submit Report
                    </button>
                </div>
            </form>
        </div>
    );
}
