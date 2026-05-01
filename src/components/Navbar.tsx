"use client";

import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Menu, User, LogOut } from "lucide-react";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 lg:px-8 sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <Menu className="h-5 w-5" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li><Link href="/">Home</Link></li>
            <li><Link href="/all-tiles">All Tiles</Link></li>
            {session && <li><Link href="/my-profile">My Profile</Link></li>}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl font-bold gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-content">
            TG
          </div>
          <span className="hidden sm:inline">Tiles Gallery</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li><Link href="/" className="font-medium">Home</Link></li>
          <li><Link href="/all-tiles" className="font-medium">All Tiles</Link></li>
          {session && <li><Link href="/my-profile" className="font-medium">My Profile</Link></li>}
        </ul>
      </div>
      <div className="navbar-end gap-2">
        {isPending ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : session ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full bg-base-300 flex items-center justify-center">
                {session.user.image || session.user.photoURL ? (
                  <img
                    alt="User Avatar"
                    src={session.user.image || session.user.photoURL || ""}
                  />
                ) : (
                  <User className="w-6 h-6 m-auto mt-2 text-base-content/50" />
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li className="px-4 py-2 font-semibold border-b border-base-200 mb-1 opacity-70">
                {session.user.name}
              </li>
              <li>
                <Link href="/my-profile" className="justify-between">
                  Profile
                  <span className="badge badge-primary badge-sm">New</span>
                </Link>
              </li>
              <li>
                <button onClick={handleSignOut} className="text-error">
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link href="/login" className="btn btn-primary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
