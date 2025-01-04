import { BlogPost } from '@/lib/api';
import PostCard from './PostCard';
import Link from 'next/link';

interface PostGridProps {
  posts: BlogPost[];
  variant?: 'featured' | 'grid';
}

export default function PostGrid({ posts, variant = 'grid' }: PostGridProps) {
  if (!posts?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No posts available</p>
      </div>
    );
  }

  const gridStyles = {
    featured: 'grid gap-8',
    grid: 'grid md:grid-cols-2 gap-8'
  };

  return (
    <div className={gridStyles[variant]}>
      {posts.map((post) => (
        post.slug ? (
          <Link 
            key={post.id} 
            href={`/posts/${post.slug}`}
            className="block h-full hover:no-underline"
          >
            <PostCard post={post} variant={variant} />
          </Link>
        ) : null
      ))}
    </div>
  );
} 