'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Category {
  id: number;
  Name: string;
  slug: string;
  postCount?: number;
}

interface CategorySidebarProps {
  posts: {
    id: number;
    category?: {
      id: number;
      Name: string;
      slug: string;
    };
  }[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategorySidebar({ posts, activeCategory, onCategoryChange }: CategorySidebarProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
        const response = await fetch(`${baseUrl}/api/categories`);
        const data = await response.json();
        
        const categoriesWithCount = data.data.map((category: Category) => ({
          ...category,
          postCount: posts.filter(post => post.category?.id === category.id).length
        }));

        setCategories(categoriesWithCount);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [posts]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-4 mt-[42px]"
    >
      <h2 className="text-lg font-semibold mb-4 pb-2 border-b-2 border-blue-600">Categories</h2  >
      <div className="space-y-3">
        {categories.map((category) => (
          <motion.button 
            key={category.id}
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onCategoryChange(category.slug)}
            className="w-full flex items-center justify-between py-1 group"
          >
            <span className="text-sm flex items-center gap-2 text-gray-700 group-hover:text-gray-900">
              <svg 
                className={`w-3 h-3 ${activeCategory === category.slug ? 'text-gray-900' : 'text-gray-400'}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7"
                />
              </svg>
              {category.Name}
            </span>
            <span className="text-xs px-2 py-0.5 bg-blue-600 text-white rounded">
              {category.postCount || 0}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
} 