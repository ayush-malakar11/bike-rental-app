"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, Mail, Lock, Loader2, UserPlus } from "lucide-react";
import Link from "next/link";

// 1. Validation Schema (Matches our Backend Strict Rules)
const signupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email format"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Include at least one uppercase letter")
        .regex(/[a-z]/, "Include at least one lowercase letter")
        .regex(/[0-9]/, "Include at least one number")
        .regex(/[^A-Za-z0-9]/, "Include at least one special character"),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data: SignupFormData) => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Registration failed");
            }

            alert("Success! Account created. Now you can login.");
            window.location.href = "/login"; // Simple redirect to login
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-2xl">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">Get Started</h2>
                    <p className="mt-2 text-sm text-gray-600">Create your Bike Rental account</p>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
                        <p className="text-sm text-red-700 font-medium">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Full Name</label>
                        <div className="relative mt-1">
                            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input {...register("name")} className="block w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2.5 focus:border-blue-500 focus:ring-blue-500 outline-none" placeholder="Ayush Malakar" />
                        </div>
                        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Email Address</label>
                        <div className="relative mt-1">
                            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input {...register("email")} type="email" className="block w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2.5 focus:border-blue-500 focus:ring-blue-500 outline-none" placeholder="name@example.com" />
                        </div>
                        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Password (Strong)</label>
                        <div className="relative mt-1">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input {...register("password")} type="password" className="block w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2.5 focus:border-blue-500 focus:ring-blue-500 outline-none" placeholder="••••••••" />
                        </div>
                        {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
                    </div>

                    <button disabled={loading} type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-white font-bold hover:bg-green-700 transition-colors shadow-md">
                        {loading ? <Loader2 className="animate-spin" /> : <><UserPlus size={20} /> Sign Up</>}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500">
                    Already have an account? <Link href="/login" className="font-bold text-green-600 hover:underline">Sign In</Link>
                </p>
            </div>
        </div>
    );
}