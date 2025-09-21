"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // ✅ useRouter from next/navigation
import { api } from "@/lib/api";

export default function GroupPage() {
    const { id } = useParams();
    const router = useRouter();

    const [group, setGroup] = useState<any>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const g = await api.get(`/groups/${id}`);
                setGroup(g);
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, [id]);

    if (!group) return <p>Loading...</p>;

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">{group.name}</h1>

            {/* Members */}
            <div>
                <h2 className="font-semibold mb-2">Members</h2>
                <ul className="list-disc ml-6">
                    {group.members.map((m: any) => (
                        <li key={m._id}>{m.name || m.email}</li>
                    ))}
                </ul>
            </div>

            {/* Expenses */}
            <div>
                <h2 className="font-semibold mb-2">Expenses</h2>
                {group.expenses.length === 0 ? (
                    <p className="text-gray-500">No expenses yet.</p>
                ) : (
                    <div className="space-y-2">
                        {group.expenses.map((exp: any) => (
                            <div key={exp._id} className="border rounded p-2">
                                <p>
                                    {exp.title || exp.description} — ₹{exp.amount}
                                </p>
                                {exp.paidBy && (
                                    <p className="text-sm text-gray-500">
                                        Paid by {exp.paidBy.name || exp.paidBy.email}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Balances */}
            <div>
                <h2 className="font-semibold mb-2">Balances</h2>
                {group.balances.length === 0 ? (
                    <p className="text-gray-500">No balances yet.</p>
                ) : (
                    <ul className="list-disc ml-6">
                        {group.balances.map((b: any) => {
                            const user = group.members.find(
                                (m: any) => m._id === b.user
                            );
                            return (
                                <li key={b._id}>
                                    {user?.name || user?.email}:{" "}
                                    {b.balance >= 0
                                        ? `gets back ₹${b.balance}`
                                        : `owes ₹${Math.abs(b.balance)}`}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>

            {/* Actions */}
            <div className="flex gap-4">
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={() => router.push(`/dashboard/groups/${id}/add-expense`)}
                >
                    + Add Expense
                </button>

                <button
                    className="bg-green-600 text-white px-4 py-2 rounded"
                    onClick={() => router.push(`/dashboard/groups/${id}/settle`)}
                >
                    💰 Settle
                </button>
            </div>
        </div>
    );
}
