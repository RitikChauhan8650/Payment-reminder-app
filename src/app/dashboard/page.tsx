"use client";
import { api, apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
    const [reminders, setReminders] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchPayments() {
            try {
                const data = await api.get("/payments/all");
                console.log("data from fetchPayments----", data);
                setReminders(data);
            } catch (err: any) {
                alert(err.message);
            }
        }
        fetchPayments();
    }, []);

    const openNewReminderModal = (e: React.MouseEvent) => {
        e.preventDefault();
        router.push("/dashboard/reminders/new");
    };
    console.log("reminders---------", reminders);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6">My Reminders</h1>
            <a
                href="/reminders/new"
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
                onClick={openNewReminderModal}
            >
                + New Reminder
            </a>

            <div className="grid gap-4 md:grid-cols-2 mt-6">
                {reminders?.map((r: any) => (
                    <div key={r._id} className="p-4 bg-white shadow rounded-xl">
                        <h2 className="text-lg font-semibold">{r.title}</h2>
                        <p className="text-gray-500">Due: {new Date(r.dueDate).toDateString()}</p>
                        <p className="text-gray-700 font-medium">₹{r.amount}</p>
                        <button
                            className={`mt-2 px-3 py-1 rounded ${r.isPaid ? "bg-gray-400" : "bg-blue-500 text-white"
                                }`}
                        >
                            {r.isPaid ? "Paid" : "Mark Paid"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
