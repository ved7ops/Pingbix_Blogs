'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
        <h2 className="text-red-800 font-semibold">Something went wrong!</h2>
        <p className="text-red-600 mt-1">{error.message}</p>
        <button
          onClick={reset}
          className="mt-4 bg-red-100 text-red-700 px-4 py-2 rounded hover:bg-red-200"
        >
          Try again
        </button>
      </div>
    </div>
  );
} 