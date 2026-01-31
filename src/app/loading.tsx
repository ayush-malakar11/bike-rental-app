export default function Loading() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="h-10 w-64 bg-gray-200 animate-pulse rounded-lg mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="bg-white rounded-2xl h-80 w-full animate-pulse border border-gray-100 shadow-sm">
                        <div className="h-48 bg-gray-200 rounded-t-2xl"></div>
                        <div className="p-5 space-y-3">
                            <div className="h-6 bg-gray-200 w-3/4 rounded"></div>
                            <div className="h-4 bg-gray-200 w-1/2 rounded"></div>
                            <div className="h-10 bg-gray-200 w-full rounded mt-4"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}