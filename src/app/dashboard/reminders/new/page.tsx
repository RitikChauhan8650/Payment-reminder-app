"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api, apiFetch } from "@/lib/api";

export default function NewReminder() {
    const router = useRouter();
    const token = localStorage.getItem("token"); // or from redux

    const [form, setForm] = useState({
        title: "",
        amount: "",
        dueDate: "",
        type: "personal", // personal or split
        color: "#16a34a", // default green
        tag: "",
        description: "",
        participants: [] as string[],
        newEmail: "",
    });

    // Add participant by email
    const handleAddEmail = () => {
        if (form.newEmail && !form.participants.includes(form.newEmail)) {
            setForm({
                ...form,
                participants: [...form.participants, form.newEmail],
                newEmail: "",
            });
        }
    };

    // Remove participant
    const handleRemoveEmail = (email: string) => {
        setForm({
            ...form,
            participants: form.participants.filter((e) => e !== email),
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log("hellllllllllllo");
        const data = await api.post("/payments/create", {
            method: "POST",
            body: JSON.stringify(form),
        });

        console.log("✅ Payment created:", data);

        // router.push("/dashboard");
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow space-y-4 w-[480px]"
            >
                <h1 className="text-xl font-bold text-gray-700">New Reminder</h1>

                {/* Title */}
                <input
                    type="text"
                    placeholder="Title"
                    className="w-full border p-2 rounded placeholder-gray-700"
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                />

                {/* Amount */}
                <input
                    type="number"
                    placeholder="Amount"
                    className="w-full border p-2 rounded placeholder-gray-700"
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                />

                {/* Due Date */}
                <input
                    type="date"
                    className="w-full border p-2 rounded text-gray-700"
                    onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                />

                {/* Reminder Type */}
                <select
                    className="w-full border p-2 rounded text-gray-700"
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                    <option value="personal" className="text-gray-700">Personal</option>
                    <option value="split" className="text-gray-700">Split Payment</option>
                </select>

                {/* Color Picker */}
                <div className="flex items-center gap-3">
                    <label className="text-sm font-medium text-gray-700">Choose Color:</label>
                    <input
                        type="color"
                        value={form.color}
                        onChange={(e) => setForm({ ...form, color: e.target.value })}
                        className="w-10 h-10 border rounded cursor-pointer text-gray-700"
                    />
                </div>

                {/* Tag */}
                <input
                    type="text"
                    placeholder="Tag (e.g. Rent, Food, Trip)"
                    className="w-full border p-2 rounde placeholder-gray-700d"
                    onChange={(e) => setForm({ ...form, tag: e.target.value })}
                />

                {/* Description */}
                <textarea
                    placeholder="Description / Notes"
                    className="w-full border p-2 rounded  placeholder-gray-700"
                    rows={3}
                    onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                    }
                />

                {/* Participants (for split) */}
                {form.type === "split" && (
                    <div className="space-y-2">
                        <label className="font-medium text-sm">Add Participants</label>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter email"
                                value={form.newEmail}
                                className="flex-1 border p-2 rounded  placeholder-gray-700"
                                onChange={(e) => setForm({ ...form, newEmail: e.target.value })}
                            />
                            <button
                                type="button"
                                onClick={handleAddEmail}
                                className="bg-blue-600 text-white px-3 rounded hover:bg-blue-700 placeholder-gray-700"
                            >
                                Add
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-2">
                            {form.participants.map((email) => (
                                <div
                                    key={email}
                                    className="flex items-center bg-gray-200 px-2 py-1 rounded-full text-sm"
                                >
                                    {email}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveEmail(email)}
                                        className="ml-2 text-red-500"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded cursor-pointer hover:bg-green-700 transition"
                >
                    Save Reminder
                </button>
            </form>
        </div>
    );
}
