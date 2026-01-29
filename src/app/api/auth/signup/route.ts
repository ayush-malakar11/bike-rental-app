import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

export const passwordSchema = z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");

// 1. Define Validation Schema (Zod)
const signupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email format"),
    password: passwordSchema,
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // 2. Validate Input Data
        const validation = signupSchema.safeParse(body);

        if (!validation.success) {
            // Improved: This will now show the exact error like "Invalid email format"
            const errorMessage = validation.error.issues?.[0]?.message || "Input validation failed";

            return NextResponse.json(
                { message: errorMessage },
                { status: 400 }
            );
        }

        const { name, email, password } = validation.data;

        // 3. Check if user already exists in MySQL
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ message: "Email already registered" }, { status: 400 });
        }

        // 4. Hash the password for security
        const hashedPassword = await bcrypt.hash(password, 10);

        // 5. Create new user in database
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        return NextResponse.json(
            { message: "User created successfully", userId: user.id },
            { status: 201 }
        );

    } catch (error: any) {
        // Standard practice: Log error for debugging but return generic message
        console.error("SIGNUP_API_ERROR:", error);
        return NextResponse.json(
            { message: "Internal Server Error", error: error.message },
            { status: 500 }
        );
    }
}