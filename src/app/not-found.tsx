import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-base-100 px-4 text-center">
      <h1 className="text-9xl font-black text-primary/20">404</h1>
      <h2 className="text-4xl font-bold mt-4 mb-2">Page Not Found</h2>
      <p className="text-lg text-base-content/60 max-w-md mx-auto mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link href="/" className="btn btn-primary btn-lg rounded-full px-8">
        <Home className="w-5 h-5 mr-2" /> Back to Home
      </Link>
    </div>
  );
}
