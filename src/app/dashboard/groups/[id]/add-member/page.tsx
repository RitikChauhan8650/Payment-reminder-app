"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AddMemberPage({ params }: { params: { id: string } }) {
    const [email, setEmail] = useState("");

    const handleAdd = async () => {
        await fetch(`/api/groups/${params.id}/add-member`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        alert("Invitation sent!");
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-2xl">
            <h2 className="text-xl font-semibold">Add Member</h2>
            <Input placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button className="mt-4" onClick={handleAdd}>Invite</Button>
        </div>
    );
}
