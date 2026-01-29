import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        // Security: Only logged-in users can book
        if (!session || !session.user) {
            return NextResponse.json({ message: "Please login to book a bike" }, { status: 401 });
        }

        const { bikeId, startTime, endTime, totalPrice } = await req.json();

        // Create booking record
        const booking = await prisma.booking.create({
            data: {
                userId: Number((session.user as any).id),
                bikeId: Number(bikeId),
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                totalPrice: parseFloat(totalPrice),
                status: "CONFIRMED",
            },
        });

        // Update bike availability so others can't book the same bike
        await prisma.bike.update({
            where: { id: Number(bikeId) },
            data: { isAvailable: false },
        });

        return NextResponse.json({ message: "Booking Successful!", booking }, { status: 201 });
    } catch (error) {
        console.error("BOOKING_API_ERROR:", error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}