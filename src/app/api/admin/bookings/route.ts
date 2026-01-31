import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        // Only allow ADMIN to see all bookings
        if (!session || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
        }

        const allBookings = await prisma.booking.findMany({
            include: {
                bike: true,
                user: {
                    select: { name: true, email: true } // Don't fetch passwords
                }
            },
            orderBy: { createdAt: "desc" }
        });

        return NextResponse.json(allBookings);
    } catch (error) {
        console.error("ADMIN_GET_BOOKINGS_ERROR:", error);
        return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
    }
}