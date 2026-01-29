import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const path = req.nextUrl.pathname;

        // 1. If user is trying to access /admin but is not an ADMIN
        if (path.startsWith("/admin") && token?.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/", req.url));
        }
    },
    {
        callbacks: {
            // Middleware only runs if authorized returns true
            authorized: ({ token }) => !!token,
        },
    }
);

// 2. Define which paths are protected
export const config = {
    matcher: ["/admin/:path*", "/bookings/:path*", "/profile/:path*"],
};