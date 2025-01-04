'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import CategoryCard from '@/components/CategoryCard';
import Link from 'next/link';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [posts, setPosts] = useState<any[]>([]);
  const [matchingCategory, setMatchingCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchPosts = async () => {
      if (!query) {
        setPosts([]);
        setLoading(false);
        return;
      }

      try {
        console.log('Searching for:', query);
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        console.log('Search results:', data);
        
        setPosts(data.posts || []);
        setMatchingCategory(data.matchingCategory);
        setError(null);
      } catch (error) {
        console.error('Search error:', error);
        setError('Failed to fetch search results');
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    searchPosts();
  }, [query]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Search Results for: {query}
          </h1>
          {matchingCategory && (
            <p className="text-gray-600">
              Showing posts from category:{' '}
              <Link 
                href={`/categories/${matchingCategory.toLowerCase()}`}
                className="text-blue-600 hover:underline"
              >
                {matchingCategory}
              </Link>
            </p>
          )}
        </div>
        
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : Array.isArray(posts) && posts.length > 0 ? (
          <CategoryCard 
            title={matchingCategory ? `Posts in ${matchingCategory}` : "Search Results"} 
            posts={posts} 
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No posts found for "{query}"</p>
            <p className="text-gray-500 mt-2">
              Try searching for categories like "CPAAS" or "SMS"
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 