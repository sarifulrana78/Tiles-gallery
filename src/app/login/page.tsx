"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await signIn.email({
        email,
        password,
      });

      if (error) {
        setError(error.message || "Failed to login. Please check your credentials.");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError("");
    try {
      const { error } = await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
      if (error) {
        console.error("Google Sign-In error:", error);
        setError(error.message || "Failed to login with Google.");
        setGoogleLoading(false);
      }
    } catch (err: any) {
      console.error("Google Sign-In exception:", err);
      setError(err.message || "Failed to login with Google.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-24">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-medium tracking-tight mb-2 text-black">Welcome Back</h2>
          <p className="text-gray-500 font-light">Sign in to your account to continue.</p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 mb-6 text-sm font-medium border border-red-100 flex items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-5 w-5 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div>
            <label className="block text-xs font-bold tracking-widest uppercase text-black mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="email"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 text-black focus:outline-none focus:border-black focus:bg-white transition-colors text-sm"
                placeholder="hello@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold tracking-widest uppercase text-black mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="password"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 text-black focus:outline-none focus:border-black focus:bg-white transition-colors text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 mt-2 text-sm font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:text-gray-500"
            disabled={loading || googleLoading}
          >
            {loading ? <span className="loading loading-spinner loading-sm"></span> : "Sign In"}
          </button>
        </form>

        <div className="relative flex items-center justify-center my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative bg-white px-4 text-xs font-bold tracking-widest uppercase text-gray-400">
            Or
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full border border-gray-200 bg-white text-black py-4 text-sm font-bold tracking-widest uppercase hover:bg-gray-50 transition-colors disabled:bg-gray-100 disabled:text-gray-400 flex items-center justify-center gap-3"
          disabled={loading || googleLoading}
        >
          {googleLoading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
            </svg>
          )}
          Continue with Google
        </button>

        <p className="text-center mt-8 text-sm text-gray-500 font-light">
          Don't have an account?{" "}
          <Link href="/register" className="text-black font-medium hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
