"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, Ruler, Box, User, Palette } from "lucide-react";

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
      <div className="min-h-screen flex flex-col items-center justify-center bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4 font-medium text-lg text-base-content/70">Loading tile details...</p>
      </div>
    );
  }

  if (error || !tile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 px-4">
        <div className="max-w-md text-center">
          <h2 className="text-4xl font-bold text-error mb-4">Oops!</h2>
          <p className="text-lg text-base-content/70 mb-8">
            We couldn't find the tile you're looking for. It may have been removed or the link is incorrect.
          </p>
          <button onClick={() => router.back()} className="btn btn-primary">
            <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between mb-8">
          <div className="breadcrumbs text-sm font-medium">
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/all-tiles">Gallery</Link></li>
              <li className="text-primary">{tile.title}</li>
            </ul>
          </div>
          <Link href="/all-tiles" className="btn btn-ghost btn-sm">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Gallery
          </Link>
        </div>

        <div className="bg-base-100 rounded-3xl shadow-2xl overflow-hidden border border-base-200">
          <div className="flex flex-col lg:flex-row">
            {/* Visuals: Large High-Res Preview */}
            <div className="lg:w-1/2 relative bg-neutral-100 flex items-center justify-center min-h-[400px] lg:min-h-[600px] p-8 lg:p-12 group overflow-hidden">
              <div className="absolute inset-0 bg-base-300 opacity-20"></div>
              <img
                src={tile.image}
                alt={tile.title}
                className="w-full h-full object-cover rounded-2xl shadow-2xl z-10 transition-transform duration-700 group-hover:scale-105"
              />
              {/* Category Badge */}
              <div className="absolute top-6 left-6 z-20">
                <span className="badge badge-primary badge-lg uppercase tracking-widest font-bold shadow-md">
                  {tile.category}
                </span>
              </div>
            </div>

            {/* Info Details */}
            <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
              <div className="mb-6">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-4xl md:text-5xl font-extrabold text-base-content leading-tight">
                    {tile.title}
                  </h1>
                  <span className="text-3xl font-bold text-primary ml-4 shrink-0">
                    ${tile.price}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-sm font-medium text-base-content/60 mb-8 pb-8 border-b border-base-200">
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    <span>{tile.creator}</span>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-base-300"></div>
                  <div className={`flex items-center gap-1.5 ${tile.inStock ? 'text-success' : 'text-error'}`}>
                    <Check className="w-4 h-4" />
                    <span>{tile.inStock ? 'In Stock' : 'Out of Stock'}</span>
                  </div>
                </div>
              </div>

              <div className="prose prose-lg mb-8 max-w-none">
                <p className="text-base-content/80 leading-relaxed">
                  {tile.description}
                </p>
              </div>

              {/* Specifications Grid */}
              <div className="grid grid-cols-2 gap-6 mb-10 bg-base-200/50 p-6 rounded-2xl">
                <div>
                  <h3 className="text-sm font-bold text-base-content/50 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Ruler className="w-4 h-4" /> Dimensions
                  </h3>
                  <p className="text-lg font-semibold">{tile.dimensions}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-base-content/50 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Box className="w-4 h-4" /> Material
                  </h3>
                  <p className="text-lg font-semibold">{tile.material}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-base-content/50 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Palette className="w-4 h-4" /> Style
                  </h3>
                  <p className="text-lg font-semibold">{tile.style}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="mb-10">
                <h3 className="text-sm font-bold text-base-content/50 uppercase tracking-wider mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tile.tags.map((tag, i) => (
                    <span key={i} className="badge badge-ghost badge-md px-4 py-3 bg-base-200 hover:bg-base-300 cursor-default transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-auto">
                <button className="btn btn-primary btn-lg flex-1 rounded-full shadow-lg hover:scale-105 transition-transform" disabled={!tile.inStock}>
                  Add to Cart
                </button>
                <button className="btn btn-outline btn-lg rounded-full px-8 hover:scale-105 transition-transform">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
