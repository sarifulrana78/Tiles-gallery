import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral text-neutral-content pt-16 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-content text-xl font-bold">
              TG
            </div>
            <span className="text-2xl font-bold">Tiles Gallery</span>
          </div>
          <p className="text-neutral-content/80 mb-6">
            Discover the perfect aesthetic for your space with our premium collection of artisan tiles. From rustic terracotta to modern marble, find exactly what you need.
          </p>
          <div className="flex gap-4">
            <a href="#" className="btn btn-circle btn-sm btn-ghost hover:bg-primary/20"><Facebook className="w-4 h-4" /></a>
            <a href="#" className="btn btn-circle btn-sm btn-ghost hover:bg-primary/20"><Twitter className="w-4 h-4" /></a>
            <a href="#" className="btn btn-circle btn-sm btn-ghost hover:bg-primary/20"><Instagram className="w-4 h-4" /></a>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="flex flex-col gap-2">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link href="/all-tiles" className="hover:text-primary transition-colors">All Tiles</Link></li>
            <li><Link href="/login" className="hover:text-primary transition-colors">Login / Register</Link></li>
            <li><Link href="/my-profile" className="hover:text-primary transition-colors">My Profile</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <ul className="flex flex-col gap-4 text-neutral-content/80">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>123 Artisan Way, Design District<br />New York, NY 10012</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary shrink-0" />
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary shrink-0" />
              <span>hello@tilesgallery.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pt-8 border-t border-neutral-content/10 text-center text-sm text-neutral-content/60">
        <p>&copy; {new Date().getFullYear()} Tiles Gallery. All rights reserved.</p>
      </div>
    </footer>
  );
}
