"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewReminder() {
    const router = useRouter();
    const [form, setForm] = useState({ title: "", amount: "", dueDate: "" });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await fetch("http://localhost:3002/payments/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        router.push("/reminders/view");
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4 w-96">
                <h1 className="text-xl font-bold">New Reminder</h1>
                <input
                    type="text"
                    placeholder="Title"
                    className="w-full border p-2 rounded"
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Amount"
                    className="w-full border p-2 rounded"
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                />
                <input
                    type="date"
                    className="w-full border p-2 rounded"
                    onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                />
                <button type="submit" className="w-full bg-green-600 text-white py-2 rounded cursor-pointer hover:bg-green-700 transition">
                    Save
                </button>
            </form>
        </div>
    );
}
