import Link from "next/link";
import Marquee from "@/components/Marquee";
import FeaturedTiles from "@/components/FeaturedTiles";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Banner - Full Screen Luxury */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Luxurious architectural space with premium tiles"
            className="w-full h-full object-cover scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]"
          />
          {/* Subtle dark gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-12 relative z-10 w-full mt-24">
          <div className="max-w-4xl text-white">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-6 leading-[1.1]">
              Elevate Your <br />
              <span className="font-light italic text-gray-200">Architecture.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-xl leading-relaxed font-light">
              Discover the perfect aesthetic for your space with our curated collection of artisan tiles. Uncompromising quality meets visionary design.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link href="/all-tiles" className="group flex items-center gap-4 bg-white text-black px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-gray-100 transition-colors">
                Explore Collections
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4 animate-bounce opacity-70">
          <span className="text-white text-xs tracking-[0.3em] font-bold uppercase rotate-90 mb-8">Scroll</span>
          <div className="w-[1px] h-12 bg-white"></div>
        </div>
      </section>

      {/* Marquee Section */}
      <Marquee />

      {/* Featured Tiles Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 text-black">Iconic Surfaces</h2>
              <p className="text-gray-500 text-lg font-light leading-relaxed">
                Hand-picked by our design experts, these premium tiles represent the pinnacle of craftsmanship and modern aesthetics.
              </p>
            </div>
            <Link href="/all-tiles" className="text-sm font-bold tracking-widest uppercase pb-2 border-b-2 border-black hover:text-gray-500 hover:border-gray-500 transition-all">
              View All Products
            </Link>
          </div>
          
          <FeaturedTiles />
        </div>
      </section>
      
      {/* Decorative Call to Action */}
      <section className="py-32 bg-[#0a0a0a] text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1506143925201-0252c51780b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            className="w-full h-full object-cover grayscale"
            alt="Texture background"
          />
        </div>
        <div className="container mx-auto px-4 md:px-12 text-center relative z-10 flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-6 max-w-3xl">Transform your vision into reality.</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl font-light">
            Create an account to save your favorite designs and get exclusive access to our newest premium collections.
          </p>
          <Link href="/register" className="bg-white text-black px-10 py-4 text-sm font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors">
            Join The Community
          </Link>
        </div>
      </section>
    </div>
  );
}
