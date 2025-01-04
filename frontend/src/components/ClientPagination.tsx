'use client';

import { useState } from 'react';
import PostCard from './PostCard';
import { BlogPost } from '@/lib/api';

interface ClientPaginationProps {
  posts: BlogPost[];
  postsPerPage: number;
  totalPages: number;
}

export default function ClientPagination({ posts, postsPerPage, totalPages }: ClientPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="flex flex-col space-y-12">
      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {currentPosts.map((post, index) => (
          <div key={post.id} className="flex flex-col h-full">
            <PostCard 
              post={post} 
              variant={index === 0 && currentPage === 1 ? 'featured' : 'grid'} 
            />
          </div>
        ))}
      </div>

      {/* Future Ad Space */}
      <div className="hidden md:block md:col-span-1 bg-gray-50 rounded-lg p-6">
        {/* Ad space placeholder - will be implemented later */}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <div className="inline-flex rounded-lg border border-gray-200 bg-white shadow-sm">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`
                  px-4 py-2 text-sm font-medium
                  ${number > 1 ? 'border-l border-gray-200' : ''}
                  ${currentPage === number 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'}
                  ${number === 1 ? 'rounded-l-lg' : ''}
                  ${number === totalPages ? 'rounded-r-lg' : ''}
                  transition-colors duration-200
                `}
              >
                {number}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 