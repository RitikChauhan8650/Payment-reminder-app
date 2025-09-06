"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import SettlementVisualizer from "@/components/SettlementModal";
import Link from "next/link";

export default function GroupDetailsPage() {
    const { id } = useParams();
    const [group, setGroup] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchGroup() {
            try {
                const data = await api.get(`/groups/${id}`);
                setGroup(data);
            } catch (err) {
                console.error("Error fetching group:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchGroup();
    }, [id]);

    if (loading) return <p className="p-6">Loading group...</p>;
    if (!group) return <p className="p-6">Group not found</p>;

    return (
        <div className="flex gap-6 p-6">
            {/* ✅ Group-specific sidebar */}
            <aside className="w-48 bg-gray-50 border-r p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-gray-700 mb-4">Group Actions</h3>
                <nav className="flex flex-col gap-2">
                    <Link
                        href={`/dashboard/groups/${id}/add-expense`}
                        className="px-3 py-2 rounded hover:bg-gray-200"
                    >
                        ➕ Add Expense
                    </Link>
                    <a
                        href="#settlement"
                        className="px-3 py-2 rounded hover:bg-gray-200"
                    >
                        💰 Settle Up
                    </a>
                </nav>
            </aside>

            {/* ✅ Main group content */}
            <div className="flex-1 space-y-6">
                {/* Group Info */}
                <div>
                    <h1 className="text-2xl font-bold">{group.name}</h1>
                    <p className="text-gray-600">
                        Members: {group.members.map((m: any) => m.email).join(", ")}
                    </p>
                </div>

                {/* Group Expenses */}
                <div>
                    <h2 className="text-lg font-semibold mb-2">Group Expenses</h2>
                    {group.expenses?.length > 0 ? (
                        <ul className="space-y-2">
                            {group.expenses.map((exp: any) => (
                                <li key={exp._id} className="border rounded-lg p-3 flex justify-between">
                                    <span>{exp.title} - ₹{exp.amount}</span>
                                    <span className="text-sm text-gray-500">
                                        {new Date(exp.dueDate).toLocaleDateString()}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No expenses yet.</p>
                    )}
                </div>

                {/* Settlement Section */}
                <div id="settlement">
                    <h2 className="text-lg font-semibold mb-2">Settle Expenses</h2>
                    <SettlementVisualizer groupId={id as string} />
                </div>
            </div>
        </div>
    );
}
