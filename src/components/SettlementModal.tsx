"use client";
import { useState } from "react";
import { api, apiFetch } from "@/lib/api"; // your API wrapper
import { ArrowRight } from "lucide-react";

type Transaction = {
    from: string;
    to: string;
    amount: number;
};

export default function SettlementVisualizer({ groupId }: { groupId: string }) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [balances, setBalances] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState(false);

    const handleSettle = async () => {
        setLoading(true);
        try {
            // Example expenses (replace with real data from DB/group state)
            const expenses = [
                { userId: "Alice", amountPaid: 1000 },
                { userId: "Bob", amountPaid: 500 },
                { userId: "Charlie", amountPaid: 1500 },
            ];

            const result = await api.post("/groups/settle", {
                method: "POST",
                body: JSON.stringify({ expenses }),
            });

            setTransactions(result.transactions);
            setBalances(
                expenses.reduce((acc, e) => {
                    acc[e.userId] = e.amountPaid;
                    return acc;
                }, {} as Record<string, number>)
            );
        } catch (err) {
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow">
            <h2 className="text-lg font-bold mb-4">💰 Settle Group Expenses</h2>
            <button
                onClick={handleSettle}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                {loading ? "Calculating..." : "Settle Now"}
            </button>

            {/* Balances */}
            {Object.keys(balances).length > 0 && (
                <div className="mt-6">
                    <h3 className="font-semibold mb-2">Balances</h3>
                    <ul className="space-y-1">
                        {Object.entries(balances).map(([user, amt]) => (
                            <li key={user} className="flex justify-between">
                                <span>{user}</span>
                                <span
                                    className={
                                        amt >= 0 ? "text-green-600 font-bold" : "text-red-600 font-bold"
                                    }
                                >
                                    ₹{amt}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Transactions */}
            {transactions.length > 0 && (
                <div className="mt-6">
                    <h3 className="font-semibold mb-2">Transactions</h3>
                    <div className="space-y-3">
                        {transactions.map((t, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg shadow-sm"
                            >
                                <span className="font-medium">{t.from}</span>
                                <ArrowRight className="w-5 h-5 text-gray-600" />
                                <span className="font-medium">{t.to}</span>
                                <span className="ml-auto text-blue-700 font-bold">
                                    ₹{t.amount}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
