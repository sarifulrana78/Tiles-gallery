"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-base-100 px-4 text-center">
      <div className="w-24 h-24 bg-error/10 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle className="w-12 h-12 text-error" />
      </div>
      <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-lg text-base-content/60 max-w-md mx-auto mb-8">
        We apologize for the inconvenience. An unexpected error has occurred while trying to process your request.
      </p>
      <button
        onClick={() => reset()}
        className="btn btn-primary rounded-full px-8"
      >
        <RotateCcw className="w-5 h-5 mr-2" /> Try again
      </button>
    </div>
  );
}
