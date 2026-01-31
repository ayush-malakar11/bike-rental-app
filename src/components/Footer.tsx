import { Bike, Mail, Phone, Instagram, Facebook, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 pt-16 pb-8 px-6 mt-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Brand Section */}
                <div className="space-y-4">
                    <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600">
                        <Bike size={28} />
                        <span>BikeRent</span>
                    </Link>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        The best bike rental platform for your daily commute and long rides. Affordable prices and 24/7 support.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="font-bold text-gray-800 mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-gray-600 text-sm">
                        <li><Link href="/" className="hover:text-blue-600">Browse Bikes</Link></li>
                        <li><Link href="/dashboard" className="hover:text-blue-600">My Bookings</Link></li>
                        <li><Link href="/login" className="hover:text-blue-600">Login / Signup</Link></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h4 className="font-bold text-gray-800 mb-4">Support</h4>
                    <ul className="space-y-3 text-gray-600 text-sm">
                        <li className="flex items-center gap-2"><Mail size={16} /> support@bikerent.com</li>
                        <li className="flex items-center gap-2"><Phone size={16} /> +91 98765 43210</li>
                    </ul>
                </div>

                {/* Socials */}
                <div>
                    <h4 className="font-bold text-gray-800 mb-4">Follow Us</h4>
                    <div className="flex gap-4 text-gray-400">
                        <Instagram className="hover:text-pink-600 cursor-pointer transition-colors" />
                        <Facebook className="hover:text-blue-700 cursor-pointer transition-colors" />
                        <Twitter className="hover:text-blue-400 cursor-pointer transition-colors" />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto border-t border-gray-100 mt-12 pt-8 text-center text-gray-400 text-sm">
                <p>© 2026 BikeRent App. Built by Ayush Malakar.</p>
            </div>
        </footer>
    );
}