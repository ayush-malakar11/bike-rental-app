"use client";

import React, { useState } from "react";
import { Bike } from "@prisma/client";
import { X, Calendar, Clock, CreditCard, Loader2 } from "lucide-react";

interface BookingModalProps {
    bike: Bike;
    onClose: () => void;
}

export default function BookingModal({ bike, onClose }: BookingModalProps) {
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleBooking = async () => {
        if (!startDate || !endDate) return alert("Please select dates");

        setLoading(true);
        try {
            // Logic to calculate hours and total price
            const start = new Date(startDate);
            const end = new Date(endDate);
            const diffInMs = end.getTime() - start.getTime();
            const hours = diffInMs / (1000 * 60 * 60);

            if (hours <= 0) throw new Error("End time must be after start time");

            const totalPrice = hours * bike.pricePerHour;

            const response = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    bikeId: bike.id,
                    startTime: startDate,
                    endTime: endDate,
                    totalPrice,
                }),
            });

            if (!response.ok) throw new Error("Booking failed");

            alert("Bike Booked Successfully!");
            onClose();
            window.location.reload(); // Refresh to show 'Occupied' status
        } catch (err: any) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-bold text-gray-800 mb-2">Book {bike.modelName}</h2>
                <p className="text-blue-600 font-semibold mb-6">Rate: ₹{bike.pricePerHour}/hour</p>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date & Time</label>
                        <input
                            type="datetime-local"
                            className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Return Date & Time</label>
                        <input
                            type="datetime-local"
                            className="w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>

                    <div className="bg-blue-50 p-4 rounded-xl flex items-center gap-3">
                        <CreditCard className="text-blue-600" />
                        <div>
                            <p className="text-xs text-blue-600 font-medium">Estimated Total</p>
                            <p className="text-lg font-bold">Select dates to calculate</p>
                        </div>
                    </div>

                    <button
                        onClick={handleBooking}
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : "Confirm Booking"}
                    </button>
                </div>
            </div>
        </div>
    );
}