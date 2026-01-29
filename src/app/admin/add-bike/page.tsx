"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CldUploadWidget } from "next-cloudinary";
import { Bike, DollarSign, Tag, Image as ImageIcon, Loader2 } from "lucide-react";

// 1. Validation Schema for Adding a Bike
const bikeSchema = z.object({
    modelName: z.string().min(2, "Model name is required"),
    brand: z.string().min(2, "Brand is required"),
    pricePerHour: z.string().min(1, "Price is required"),
    imageUrl: z.string().min(1, "Please upload an image"),
});

type BikeFormData = z.infer<typeof bikeSchema>;

export default function AddBikePage() {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<BikeFormData>({
        resolver: zodResolver(bikeSchema),
    });

    const onSubmit = async (data: BikeFormData) => {
        setLoading(true);
        try {
            const response = await fetch("/api/admin/bikes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error("Failed to add bike");

            alert("Bike added successfully!");
            reset();
            setImageUrl("");
        } catch (error: any) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-2xl mt-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Bike className="text-blue-600" /> Add New Bike
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                    {/* Model Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Model Name</label>
                        <div className="relative mt-1">
                            <Tag className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input {...register("modelName")} className="pl-10 w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Ninja 400" />
                        </div>
                        {errors.modelName && <p className="text-red-500 text-xs mt-1">{errors.modelName.message}</p>}
                    </div>

                    {/* Brand */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Brand</label>
                        <div className="relative mt-1">
                            <Bike className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input {...register("brand")} className="pl-10 w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Kawasaki" />
                        </div>
                        {errors.brand && <p className="text-red-500 text-xs mt-1">{errors.brand.message}</p>}
                    </div>
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Price Per Hour (₹)</label>
                    <div className="relative mt-1">
                        <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input {...register("pricePerHour")} type="number" className="pl-10 w-full p-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" placeholder="500" />
                    </div>
                    {errors.pricePerHour && <p className="text-red-500 text-xs mt-1">{errors.pricePerHour.message}</p>}
                </div>

                {/* Image Upload Widget */}
                <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center">
                    {imageUrl ? (
                        <div className="relative w-full h-40">
                            <img src={imageUrl} alt="Preview" className="w-full h-full object-contain rounded-lg" />
                            <button onClick={() => setImageUrl("")} className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full text-xs">X</button>
                        </div>
                    ) : (
                        <CldUploadWidget
                            uploadPreset="bike_rental_preset"
                            onSuccess={(result: any) => {
                                const url = result.info.secure_url;
                                setImageUrl(url);
                                setValue("imageUrl", url);
                            }}
                        >
                            {({ open }) => (
                                <button type="button" onClick={() => open()} className="flex flex-col items-center gap-2 mx-auto text-blue-600 font-semibold">
                                    <ImageIcon size={40} />
                                    <span>Upload Bike Image</span>
                                </button>
                            )}
                        </CldUploadWidget>
                    )}
                    {errors.imageUrl && <p className="text-red-500 text-xs mt-1">{errors.imageUrl.message}</p>}
                </div>

                <button disabled={loading} type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 flex justify-center items-center">
                    {loading ? <Loader2 className="animate-spin" /> : "Save Bike"}
                </button>
            </form>
        </div>
    );
}