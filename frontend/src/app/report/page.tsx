"use client";

import { useState } from "react";
import { Camera, MapPin } from "lucide-react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { AptosClient } from "aptos";
import { MODULE_ADDRESS, MODULE_NAME, NODE_URL } from "@/constants";

const client = new AptosClient(NODE_URL);

export default function ReportPage() {
    const { account, signAndSubmitTransaction } = useWallet();
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("Pothole");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleLocation = () => {
        setLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
                    setLoading(false);
                },
                (error) => {
                    console.error(error);
                    setLoading(false);
                    alert("Unable to retrieve your location");
                }
            );
        } else {
            setLoading(false);
            alert("Geolocation is not supported by your browser");
        }
    };

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
            const payload = {
                data: {
                    function: `${MODULE_ADDRESS}::${MODULE_NAME}::report_issue`,
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
            await client.waitForTransaction(response.hash);
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
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-teal-400">Report an Issue</h1>
                <p className="text-slate-400">
                    Spot a problem? Report it to earn points and help your city.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-slate-800 p-8 rounded-xl border border-slate-700">
                {/* Image Upload */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                        Photo Evidence
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-600 border-dashed rounded-lg hover:border-teal-500 transition-colors cursor-pointer relative group">
                        <div className="space-y-1 text-center">
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="mx-auto h-48 object-cover rounded-md"
                                />
                            ) : (
                                <>
                                    <Camera className="mx-auto h-12 w-12 text-slate-400 group-hover:text-teal-400 transition-colors" />
                                    <div className="flex text-sm text-slate-400">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md font-medium text-teal-400 hover:text-teal-300 focus-within:outline-none"
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

                {/* Category */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                        Category
                    </label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="block w-full rounded-lg border-slate-600 bg-slate-900 text-slate-200 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-2.5"
                    >
                        <option>Pothole</option>
                        <option>Garbage Dump</option>
                        <option>Broken Streetlight</option>
                        <option>Wrong Parking</option>
                        <option>Water Leakage</option>
                        <option>Other</option>
                    </select>
                </div>

                {/* Location */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                        Location
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={location}
                            readOnly
                            placeholder="Coordinates"
                            className="block w-full rounded-lg border-slate-600 bg-slate-900 text-slate-200 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-2.5"
                        />
                        <button
                            type="button"
                            onClick={handleLocation}
                            disabled={loading}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-slate-900 bg-teal-500 hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
                        >
                            <MapPin className="w-4 h-4 mr-2" />
                            {loading ? "Locating..." : "Get Location"}
                        </button>
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-300">
                        Description
                    </label>
                    <textarea
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="block w-full rounded-lg border-slate-600 bg-slate-900 text-slate-200 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm p-2.5"
                        placeholder="Describe the issue briefly..."
                    />
                </div>

                {/* Submit */}
                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-slate-900 bg-teal-500 hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                        Submit Report
                    </button>
                </div>
            </form>
        </div>
    );
}
