"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function BrandFilter({ brands }: { brands: string[] }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleFilter = (brand: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (brand) {
            params.set("brand", brand);
        } else {
            params.delete("brand"); // Agar 'All Brands' select kiya toh remove kar do
        }

        // URL update karega: e.g. /?brand=Yamaha
        router.push(`/?${params.toString()}`);
    };

    return (
        <select
            onChange={(e) => handleFilter(e.target.value)}
            defaultValue={searchParams.get("brand") || ""}
            className="p-2.5 border rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
            <option value="">All Brands</option>
            {brands.map((brand) => (
                <option key={brand} value={brand}>
                    {brand}
                </option>
            ))}
        </select>
    );
}