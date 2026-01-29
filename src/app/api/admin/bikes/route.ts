import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        // 1. Security Check: Only logged-in ADMINs can access this
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
        }

        const body = await req.json();
        const { modelName, brand, pricePerHour, imageUrl } = body;

        // 2. Basic Validation
        if (!modelName || !brand || !pricePerHour) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        // 3. Create Bike in Database
        const newBike = await prisma.bike.create({
            data: {
                modelName,
                brand,
                pricePerHour: parseFloat(pricePerHour),
                imageUrl,
                isAvailable: true,
            },
        });

        return NextResponse.json(
            { message: "Bike added successfully", bike: newBike },
            { status: 201 }
        );
    } catch (error) {
        console.error("ADD_BIKE_ERROR:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}