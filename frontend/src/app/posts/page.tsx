import { fetchPosts } from '@/lib/api';
import PostGrid from '@/components/PostGrid';

export default async function PostsPage() {
  try {
    const { data: posts } = await fetchPosts();

    if (!posts?.length) {
      return (
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold">No posts available</h2>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">All Posts</h1>
        <PostGrid posts={posts} variant="grid" />
      </div>
    );
  } catch (error) {
    console.error('Error:', error);
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold">Error loading posts</h2>
        <p className="text-gray-600 mt-2">Please try again later</p>
      </div>
    );
  }
} 