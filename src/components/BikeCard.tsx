import { Bike } from "@prisma/client";
import { Clock, IndianRupee, MapPin } from "lucide-react";

interface BikeCardProps {
    bike: Bike;
}

export default function BikeCard({ bike }: BikeCardProps) {
    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            {/* Bike Image */}
            <div className="relative h-48 w-full bg-gray-200">
                <img
                    src={bike.imageUrl || "/placeholder-bike.png"}
                    alt={bike.modelName}
                    className="w-full h-full object-cover"
                />
                {!bike.isAvailable && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        Occupied
                    </div>
                )}
            </div>

            {/* Bike Details */}
            <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800">{bike.brand} {bike.modelName}</h3>

                <div className="mt-4 space-y-2">
                    <div className="flex items-center text-gray-600 gap-2 text-sm">
                        <IndianRupee size={16} className="text-blue-600" />
                        <span className="font-semibold text-gray-800">₹{bike.pricePerHour}</span> / hour
                    </div>
                    <div className="flex items-center text-gray-600 gap-2 text-sm">
                        <Clock size={16} className="text-blue-600" />
                        <span>Instant Booking Available</span>
                    </div>
                </div>

                <button
                    disabled={!bike.isAvailable}
                    className="w-full mt-6 bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 transition-colors"
                >
                    {bike.isAvailable ? "Book Now" : "Currently Unavailable"}
                </button>
            </div>
        </div>
    );
}