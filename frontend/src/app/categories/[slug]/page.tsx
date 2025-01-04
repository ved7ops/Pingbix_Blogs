import React from 'react';
import { fetchPostsByCategory, fetchCategory } from '@/lib/api';
import Link from 'next/link';
import CategoryCard from '@/components/CategoryCard';
import { Metadata } from 'next';

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  try {
    // Fetch posts for the current category only
    const { data: posts } = await fetchPostsByCategory(params.slug);

    return (
      <div className="min-h-screen bg-white">
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-2">
              {params.slug.toUpperCase()}
            </h1>
            <p className="text-gray-600 text-center">
              Latest posts in {params.slug.toUpperCase()}
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          <CategoryCard 
            title={params.slug.toUpperCase()}
            posts={posts}
          />
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-red-600">Error loading posts</h1>
        <p className="mt-4 text-gray-600">Please try again later</p>
        <Link href="/categories" className="text-blue-600 hover:underline mt-4 inline-block">
          ← Back to Categories
        </Link>
      </div>
    );
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { data: category } = await fetchCategory(params.slug);
  
  return {
    title: `${category.attributes.Name} - Your Blog`,
    description: category.attributes.description,
    alternates: {
      canonical: category.attributes.canonicalURL || `${process.env.NEXT_PUBLIC_SITE_URL}/categories/${params.slug}`
    }
  };
} 