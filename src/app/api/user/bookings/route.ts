import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        // Fetch bookings for the logged-in user only
        const bookings = await prisma.booking.findMany({
            where: {
                userId: Number((session.user as any).id),
            },
            include: {
                bike: true, // This brings bike details like modelName and brand
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(bookings);
    } catch (error) {
        console.error("GET_USER_BOOKINGS_ERROR:", error);
        return NextResponse.json({ message: "Failed to fetch bookings" }, { status: 500 });
    }
}