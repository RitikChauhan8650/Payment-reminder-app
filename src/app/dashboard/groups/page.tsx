"use client";

import { useEffect, useState } from "react";
import { api, apiFetch } from "@/lib/api";
import Link from "next/link";

export default function GroupsPage() {
    const [groups, setGroups] = useState<any[]>([]);

    useEffect(() => {
        async function fetchGroups() {
            try {
                const data = await api.get("/groups/my");
                setGroups(data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchGroups();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">My Groups</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {groups.map((g) => (
                    <Link
                        key={g._id}
                        href={`/dashboard/groups/${g._id}`}
                        className="border p-4 rounded shadow hover:shadow-md"
                    >
                        <h2 className="font-semibold">{g.name}</h2>
                        <p className="text-sm text-gray-600">
                            Members: {g.members.length}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
