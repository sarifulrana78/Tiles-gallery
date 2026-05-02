"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Tile = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  price: number;
  currency: string;
  dimensions: string;
  material: string;
  style: string;
  creator: string;
  tags: string[];
  inStock: boolean;
};

export default function SingleTilePage() {
  const params = useParams();
  const router = useRouter();
  const [tile, setTile] = useState<Tile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTile = async () => {
      try {
        const res = await fetch(`/api/tiles/${params.id}`);
        if (!res.ok) {
          if (res.status === 404) setError(true);
          throw new Error("Tile not found");
        }
        const data = await res.json();
        setTile(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) {
      fetchTile();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <span className="loading loading-spinner loading-lg text-black"></span>
        <p className="mt-4 text-gray-500 font-light tracking-widest text-xs uppercase">Loading specifications...</p>
      </div>
    );
  }

  if (error || !tile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
        <div className="max-w-md text-center">
          <h2 className="text-4xl font-medium tracking-tight mb-4 text-black">Product Not Found</h2>
          <p className="text-gray-500 mb-8 font-light leading-relaxed">
            The collection item you are looking for may have been archived or removed from our catalog.
          </p>
          <button onClick={() => router.back()} className="text-sm font-bold tracking-widest uppercase border-b-2 border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-all">
            Return to Gallery
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-32">
      <div className="container mx-auto px-4 md:px-12">
        {/* Navigation */}
        <div className="mb-12">
          <Link href="/all-tiles" className="inline-flex items-center text-xs font-bold tracking-widest uppercase hover:text-gray-500 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Collections
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Visuals: Large High-Res Preview */}
          <div className="lg:w-3/5">
            <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
              <img
                src={tile.image}
                alt={tile.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info Details */}
          <div className="lg:w-2/5 flex flex-col justify-center">
            <div className="mb-12">
              <span className="text-xs text-gray-400 font-bold tracking-widest uppercase mb-4 block">
                {tile.category} Collection
              </span>
              <h1 className="text-5xl md:text-6xl font-medium text-black leading-[1.1] tracking-tight mb-6">
                {tile.title}
              </h1>
              <span className="text-3xl font-light text-black block mb-8">
                ${tile.price} <span className="text-lg text-gray-400">/ sq. ft.</span>
              </span>
              
              <div className="prose prose-lg max-w-none text-gray-600 font-light leading-relaxed">
                <p>{tile.description}</p>
              </div>
            </div>

            {/* Specifications Grid */}
            <div className="border-t border-gray-200 py-8 mb-8">
              <h3 className="text-xs font-bold tracking-widest uppercase text-black mb-8">Specifications</h3>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 text-sm">
                <div>
                  <dt className="text-gray-400 font-light mb-1">Dimensions</dt>
                  <dd className="font-medium text-black">{tile.dimensions}</dd>
                </div>
                <div>
                  <dt className="text-gray-400 font-light mb-1">Material</dt>
                  <dd className="font-medium text-black">{tile.material}</dd>
                </div>
                <div>
                  <dt className="text-gray-400 font-light mb-1">Finish / Style</dt>
                  <dd className="font-medium text-black">{tile.style}</dd>
                </div>
                <div>
                  <dt className="text-gray-400 font-light mb-1">Manufacturer</dt>
                  <dd className="font-medium text-black">{tile.creator}</dd>
                </div>
                <div>
                  <dt className="text-gray-400 font-light mb-1">Availability</dt>
                  <dd className={`font-medium ${tile.inStock ? 'text-black' : 'text-red-500'}`}>
                    {tile.inStock ? 'In Stock - Ready to Ship' : 'Currently Out of Stock'}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Tags */}
            <div className="mb-12">
              <div className="flex flex-wrap gap-2">
                {tile.tags.map((tag, i) => (
                  <span key={i} className="px-4 py-2 bg-gray-100 text-xs font-bold tracking-widest uppercase text-gray-600">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 mt-auto">
              <button 
                className="w-full bg-black text-white py-5 text-sm font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:text-gray-500 flex items-center justify-center gap-2" 
                disabled={!tile.inStock}
              >
                {tile.inStock ? 'Request a Sample' : 'Out of Stock'}
                {tile.inStock && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
