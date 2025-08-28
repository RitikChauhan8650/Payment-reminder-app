"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusCircle, Users, History, User, Settings } from "lucide-react";

const menuItems = [
    { href: "/dashboard", label: "All Reminders", icon: Home },
    { href: "/dashboard/reminders/new", label: "New Reminder", icon: PlusCircle },
    { href: "/dashboard/shared", label: "Shared with Me", icon: Users },
    { href: "/dashboard/history", label: "History", icon: History },
    { href: "/dashboard/profile", label: "Profile", icon: User },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
    { href: "/dashboard/groups/new", label: "Groups", icon: Users },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-white shadow-lg min-h-screen p-4">
            <h2 className="text-xl font-bold mb-6">💳 Payment Splitter</h2>
            <nav className="flex flex-col gap-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${isActive
                                ? "bg-blue-100 text-blue-700 font-semibold"
                                : "text-gray-700 hover:bg-gray-100"
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
