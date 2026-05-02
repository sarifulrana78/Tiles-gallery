import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-[#ffffff] pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-20 mb-16">
        <div className="md:col-span-2">
          <Link href="/" className="inline-block mb-8 hover:opacity-70 transition-opacity">
            <span className="text-3xl font-black tracking-tighter uppercase">TILES<span className="font-light">GALLERY</span></span>
          </Link>
          <p className="text-gray-400 mb-8 max-w-md leading-relaxed font-light text-sm">
            Curating the world's most exquisite artisan tiles. Elevate your architectural spaces with our premium collections, designed for the modern aesthetic.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
            </a>
            <a href="#" className="w-10 h-10 border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
            </a>
            <a href="#" className="w-10 h-10 border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold tracking-widest uppercase mb-8 text-gray-500">Navigation</h3>
          <ul className="flex flex-col gap-4 text-sm font-light">
            <li><Link href="/" className="hover:text-white text-gray-300 transition-colors">Home</Link></li>
            <li><Link href="/all-tiles" className="hover:text-white text-gray-300 transition-colors">Collections</Link></li>
            <li><Link href="/login" className="hover:text-white text-gray-300 transition-colors">Login / Register</Link></li>
            <li><Link href="/my-profile" className="hover:text-white text-gray-300 transition-colors">My Profile</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold tracking-widest uppercase mb-8 text-gray-500">Contact</h3>
          <ul className="flex flex-col gap-5 text-sm font-light text-gray-300">
            <li className="flex items-start gap-4">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Nabinagar Housing <br /> Mohammadpur, Dhaka </span>
            </li>
            <li className="flex items-center gap-4">
              <Phone className="w-4 h-4 shrink-0" />
              <span>+088 01233435358</span>
            </li>
            <li className="flex items-center gap-4">
              <Mail className="w-4 h-4 shrink-0" />
              <span>studio@tilesgallery.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-12 pt-8 border-t border-gray-800 text-xs font-light text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} TILES GALLERY. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-white transition-colors">PRIVACY POLICY</Link>
          <Link href="#" className="hover:text-white transition-colors">TERMS OF SERVICE</Link>
        </div>
      </div>
    </footer>
  );
}
