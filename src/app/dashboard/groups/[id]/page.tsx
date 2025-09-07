"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

async function fetchGroup(id: string) {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:4000/groups/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
}

export default function GroupDetailPage() {
    const { id } = useParams();
    const { data, isLoading } = useQuery({
        queryKey: ["group", id],
        queryFn: () => fetchGroup(id as string),
    });

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold">{data?.name}</h1>

            <h2 className="mt-4 font-semibold">Members</h2>
            <ul className="list-disc ml-6">
                {data?.members?.map((m: any) => (
                    <li key={m._id}>{m.email}</li>
                ))}
            </ul>

            <h2 className="mt-4 font-semibold">Expenses</h2>
            <ul className="list-disc ml-6">
                {data?.expenses?.map((e: any) => (
                    <li key={e._id}>
                        {e.description} - ₹{e.amount} (paid by {e.paidBy.email})
                    </li>
                ))}
            </ul>

            <a
                href={`/groups/${id}/settle`}
                className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded"
            >
                Settle Up
            </a>
        </div>
    );
}
