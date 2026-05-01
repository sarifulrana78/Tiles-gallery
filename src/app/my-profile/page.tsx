"use client";

import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { User, Mail, Calendar, Edit3 } from "lucide-react";

export default function MyProfilePage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4 font-medium text-base-content/70">Loading profile...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-base-100">
        <h2 className="text-2xl font-bold mb-4">You are not logged in</h2>
        <Link href="/login" className="btn btn-primary">Go to Login</Link>
      </div>
    );
  }

  const userImage = session.user.image || session.user.photoURL;

  return (
    <div className="min-h-[80vh] bg-base-200 py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="card bg-base-100 shadow-2xl">
          <div className="bg-neutral h-32 w-full rounded-t-2xl relative">
            <div className="absolute -bottom-16 left-8">
              <div className="avatar">
                <div className="w-32 rounded-full ring ring-base-100 ring-offset-base-100 ring-offset-2 bg-base-300 flex items-center justify-center">
                  {userImage ? (
                    <img src={userImage} alt={session.user.name} />
                  ) : (
                    <User className="w-16 h-16 text-base-content/50" />
                  )}
                </div>
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <Link href="/my-profile/update" className="btn btn-primary btn-sm shadow-md">
                <Edit3 className="w-4 h-4 mr-1" /> Update Information
              </Link>
            </div>
          </div>
          
          <div className="card-body pt-20 px-8 pb-12">
            <h1 className="text-3xl font-bold mb-1">{session.user.name}</h1>
            <p className="text-base-content/60 font-medium mb-8">Member Profile</p>
            
            <div className="divider mb-8">Account Details</div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-base-content/50 text-sm uppercase tracking-wider mb-1">Full Name</h3>
                  <p className="text-lg font-medium">{session.user.name}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-base-content/50 text-sm uppercase tracking-wider mb-1">Email Address</h3>
                  <p className="text-lg font-medium">{session.user.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-base-content/50 text-sm uppercase tracking-wider mb-1">Account Created</h3>
                  <p className="text-lg font-medium">
                    {session.user.createdAt ? new Date(session.user.createdAt).toLocaleDateString() : 'Recently'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
