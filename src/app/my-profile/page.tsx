"use client";

import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { User, Mail, Calendar, Edit3, ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function MyProfilePage() {
  const { data: session, isPending } = useSession();
  const [imageError, setImageError] = useState(false);

  if (session?.user?.image) {
    console.log("User Image URL:", session.user.image);
  }

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <span className="loading loading-spinner loading-lg text-black"></span>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
        <h2 className="text-2xl font-medium mb-6">Access Denied</h2>
        <Link href="/login" className="bg-black text-white px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors">
          Go to Login
        </Link>
      </div>
    );
  }

  const userImage = session.user.image;

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 px-4 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <Link href="/" className="group flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-black transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="aspect-square bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden mb-8">
              {userImage && !imageError ? (
                <img 
                  src={userImage} 
                  alt={session.user.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex flex-col items-center gap-4 text-gray-300">
                  <User className="w-24 h-24 stroke-[1]" />
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase">No Profile Image</span>
                </div>
              )}
            </div>
            
            <h1 className="text-3xl font-medium tracking-tight mb-2 text-black">{session.user.name}</h1>
            <p className="text-gray-500 font-light text-sm mb-8">Registered Member</p>
            
            <Link 
              href="/my-profile/update" 
              className="w-full flex items-center justify-center gap-3 bg-black text-white py-4 text-xs font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              Update Profile
            </Link>
          </div>

          {/* Account Details */}
          <div className="lg:col-span-2 border-t border-gray-100 pt-8 lg:pt-0 lg:border-t-0 lg:border-l lg:pl-16">
            <div className="space-y-12">
              <section>
                <h2 className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400 mb-8">Account Information</h2>
                
                <div className="grid grid-cols-1 gap-10">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-black">Full Name</span>
                    <p className="text-xl font-light text-gray-800">{session.user.name}</p>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-black">Email Address</span>
                    <p className="text-xl font-light text-gray-800">{session.user.email}</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-black">Member Since</span>
                    <p className="text-xl font-light text-gray-800">
                      {session.user.createdAt ? new Date(session.user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Recently Joined'}
                    </p>
                  </div>
                </div>
              </section>

              <section className="pt-12 border-t border-gray-100">
                <h2 className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400 mb-8">Saved Collections</h2>
                <div className="bg-gray-50 p-12 text-center border border-dashed border-gray-200">
                  <p className="text-gray-400 font-light text-sm italic">You haven't saved any tiles to your collection yet.</p>
                  <Link href="/all-tiles" className="inline-block mt-6 text-[10px] font-bold tracking-widest uppercase text-black hover:underline underline-offset-8">
                    Browse Tiles
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
