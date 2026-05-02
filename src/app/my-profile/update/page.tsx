"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, authClient } from "@/lib/auth-client";
import { User, Image as ImageIcon, ArrowLeft } from "lucide-react";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (session) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
    }
  }, [session]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const { data, error } = await authClient.updateUser({
        name: name,
        image: image,
      });

      if (error) {
        setError(error.message || "Failed to update profile.");
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push("/my-profile");
          router.refresh();
        }, 1500);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-base-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
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

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-base-200 px-4 py-12">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body">
          <div className="flex items-center mb-6">
            <Link href="/my-profile" className="btn btn-ghost btn-sm btn-circle mr-2">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h2 className="text-2xl font-bold text-primary">Update Profile</h2>
          </div>
          
          {error && (
            <div className="alert alert-error mb-4 shadow-sm rounded-lg text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="alert alert-success mb-4 shadow-sm rounded-lg text-sm text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>Profile updated successfully! Redirecting...</span>
            </div>
          )}

          <form onSubmit={handleUpdate} className="flex flex-col gap-4">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-medium">Display Name</span>
              </div>
              <label className="input input-bordered flex items-center gap-2 focus-within:outline-primary">
                <User className="w-4 h-4 text-base-content/50" />
                <input
                  type="text"
                  className="grow"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-medium">Profile Image URL</span>
              </div>
              <label className="input input-bordered flex items-center gap-2 focus-within:outline-primary">
                <ImageIcon className="w-4 h-4 text-base-content/50" />
                <input
                  type="url"
                  className="grow"
                  placeholder="https://example.com/photo.jpg"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                />
              </label>
              <div className="label">
                <span className="label-text-alt text-base-content/50">Must be a valid image URL</span>
              </div>
            </label>

            {/* Preview Image */}
            {image && (
              <div className="mt-2 flex justify-center">
                <div className="avatar">
                  <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={image} alt="Preview" onError={(e) => (e.currentTarget.style.display = 'none')} />
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary mt-4 text-lg"
              disabled={loading || success}
            >
              {loading ? <span className="loading loading-spinner"></span> : "Update Information"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
