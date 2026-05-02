"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Tile = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  price: number;
  featured?: boolean;
};

export default function FeaturedTiles() {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTiles = async () => {
      try {
        const res = await fetch("/api/tiles");
        const data = await res.json();
        setTiles(data.filter((t: Tile) => t.featured).slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch tiles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTiles();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <span className="loading loading-spinner loading-lg text-black"></span>
        <p className="mt-4 text-gray-500 font-light tracking-widest text-xs uppercase">Loading collection...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
      {tiles.map((tile) => (
        <div key={tile.id} className="group cursor-pointer">
          <Link href={`/tile/${tile.id}`} className="block">
            <div className="relative h-[400px] overflow-hidden bg-gray-100 mb-6">
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
                <span className="group-hover:mr-2 transition-all">Explore</span>
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
