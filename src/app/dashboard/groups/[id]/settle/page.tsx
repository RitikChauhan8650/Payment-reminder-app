"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

async function fetchGroup(id: string) {
    return api.get(`/groups/${id}`);
}

export default function SettlePage() {
    const { id } = useParams();
    const router = useRouter();

    const { data: group, isLoading } = useQuery({
        queryKey: ["group", id],
        queryFn: () => fetchGroup(id as string),
    });

    const [fromUserId, setFromUserId] = useState("");
    const [toUserId, setToUserId] = useState("");
    const [amount, setAmount] = useState<number>(0);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            await api.post(`/groups/${id}/settle`, {
                fromUserId,
                toUserId,
                amount,
            });
            router.push(`/dashboard/groups/${id}`);
        } catch (err) {
            console.error(err);
        }
    }

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Settle Payment</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block">From (payer)</label>
                    <select
                        className="border rounded w-full p-2"
                        value={fromUserId}
                        onChange={(e) => setFromUserId(e.target.value)}
                        required
                    >
                        <option value="">Select member</option>
                        {group?.members?.map((m: any) => (
                            <option key={m._id} value={m._id}>
                                {m.name} ({m.email})
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block">To (receiver)</label>
                    <select
                        className="border rounded w-full p-2"
                        value={toUserId}
                        onChange={(e) => setToUserId(e.target.value)}
                        required
                    >
                        <option value="">Select member</option>
                        {group?.members?.map((m: any) => (
                            <option key={m._id} value={m._id}>
                                {m.name} ({m.email})
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block">Amount</label>
                    <input
                        type="number"
                        className="border rounded w-full p-2"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Settle
                </button>
            </form>
        </div>
    );
}
