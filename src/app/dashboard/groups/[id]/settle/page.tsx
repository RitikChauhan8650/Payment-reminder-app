"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

async function fetchBalances(id: string) {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:4000/groups/${id}/balances`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
}

async function settleDebt({ groupId, from, to }: any) {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:4000/groups/${groupId}/settle`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ from, to }),
    });
    return res.json();
}

export default function SettlePage() {
    const { id } = useParams();
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: ["balances", id],
        queryFn: () => fetchBalances(id as string),
    });

    const mutation = useMutation({
        mutationFn: settleDebt,
        onSuccess: () => {
            queryClient.invalidateQueries(["balances", id]);
        },
    });

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold">Settlement</h1>
            <ul className="mt-4 space-y-2">
                {data?.map((b: any, idx: number) => (
                    <li key={idx} className="flex justify-between items-center border p-2 rounded">
                        <span>
                            {b.from.email} owes {b.to.email} ₹{b.amount}
                        </span>
                        <button
                            onClick={() => mutation.mutate({ groupId: id, from: b.from._id, to: b.to._id })}
                            className="bg-green-600 text-white px-3 py-1 rounded"
                        >
                            Settle
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
