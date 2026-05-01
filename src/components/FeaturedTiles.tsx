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
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4 text-neutral-content/60">Loading featured collections...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {tiles.map((tile) => (
        <div key={tile.id} className="card bg-base-100 shadow-xl group overflow-hidden">
          <figure className="relative h-64 overflow-hidden">
            <img
              src={tile.image}
              alt={tile.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute top-4 right-4">
              <span className="badge badge-secondary badge-lg font-semibold shadow-sm">${tile.price}</span>
            </div>
          </figure>
          <div className="card-body p-6">
            <div className="flex justify-between items-start mb-2">
              <h2 className="card-title text-xl">{tile.title}</h2>
            </div>
            <p className="text-base-content/70 text-sm line-clamp-2 mb-4">{tile.description}</p>
            <div className="card-actions justify-end mt-auto">
              <Link href={`/tile/${tile.id}`} className="btn btn-primary btn-sm w-full group-hover:btn-accent transition-colors">
                View Details <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
