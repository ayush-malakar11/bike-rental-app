"use client";

import React, { useEffect, useState } from "react";
import { Calendar, Clock, MapPin, Bike as BikeIcon, Loader2 } from "lucide-react";

export default function UserDashboard() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await fetch("/api/user/bookings");
                const data = await res.json();
                setBookings(data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <Loader2 className="animate-spin text-blue-600" size={40} />
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto p-6 mt-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
                <BikeIcon className="text-blue-600" /> My Rental History
            </h1>

            {bookings.length === 0 ? (
                <div className="bg-white p-10 rounded-2xl text-center shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-lg">You haven't booked any bikes yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                            <div className="bg-blue-600 p-4 text-white">
                                <h3 className="text-xl font-bold">{booking.bike.brand} {booking.bike.modelName}</h3>
                                <p className="text-sm text-blue-100">Status: <span className="font-bold">{booking.status}</span></p>
                            </div>

                            <div className="p-5 space-y-4">
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Calendar size={18} className="text-blue-600" />
                                    <div>
                                        <p className="text-xs font-medium uppercase text-gray-400">Pickup</p>
                                        <p className="text-sm font-semibold">{new Date(booking.startTime).toLocaleString()}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 text-gray-600">
                                    <Clock size={18} className="text-blue-600" />
                                    <div>
                                        <p className="text-xs font-medium uppercase text-gray-400">Return</p>
                                        <p className="text-sm font-semibold">{new Date(booking.endTime).toLocaleString()}</p>
                                    </div>
                                </div>

                                <div className="pt-4 border-t flex justify-between items-center">
                                    <p className="text-gray-500 text-sm">Total Price</p>
                                    <p className="text-xl font-bold text-blue-600">₹{booking.totalPrice}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}