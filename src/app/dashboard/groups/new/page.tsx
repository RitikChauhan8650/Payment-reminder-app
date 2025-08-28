"use client";
import { useState } from "react";

export default function GroupsPage() {
    const [groupName, setGroupName] = useState("");
    const [groupTag, setGroupTag] = useState("");
    const [email, setEmail] = useState("");
    const [members, setMembers] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    // Add member by email
    const handleAddMember = () => {
        if (email && !members.includes(email)) {
            setMembers([...members, email]);
            setEmail("");
        }
    };

    // Remove member
    const handleRemoveMember = (member: string) => {
        setMembers(members.filter((m) => m !== member));
    };

    // Create group API call
    const handleCreateGroup = async () => {
        if (!groupName || !groupTag) {
            alert("Please enter group name and tag.");
            return;
        }

        setLoading(true);
        try {

            const res = await fetch("http://localhost:3002/groups/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: groupName,
                    tag: groupTag,
                    members,
                }),
            });

            if (res.ok) {
                const data = await res.json();
                console.log("Group created:", data);

                // Reset form
                setGroupName("");
                setGroupTag("");
                setMembers([]);
                alert("Group created successfully!");
            } else {
                console.error("Failed to create group");
                alert("Error creating group");
            }
        } catch (err) {
            console.error("Error:", err);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-black">
                Create New Group
            </h1>

            {/* Group Name */}
            <div className="flex flex-col gap-2">
                <label className="font-medium text-black">
                    Group Name
                </label>
                <input
                    type="text"
                    placeholder="Enter group name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="border rounded-lg px-3 py-2"
                />
            </div>

            {/* Group Tag */}
            <div className="flex flex-col gap-2">
                <label className="font-medium text-black">
                    Group Tag
                </label>
                <input
                    type="text"
                    placeholder="Enter group tag"
                    value={groupTag}
                    onChange={(e) => setGroupTag(e.target.value)}
                    className="border rounded-lg px-3 py-2"
                />
            </div>

            {/* Add Members */}
            <div className="flex flex-col gap-2">
                <label className="font-medium text-black">
                    Add Members by Email
                </label>
                <div className="flex gap-2">
                    <input
                        type="email"
                        placeholder="Enter member email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border rounded-lg px-3 py-2 flex-1"
                    />
                    <button
                        onClick={handleAddMember}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* Members List */}
            {members.length > 0 && (
                <ul className="space-y-2">
                    {members.map((member, idx) => (
                        <li
                            key={idx}
                            className="flex justify-between items-center border rounded-lg px-3 py-2"
                        >
                            <span className="text-black">{member}</span>
                            <button
                                onClick={() => handleRemoveMember(member)}
                                className="text-red-600 hover:text-red-800"
                            >
                                ✕
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {/* Create Group Button */}
            <button
                onClick={handleCreateGroup}
                disabled={loading}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
                {loading ? "Creating..." : "Create Group"}
            </button>
        </div>
    );
}
