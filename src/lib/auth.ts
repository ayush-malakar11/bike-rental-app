import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt", // Using JSON Web Token for secure sessions
    },
    pages: {
        signIn: "/login", // Custom login page route
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // 1. Check if input exists
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Please enter email and password");
                }

                // 2. Find user in database
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                // 3. If user not found
                if (!user || !user.password) {
                    throw new Error("No user found with this email");
                }

                // 4. Verify password using bcrypt
                const isPasswordCorrect = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isPasswordCorrect) {
                    throw new Error("Invalid password");
                }

                // 5. Return user object to be stored in JWT
                return {
                    id: user.id.toString(),
                    email: user.email,
                    name: user.name,
                    role: user.role, // Important for Admin/User access
                };
            },
        }),
    ],
    callbacks: {
        // Adding custom data (role, id) to the token
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role;
            }
            return token;
        },
        // Making that data available in the session
        async session({ session, token }) {
            if (token) {
                (session.user as any).id = token.id;
                (session.user as any).role = token.role;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};