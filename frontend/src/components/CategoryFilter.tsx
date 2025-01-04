'use client';
import { useState, useEffect } from 'react';

interface Category {
  id: number;
  Name: string;
  slug: string;
}

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
        const response = await fetch(`${baseUrl}/api/categories`);
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 justify-center mb-12">
      <button
        onClick={() => onCategoryChange('all')}
        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200
          border-2 shadow-sm
          ${activeCategory === 'all' 
            ? 'bg-orange-500 text-white border-orange-500 hover:bg-orange-600' 
            : 'bg-white text-gray-700 border-gray-200 hover:border-orange-500 hover:text-orange-500'}`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.slug)}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200
            border-2 shadow-sm
            ${activeCategory === category.slug
              ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700' 
              : 'bg-white text-gray-700 border-gray-200 hover:border-blue-500 hover:text-blue-500'}`}
        >
          {category.Name}
        </button>
      ))}
    </div>
  );
} 