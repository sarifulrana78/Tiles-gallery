"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ArrowRight, Filter } from "lucide-react";

type Tile = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  price: number;
};

export default function AllTilesPage() {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const fetchTiles = async () => {
      setLoading(true);
      try {
        const url = debouncedSearch 
          ? `/api/tiles?search=${encodeURIComponent(debouncedSearch)}` 
          : "/api/tiles";
        const res = await fetch(url);
        const data = await res.json();
        setTiles(data);
      } catch (error) {
        console.error("Failed to fetch tiles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTiles();
  }, [debouncedSearch]);

  return (
    <div className="min-h-screen bg-white pb-32">
      {/* Header Section */}
      <div className="bg-[#f5f5f5] pt-32 pb-20 px-4 mt-20">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-6 text-black">The Collection</h1>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl font-light">
            Discover our complete portfolio of premium artisan tiles. Find the perfect match for your specific aesthetic and technical requirements.
          </p>
          
          {/* Search Bar - Minimalist */}
          <div className="relative max-w-2xl border-b-2 border-black group">
            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-black" />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-4 bg-transparent text-black placeholder:text-gray-400 focus:outline-none text-lg font-light"
              placeholder="Search by title, category, or style..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-12 mt-16">
        {/* Gallery Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <span className="loading loading-spinner loading-lg text-black"></span>
            <p className="mt-4 text-gray-500 font-light tracking-widest text-xs uppercase">Curating portfolio...</p>
          </div>
        ) : tiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-16 h-16 border border-gray-200 flex items-center justify-center mb-6">
              <Filter className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-2xl font-medium mb-2 tracking-tight">No results found</h3>
            <p className="text-gray-500 max-w-md font-light mb-8">
              We couldn't find any tiles matching "{search}". Try checking for typos or using broader search terms.
            </p>
            <button 
              onClick={() => setSearch("")} 
              className="text-sm font-bold tracking-widest uppercase border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {tiles.map((tile) => (
              <div key={tile.id} className="group cursor-pointer">
                <Link href={`/tile/${tile.id}`} className="block">
                  <div className="relative h-[450px] overflow-hidden bg-gray-100 mb-6">
                    <img
                      src={tile.image}
                      alt={tile.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 text-black text-xs font-bold tracking-widest uppercase px-3 py-1">
                        ${tile.price}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 font-bold tracking-widest uppercase mb-2">
                      {tile.category}
                    </span>
                    <h3 className="text-xl font-medium tracking-tight text-black mb-3 group-hover:text-gray-500 transition-colors">
                      {tile.title}
                    </h3>
                    <div className="flex items-center text-sm font-bold tracking-widest uppercase text-black">
                      <span className="group-hover:mr-2 transition-all">View Details</span>
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
