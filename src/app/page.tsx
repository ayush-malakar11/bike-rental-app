import { prisma } from "@/lib/prisma";
import BikeCard from "@/components/BikeCard";
// import Navbar from "@/components/Navbar";

async function getBikes(searchParams: { brand?: string; search?: string }) {
  const { brand, search } = searchParams;

  const bikes = await prisma.bike.findMany({
    where: {
      isAvailable: true,
      // Filtering logic
      AND: [
        brand ? { brand: { equals: brand } } : {},
        search ? {
          OR: [
            { modelName: { contains: search } },
            { brand: { contains: search } }
          ]
        } : {}
      ]
    },
    orderBy: { createdAt: "desc" },
  });
  return bikes;
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ brand?: string; search?: string }>;
}) {
  const params = await searchParams;
  const bikes = await getBikes(params);
  console.log(bikes)

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Search & Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 pt-8 flex flex-col md:flex-row gap-4">
        <form className="flex-1 flex gap-2">
          <input
            name="search"
            type="text"
            placeholder="Search bike model..."
            className="w-full p-2.5 border rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold">
            Search
          </button>
        </form>

        <select
          name="brand"
          className="p-2.5 border rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
        // In a real app, we use a 'onChange' to trigger search, 
        // but for now, we'll keep it simple with a form submit.
        >
          <option value="">All Brands</option>
          <option value="Kawasaki">Kawasaki</option>
          <option value="Yamaha">Yamaha</option>
          <option value="Royal Enfield">Royal Enfield</option>
        </select>
      </div>

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
              < BikeCard key={bike.id} bike={bike} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}