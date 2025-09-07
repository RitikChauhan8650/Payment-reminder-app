"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function AddExpensePage() {
    const { id } = useParams();
    const router = useRouter();

    const [group, setGroup] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        title: "",
        amount: "",
        dueDate: "",
        contributions: [] as { email: string; paidAmount: number }[],
    });

    useEffect(() => {
        async function fetchGroup() {
            try {
                const data = await api.get(`/groups/${id}`);
                // Initialize contributions for each member
                setForm((prev) => ({
                    ...prev,
                    contributions: data.members.map((m: any) => ({
                        email: m.email,
                        paidAmount: 0,
                    })),
                }));
                setGroup(data);
            } catch (err) {
                console.error("Error fetching group:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchGroup();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleContributionChange = (index: number, value: number) => {
        const updated = [...form.contributions];
        updated[index].paidAmount = value;
        setForm({ ...form, contributions: updated });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post(`/groups/${id}/expenses`, {
                title: form.title,
                amount: Number(form.amount),
                dueDate: form.dueDate ? new Date(form.dueDate) : null,
                contributions: form.contributions, // ✅ send emails + paidAmount
            });
            router.push(`/dashboard/groups/${id}`);
        } catch (err) {
            console.error("Error adding expense:", err);
        }
    };

    if (loading) return <p className="p-6">Loading...</p>;
    if (!group) return <p className="p-6">Group not found</p>;

    return (
        <div className="p-6 max-w-lg mx-auto bg-white shadow rounded-lg">
            <h1 className="text-2xl font-bold mb-4">➕ Add Expense</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                    <label className="block mb-1 font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                {/* Total Amount */}
                <div>
                    <label className="block mb-1 font-medium">Total Amount (₹)</label>
                    <input
                        type="number"
                        name="amount"
                        value={form.amount}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                {/* Contributions */}
                <div>
                    <label className="block mb-2 font-medium">Contributions</label>
                    <div className="space-y-2">
                        {group.members.map((m: any, index: number) => (
                            <div
                                key={m._id}
                                className="flex items-center justify-between gap-2 border p-2 rounded"
                            >
                                <span>{m.email}</span>
                                <input
                                    type="number"
                                    placeholder="Paid ₹"
                                    value={form.contributions[index]?.paidAmount || ""}
                                    onChange={(e) =>
                                        handleContributionChange(
                                            index,
                                            Number(e.target.value)
                                        )
                                    }
                                    className="w-24 border rounded px-2 py-1"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Due Date */}
                <div>
                    <label className="block mb-1 font-medium">Due Date</label>
                    <input
                        type="date"
                        name="dueDate"
                        value={form.dueDate}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Expense
                </button>
            </form>
        </div>
    );
}
