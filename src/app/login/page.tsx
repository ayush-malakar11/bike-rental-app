"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Loader2, LogIn } from "lucide-react";
import Link from "next/link";

// 1. Validation Schema for Login
const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        setLoading(true);
        setError("");

        // NextAuth signIn function handles the POST request to /api/auth/signin
        const result = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false, // We handle redirect manually to show errors
        });

        if (result?.error) {
            setError("Invalid email or password"); // Professional error message
            setLoading(false);
        } else {
            // Login successful
            router.push("/"); // Redirect to Home/Dashboard
            router.refresh();
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-2xl">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
                    <p className="mt-2 text-sm text-gray-600">Login to your Bike Rental account</p>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Email Input */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Email Address</label>
                        <div className="relative mt-1">
                            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                                {...register("email")}
                                type="email"
                                className="block w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2.5 focus:border-blue-500 focus:ring-blue-500 outline-none transition-all"
                                placeholder="name@example.com"
                            />
                        </div>
                        {errors.email && <p className="mt-1 text-xs text-red-500 font-medium">{errors.email.message}</p>}
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Password</label>
                        <div className="relative mt-1">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                                {...register("password")}
                                type="password"
                                className="block w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2.5 focus:border-blue-500 focus:ring-blue-500 outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                        {errors.password && <p className="mt-1 text-xs text-red-500 font-medium">{errors.password.message}</p>}
                    </div>

                    <button
                        disabled={loading}
                        type="submit"
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-white font-bold hover:bg-blue-700 disabled:bg-blue-300 transition-colors shadow-md"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : (
                            <>
                                <LogIn size={20} />
                                Sign In
                            </>
                        )}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500">
                    Don't have an account?{" "}
                    <Link href="/signup" className="font-bold text-blue-600 hover:underline">
                        Register Here
                    </Link>
                </p>
            </div>
        </div>
    );
}