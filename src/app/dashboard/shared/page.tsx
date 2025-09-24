"use client";

import { useEffect, useState } from "react";
import { api, apiFetch } from "@/lib/api";

export default function SharedPage() {
    const [groups, setGroups] = useState<any[]>([]);
    const [invites, setInvites] = useState<any[]>([]);

    useEffect(() => {
        async function loadData() {
            try {
                const data = await api.get("/groups/my");
                setGroups(data.groups || []);
                setInvites(data.invites || []);
            } catch (err) {
                console.error(err);
            }
        }
        loadData();
    }, []);

    const handleAccept = async (groupId: string) => {
        await api.post(`/groups/${groupId}/accept`, { method: "POST" });
        setInvites(invites.filter((i) => i._id !== groupId));
    };

    const handleReject = async (groupId: string) => {
        await api.post(`/groups/${groupId}/reject`, { method: "POST" });
        setInvites(invites.filter((i) => i._id !== groupId));
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Shared with Me</h1>

            {/* Invites */}
            <h2 className="text-lg font-semibold mb-2">Invitations</h2>
            {invites.length === 0 ? (
                <p className="text-gray-500">No pending invites</p>
            ) : (
                invites.map((invite) => (
                    <div
                        key={invite._id}
                        className="flex justify-between items-center bg-gray-100 p-3 rounded mb-2"
                    >
                        <div>
                            <p className="font-medium">{invite.groupName}</p>
                            <p className="text-sm text-gray-600">
                                Invited by {invite.invitedBy}
                            </p>
                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={() => handleAccept(invite._id)}
                                className="bg-green-500 text-white px-3 py-1 rounded"
                            >
                                Accept
                            </button>
                            <button
                                onClick={() => handleReject(invite._id)}
                                className="bg-red-500 text-white px-3 py-1 rounded"
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                ))
            )}

            {/* My Groups */}
            <h2 className="text-lg font-semibold mt-6 mb-2">My Groups</h2>
            {groups.length === 0 ? (
                <p className="text-gray-500">You’re not in any groups yet.</p>
            ) : (
                groups.map((group) => (
                    <div
                        key={group._id}
                        className="bg-white shadow p-4 rounded-lg mb-3 border"
                    >
                        <h3 className="text-xl font-bold">{group.name}</h3>
                        <p className="text-sm text-gray-600">Created by {group.createdBy}</p>
                        <p className="text-sm text-gray-500">
                            Members: {group.members.length}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
}
