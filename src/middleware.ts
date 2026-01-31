import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const isAdminPage = req.nextUrl.pathname.startsWith("/admin");

        // Agar Admin page hai aur user Admin nahi hai, toh use Home par bhej do
        if (isAdminPage && token?.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/", req.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token, // Agar token nahi hai (login nahi hai), toh login page par bhej dega
        },
    }
);

// Ye middleware sirf in pages par chalega
export const config = {
    matcher: ["/dashboard/:path*", "/admin/:path*"]
};