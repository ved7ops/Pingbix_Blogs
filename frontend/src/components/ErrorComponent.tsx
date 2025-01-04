import Link from 'next/link';

export default function ErrorComponent() {
  return (
    <div className="text-center py-10">
      <h2 className="text-2xl font-bold">Error loading category</h2>
      <Link href="/categories" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
        ← Back to Categories
      </Link>
    </div>
  );
} 