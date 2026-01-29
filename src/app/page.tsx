import { prisma } from "@/lib/prisma";
import BikeCard from "@/components/BikeCard";
// import Navbar from "@/components/Navbar";

async function getBikes() {
  // Fetching bikes directly from MySQL via Prisma
  const bikes = await prisma.bike.findMany({
    orderBy: { createdAt: "desc" },
  });
  return bikes;
}

export default async function HomePage() {
  const bikes = await getBikes();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 py-16 px-4 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Rent Your Dream Bike Today
        </h1>
        <p className="mt-4 text-lg text-blue-100">
          Fast, affordable, and reliable bike rentals in your city.
        </p>
      </div>

      {/* Bike Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Available Bikes</h2>

        {bikes.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm">
            <p className="text-gray-500">No bikes available at the moment. Check back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {bikes.map((bike) => (
              <BikeCard key={bike.id} bike={bike} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}