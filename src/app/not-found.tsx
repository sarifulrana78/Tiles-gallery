import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md">
        <h1 className="text-[120px] font-black tracking-tighter text-gray-100 leading-none mb-4 select-none">
          404
        </h1>
        <h2 className="text-3xl font-medium tracking-tight text-black mb-6">
          Architectural Deviation
        </h2>
        <p className="text-gray-500 font-light leading-relaxed mb-12">
          The space you are trying to access does not exist within our current collections. It may have been moved or the coordinate is incorrect.
        </p>
        
        <Link 
          href="/" 
          className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 text-xs font-bold tracking-widest uppercase hover:bg-gray-800 transition-all group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Return to Foundation
        </Link>
      </div>
      
      <div className="absolute bottom-12 left-0 right-0 flex justify-center opacity-10 pointer-events-none">
        <span className="text-xs font-bold tracking-[1em] uppercase text-black">Tiles Gallery Portfolio</span>
      </div>
    </div>
  );
}
