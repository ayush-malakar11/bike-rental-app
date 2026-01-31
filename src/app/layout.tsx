import { AuthProvider } from "@/components/AuthProvider";
import Navbar from "@/components/Navbar"; // Import Navbar
import Footer from "@/components/Footer"; // Import Footer
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <Navbar /> {/* Yahan add karein */}
          <main className="min-h-screen">
            {children}
          </main>
          <Footer /> {/* Yahan add karein */}
        </AuthProvider>
      </body>
    </html>
  );
}