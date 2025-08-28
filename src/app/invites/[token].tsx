"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function InvitePage({ params }: { params: { token: string } }) {
    const { token } = params;
    const [status, setStatus] = useState("loading");
    const router = useRouter();

    const acceptInvite = async () => {
        const res = await fetch(`/api/payments/invite/accept?token=${token}`, { method: "POST" });
        if (res.ok) {
            setStatus("accepted");
            setTimeout(() => router.push("/reminders"), 2000);
        }
    };

    const rejectInvite = async () => {
        await fetch(`/api/payments/invite/reject?token=${token}`, { method: "POST" });
        setStatus("rejected");
    };

    if (status === "loading") {
        return <p className="p-6">Processing invite...</p>;
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
            <h1 className="text-lg font-bold">You've been invited to a Payment Reminder</h1>
            {status === "accepted" && <p className="text-green-600">✅ Invitation Accepted!</p>}
            {status === "rejected" && <p className="text-red-600">❌ Invitation Rejected</p>}
            {status === "loading" || status === "accepted" || status === "rejected" ? null : (
                <div className="space-x-4 mt-4">
                    <button onClick={acceptInvite} className="px-4 py-2 bg-green-600 text-white rounded">Accept</button>
                    <button onClick={rejectInvite} className="px-4 py-2 bg-red-600 text-white rounded">Reject</button>
                </div>
            )}
        </div>
    );
}
