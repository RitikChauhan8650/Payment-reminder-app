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
        paidBy: "",
        dueDate: "",
    });

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post(`/groups/${id}/expenses`, {
                title: form.title,
                amount: Number(form.amount),
                paidBy: form.paidBy,
                dueDate: form.dueDate ? new Date(form.dueDate) : null,
            });
            router.push(`/dashboard/groups/${id}`); // ✅ back to group details
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

                {/* Amount */}
                <div>
                    <label className="block mb-1 font-medium">Amount (₹)</label>
                    <input
                        type="number"
                        name="amount"
                        value={form.amount}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                {/* Paid By */}
                <div>
                    <label className="block mb-1 font-medium">Paid By</label>
                    <select
                        name="paidBy"
                        value={form.paidBy}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="">Select Member</option>
                        {group.members.map((m: any) => (
                            <option key={m._id} value={m._id}>
                                {m.email}
                            </option>
                        ))}
                    </select>
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
