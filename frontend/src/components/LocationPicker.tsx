"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapPin } from "lucide-react";

// Fix for Leaflet marker icons in Next.js
const icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

function LocationMarker({ position, setPosition }: { position: [number, number] | null, setPosition: (pos: [number, number]) => void }) {
    const map = useMapEvents({
        click(e) {
            setPosition([e.latlng.lat, e.latlng.lng]);
        },
    });

    useEffect(() => {
        if (position) {
            map.flyTo(position, map.getZoom());
        }
    }, [position, map]);

    return position === null ? null : (
        <Marker position={position} icon={icon} />
    );
}

interface LocationPickerProps {
    onLocationSelect: (location: string) => void;
}

export default function LocationPicker({ onLocationSelect }: LocationPickerProps) {
    const [position, setPosition] = useState<[number, number] | null>(null);
    const [loading, setLoading] = useState(false);

    const handleCurrentLocation = () => {
        setLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    const newPos: [number, number] = [latitude, longitude];
                    setPosition(newPos);
                    onLocationSelect(`${latitude}, ${longitude}`);
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

    const handleMapClick = (pos: [number, number]) => {
        setPosition(pos);
        onLocationSelect(`${pos[0]}, ${pos[1]}`);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-slate-700">
                    Pinpoint Location
                </label>
                <button
                    type="button"
                    onClick={handleCurrentLocation}
                    disabled={loading}
                    className="inline-flex items-center px-3 py-1.5 border border-slate-300 text-xs font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-colors"
                >
                    <MapPin className="w-3 h-3 mr-1.5 text-indigo-500" />
                    {loading ? "Locating..." : "Use Current Location"}
                </button>
            </div>

            <div className="h-[300px] w-full rounded-xl overflow-hidden border border-slate-200 shadow-inner relative z-0">
                <MapContainer
                    center={[51.505, -0.09]}
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker position={position} setPosition={handleMapClick} />
                </MapContainer>
            </div>

            {position && (
                <p className="text-xs text-slate-500 text-center">
                    Selected: {position[0].toFixed(6)}, {position[1].toFixed(6)}
                </p>
            )}
        </div>
    );
}
