import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

// NextAuth handles both GET (checking session) and POST (login/logout)
export { handler as GET, handler as POST };