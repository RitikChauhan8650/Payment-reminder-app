"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { ArrowRight } from "lucide-react";

export default function SettlementVisualizer({ groupId }: { groupId: string }) {
    const [balances, setBalances] = useState<any[]>([]);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const handleCalculate = async () => {
        setLoading(true);
        try {
            const result = await api.get(`/groups/${groupId}/balances`);
            setBalances(result.balances);
            setTransactions(result.transactions);
        } catch (err) {
            console.error("Error fetching balances:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSettle = async (from: string, to: string, amount: number) => {
        try {
            await api.post(`/groups/${groupId}/settle`, { from, to, amount });
            await handleCalculate();
        } catch (err) {
            console.error("Error settling debt:", err);
        }
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow">
            <h2 className="text-lg font-bold mb-4">💰 Settle Expenses</h2>
            <button
                onClick={handleCalculate}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                {loading ? "Calculating..." : "Show Balances"}
            </button>

            {/* Balances */}
            {balances.length > 0 && (
                <div className="mt-6">
                    <h3 className="font-semibold mb-2">Balances</h3>
                    <ul className="space-y-1">
                        {balances.map((b, idx) => (
                            <li key={idx} className="flex justify-between">
                                <span>{b.user.email}</span>
                                <span className={b.balance >= 0 ? "text-green-600" : "text-red-600"}>
                                    ₹{b.balance}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Transactions */}
            {transactions.length > 0 && (
                <div className="mt-6">
                    <h3 className="font-semibold mb-2">Suggested Settlements</h3>
                    <div className="space-y-3">
                        {transactions.map((t, idx) => (
                            <div key={idx} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg shadow-sm">
                                <span className="font-medium">{t.from}</span>
                                <ArrowRight className="w-5 h-5 text-gray-600" />
                                <span className="font-medium">{t.to}</span>
                                <span className="ml-auto text-blue-700 font-bold">₹{t.amount}</span>
                                <button
                                    onClick={() => handleSettle(t.from, t.to, t.amount)}
                                    className="ml-4 bg-green-600 text-white px-3 py-1 rounded"
                                >
                                    Settle
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
