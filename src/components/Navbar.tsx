"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Bike, LogOut, LayoutDashboard, User } from "lucide-react";

export default function Navbar() {
    const { data: session } = useSession();

    return (
        <nav className="bg-white border-b border-gray-200 py-4 px-6 shadow-sm">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600">
                    <Bike size={32} />
                    <span>BikeRent</span>
                </Link>

                {/* Links Section */}
                <div className="flex items-center gap-6">
                    <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">Home</Link>

                    {session ? (
                        <>
                            {/* Show Admin Link only if user is ADMIN */}
                            {session.user?.role === "ADMIN" && (
                                <Link href="/admin/add-bike" className="flex items-center gap-1 text-purple-600 font-bold hover:underline">
                                    <LayoutDashboard size={18} />
                                    Admin Panel
                                </Link>
                            )}

                            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-200">
                                <span className="text-sm font-semibold flex items-center gap-1">
                                    <User size={16} /> {session.user?.name}
                                </span>
                                <button
                                    onClick={() => signOut()}
                                    className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                                    title="Logout"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        </>
                    ) : (
                        <Link href="/login" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 font-bold">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}