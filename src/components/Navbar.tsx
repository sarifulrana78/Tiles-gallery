"use client";

import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Menu, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
    router.push("/login");
  };

  return (
    <div className={`navbar fixed top-0 z-50 transition-all duration-300 px-4 lg:px-12 py-4 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100" : "bg-transparent"}`}>
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden -ml-2">
            <Menu className="h-6 w-6" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-lg dropdown-content bg-white rounded-none z-[1] mt-3 w-64 p-4 shadow-2xl border border-gray-100"
          >
            <li><Link href="/" className="font-semibold text-lg tracking-wide uppercase">Home</Link></li>
            <li><Link href="/all-tiles" className="font-semibold text-lg tracking-wide uppercase">All Tiles</Link></li>
            {session && <li><Link href="/my-profile" className="font-semibold text-lg tracking-wide uppercase">My Profile</Link></li>}
          </ul>
        </div>
        <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
          <span className="text-2xl font-black tracking-tighter uppercase">TILES<span className="font-light">GALLERY</span></span>
        </Link>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-8">
          <li><Link href="/" className="text-sm font-bold tracking-widest uppercase hover:text-black/60 transition-colors bg-transparent!">HOME</Link></li>
          <li><Link href="/all-tiles" className="text-sm font-bold tracking-widest uppercase hover:text-black/60 transition-colors bg-transparent!">ALL TILES</Link></li>
          {session && <li><Link href="/my-profile" className="text-sm font-bold tracking-widest uppercase hover:text-black/60 transition-colors bg-transparent!">MY PROFILE</Link></li>}
        </ul>
      </div>
      
      <div className="navbar-end gap-4">
        {isPending ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : session ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:bg-gray-100 transition-colors">
              <div className="w-9 h-9 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center overflow-hidden">
                {session.user.image && !imageError ? (
                  <img
                    alt="User Avatar"
                    src={session.user.image || ""}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <User className="w-5 h-5 text-gray-500" />
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-md dropdown-content bg-white rounded-none z-[1] mt-4 w-56 p-2 shadow-2xl border border-gray-100"
            >
              <li className="px-4 py-3 font-bold border-b border-gray-100 mb-2 truncate">
                {session.user.name}
              </li>
              <li>
                <Link href="/my-profile" className="hover:bg-gray-50 uppercase text-xs tracking-wider font-bold py-3">
                  My Account
                </Link>
              </li>
              <li>
                <button onClick={handleSignOut} className="text-red-600 hover:bg-red-50 uppercase text-xs tracking-wider font-bold py-3">
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link href="/login" className="btn btn-outline border-black text-black hover:bg-black hover:text-white rounded-none px-8 font-bold tracking-widest uppercase text-xs">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
