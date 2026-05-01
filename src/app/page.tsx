import Link from "next/link";
import Marquee from "@/components/Marquee";
import FeaturedTiles from "@/components/FeaturedTiles";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <section className="relative bg-base-200 py-24 lg:py-32 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1588661601614-2396bbfe2ce1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Beautiful tile floor background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-base-200 via-base-200/90 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center lg:text-left flex flex-col items-center lg:items-start max-w-4xl lg:ml-12">
          <span className="badge badge-primary badge-lg mb-6 shadow-sm">Premium Collection 2026</span>
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-base-content">
            Discover Your <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Perfect</span> Aesthetic
          </h1>
          <p className="text-xl text-base-content/80 mb-10 max-w-2xl leading-relaxed">
            Elevate your space with our curated collection of artisan tiles. From classic ceramics to modern marble, find the perfect foundation for your design vision.
          </p>
          <Link href="/all-tiles" className="btn btn-primary btn-lg shadow-xl hover:scale-105 transition-transform duration-300 rounded-full px-10">
            Browse Now
          </Link>
        </div>
      </section>

      {/* Marquee Section */}
      <Marquee />

      {/* Featured Tiles Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Featured Collections</h2>
            <div className="w-24 h-1 bg-primary rounded-full mb-6"></div>
            <p className="text-base-content/70 max-w-2xl text-lg">
              Hand-picked by our design experts, these premium tiles represent the pinnacle of craftsmanship and modern aesthetics.
            </p>
          </div>
          
          <FeaturedTiles />
        </div>
      </section>
      
      {/* Decorative Call to Action */}
      <section className="py-24 bg-neutral text-neutral-content relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-primary/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-secondary/20 blur-3xl"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">Ready to transform your space?</h2>
          <p className="text-xl text-neutral-content/80 mb-10 max-w-2xl mx-auto">
            Create an account to save your favorite designs and get exclusive access to our newest collections.
          </p>
          <Link href="/register" className="btn btn-primary btn-lg rounded-full px-12">
            Join Now
          </Link>
        </div>
      </section>
    </div>
  );
}
