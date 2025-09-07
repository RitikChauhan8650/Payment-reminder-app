"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const data = await api.get("/users/me"); // ✅ backend route that returns user info
                setUser(data);
            } catch (err) {
                console.error("Error fetching profile:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, []);

    if (loading) return <p className="p-6">Loading profile...</p>;
    if (!user) return <p className="p-6">No user found. Please login.</p>;

    return (
        <div className="p-6 max-w-md mx-auto bg-white shadow rounded-lg">
            <h1 className="text-2xl font-bold mb-4">👤 My Profile</h1>

            <div className="space-y-3">
                <div>
                    <label className="block text-gray-600 text-sm">Username</label>
                    <p className="font-medium">{user.name || "N/A"}</p>
                </div>

                <div>
                    <label className="block text-gray-600 text-sm">Email</label>
                    <p className="font-medium">{user.email}</p>
                </div>
            </div>
        </div>
    );
}
