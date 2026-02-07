"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bike, LogOut, LayoutDashboard, User, History, PlusCircle, Menu, X } from "lucide-react";

export default function Navbar() {
    const { data: session } = useSession();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false); // Mobile menu state

    const isActive = (path: string) => pathname === path ? "text-blue-600 font-bold" : "text-gray-600 hover:text-blue-600";

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600">
                        <Bike size={32} />
                        <span>BikeRent</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className={isActive("/")}>Home</Link>
                        {session && (
                            <>
                                <Link href="/dashboard" className={`${isActive("/dashboard")} flex items-center gap-1`}>
                                    <History size={18} /> My Bookings
                                </Link>
                                {session.user?.role === "ADMIN" && (
                                    <>
                                        <Link href="/admin/add-bike" className={isActive("/admin/add-bike")}>Add Bike</Link>
                                        <Link href="/admin/bookings" className={isActive("/admin/bookings")}>All Bookings</Link>
                                    </>
                                )}
                                <button onClick={() => signOut()} className="text-red-500 ml-4"><LogOut size={20} /></button>
                            </>
                        )}
                        {!session && <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Login</Link>}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar/Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-4 shadow-lg animate-in slide-in-from-top">
                    <Link href="/" className="block py-2" onClick={() => setIsOpen(false)}>Home</Link>
                    {session ? (
                        <>
                            <Link href="/dashboard" className="block py-2" onClick={() => setIsOpen(false)}>My Bookings</Link>
                            {session.user?.role === "ADMIN" && (
                                <>
                                    <Link href="/admin/add-bike" className={isActive("/admin/add-bike")}>Add Bike</Link>
                                    <Link href="/admin/bookings" className={isActive("/admin/bookings")}>All Bookings</Link>
                                </>
                            )}
                            <button onClick={() => signOut()} className="text-red-500 block py-2">Logout</button>
                        </>
                    ) : (
                        <Link href="/login" className="block py-2 text-blue-600 font-bold">Login</Link>
                    )}
                </div>
            )}
        </nav>
    );
}