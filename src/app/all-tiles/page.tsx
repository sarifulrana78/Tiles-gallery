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
    <div className="min-h-screen bg-base-100 pb-20">
      {/* Header Section */}
      <div className="bg-neutral text-neutral-content py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Explore the Gallery</h1>
          <p className="text-lg opacity-80 mb-10 max-w-2xl mx-auto">
            Discover our complete collection of premium artisan tiles. Find the perfect match for your specific aesthetic and technical requirements.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-base-content/50" />
            </div>
            <input
              type="text"
              className="input input-lg w-full pl-12 pr-4 bg-base-100 text-base-content shadow-xl focus:outline-primary rounded-full"
              placeholder="Search by title, category, or style..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        {/* Gallery Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 min-h-[400px]">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="mt-4 text-base-content/60 font-medium">Searching our catalog...</p>
          </div>
        ) : tiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 min-h-[400px] text-center">
            <div className="w-24 h-24 bg-base-200 rounded-full flex items-center justify-center mb-4">
              <Filter className="w-10 h-10 text-base-content/40" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No tiles found</h3>
            <p className="text-base-content/60 max-w-md">
              We couldn't find any tiles matching "{search}". Try checking for typos or using broader search terms.
            </p>
            <button 
              onClick={() => setSearch("")} 
              className="btn btn-primary mt-6"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {tiles.map((tile) => (
              <div key={tile.id} className="card bg-base-100 shadow-xl group border border-base-200 hover:border-primary/30 transition-all duration-300">
                <figure className="relative h-64 overflow-hidden">
                  <img
                    src={tile.image}
                    alt={tile.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white font-medium text-lg">${tile.price}</span>
                  </div>
                </figure>
                <div className="card-body p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="badge badge-primary badge-outline badge-sm uppercase tracking-wider">{tile.category}</span>
                    </div>
                    <h2 className="card-title text-xl mb-2 line-clamp-1 group-hover:text-primary transition-colors">{tile.title}</h2>
                    <p className="text-base-content/70 text-sm line-clamp-2">{tile.description}</p>
                  </div>
                  <div className="card-actions mt-6 pt-4 border-t border-base-200">
                    <Link href={`/tile/${tile.id}`} className="btn btn-primary btn-outline w-full group-hover:btn-primary transition-colors">
                      View Details <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
