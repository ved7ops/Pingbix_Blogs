'use client';

import { useState, useEffect } from 'react';
import { fetchPosts, BlogPost } from '@/lib/api';
import CategoryFilter from '@/components/CategoryFilter';
import ClientPagination from '@/components/ClientPagination';
import CategorySidebar from '@/components/CategorySidebar';
import TagsSidebar from '@/components/TagsSidebar';

export default function CategoriesPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTag, setActiveTag] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetchPosts();
        setPosts(response.data.filter(post => post.PublishedDate));
        setLoading(false);
      } catch (error) {
        console.error('Error loading posts:', error);
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  const filteredPosts = posts
    .filter(post => activeCategory === 'all' ? true : post.category?.slug === activeCategory)
    .filter(post => activeTag ? post.tags?.some(t => t.slug === activeTag) : true);

  const postsPerPage = 2;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Blog Posts</h1>
        
        {/* Category Filter */}
        <div className="mb-12">
          <CategoryFilter 
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Posts Grid */}
          <div className="lg:col-span-2">
            <p className="text-gray-600 mb-6 text-sm">
              Showing {filteredPosts.length} posts in {activeCategory === 'all' ? 'all categories' : activeCategory}
            </p>
            <ClientPagination 
              posts={filteredPosts} 
              postsPerPage={postsPerPage} 
              totalPages={totalPages}
            />
          </div>
          
          {/* Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <CategorySidebar 
                posts={posts} 
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
              <TagsSidebar posts={posts} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 