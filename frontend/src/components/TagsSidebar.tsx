'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Category {
  id: number;
  Name: string;
  slug: string;
}

interface TagsSidebarProps {
  posts: any[];
}

export default function TagsSidebar({ posts }: TagsSidebarProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
        const response = await fetch(`${baseUrl}/api/categories`);
        const data = await response.json();
        setCategories(data.data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-6 mt-6"
    >
      <h2 className="text-lg font-semibold mb-4 pb-2 border-b-2 border-blue-600">Tags</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <motion.div 
            key={category.id}
            whileHover={{ scale: 1.05 }}
            className="px-3 py-1.5 rounded-md text-sm bg-gray-200 text-gray-700 
              hover:bg-orange-500 hover:text-white transition-colors duration-200 cursor-pointer"
          >
            {category.Name}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 