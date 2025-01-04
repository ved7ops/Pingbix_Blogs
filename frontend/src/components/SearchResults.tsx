'use client';
import { useSearch } from '@/context/SearchContext';
import Link from 'next/link';
import PostImage from './PostImage';

export default function SearchResults({ onClose }: { onClose: () => void }) {
  const { searchResults, searchQuery } = useSearch();

  if (!searchQuery) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden max-h-[70vh] overflow-y-auto">
      {searchResults.length === 0 ? (
        <div className="p-4 text-gray-500">No results found</div>
      ) : (
        <div className="divide-y divide-gray-100">
          {searchResults.map((post) => (
            <Link
              key={post.id}
              href={`/posts/${post.slug}`}
              onClick={onClose}
              className="block p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                {post.addMedia?.data?.[0] && (
                  <PostImage 
                    imageData={post.addMedia.data[0]}
                    title={post.title}
                    className="w-16 h-16 flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {post.title}
                  </h4>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {post.content}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 