import { fetchPosts, fetchCategories } from '@/lib/api';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  console.log('Search query:', query);

  if (!query) {
    return NextResponse.json({ posts: [] });
  }

  try {
    // Fetch both posts and categories
    const [postsResponse, categoriesResponse] = await Promise.all([
      fetchPosts(),
      fetchCategories()
    ]);

    const posts = postsResponse.data;
    const categories = categoriesResponse.data;
    const searchQuery = query.toLowerCase();

    // Find matching category
    const matchingCategory = categories.find((category: any) => 
      category.attributes.Name.toLowerCase().includes(searchQuery)
    );

    const filteredPosts = posts.filter((post: any) => {
      const title = post.attributes.title.toLowerCase();
      const content = post.attributes.content.toLowerCase();
      const category = post.attributes.category?.data?.attributes?.Name.toLowerCase();
      
      // Match by title, content, or category
      return title.includes(searchQuery) || 
             content.includes(searchQuery) || 
             (category && category.includes(searchQuery)) ||
             (matchingCategory && post.attributes.category?.data?.id === matchingCategory.id);
    });

    console.log('Filtered posts:', filteredPosts);
    return NextResponse.json({ 
      posts: filteredPosts,
      matchingCategory: matchingCategory ? matchingCategory.attributes.Name : null 
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Failed to search posts' }, { status: 500 });
  }
} 