"use client";

import React, { useEffect, useState } from "react";
import { Loader2, CheckCircle, Clock } from "lucide-react";

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/admin/bookings")
            .then(res => res.json())
            .then(data => {
                setBookings(data);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="flex justify-center mt-20"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">All System Bookings</h1>
            <div className="bg-white shadow-md rounded-lg overflow-hidden border">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-semibold">User</th>
                            <th className="p-4 font-semibold">Bike</th>
                            <th className="p-4 font-semibold">Duration</th>
                            <th className="p-4 font-semibold">Total Price</th>
                            <th className="p-4 font-semibold">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((b) => (
                            <tr key={b.id} className="border-b hover:bg-gray-50">
                                <td className="p-4">
                                    <p className="font-medium">{b.user.name}</p>
                                    <p className="text-xs text-gray-500">{b.user.email}</p>
                                </td>
                                <td className="p-4">{b.bike.brand} {b.bike.modelName}</td>
                                <td className="p-4 text-sm">
                                    {new Date(b.startTime).toLocaleDateString()} - {new Date(b.endTime).toLocaleDateString()}
                                </td>
                                <td className="p-4 font-bold text-blue-600">₹{b.totalPrice}</td>
                                <td className="p-4">
                                    <span className="flex items-center gap-1 text-green-600 text-sm font-bold">
                                        <CheckCircle size={14} /> {b.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}