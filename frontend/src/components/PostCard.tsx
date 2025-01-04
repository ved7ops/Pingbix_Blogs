import { BlogPost } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface PostCardProps {
  post: BlogPost;
  variant?: 'featured' | 'grid';
}

export default function PostCard({ post, variant = 'grid' }: PostCardProps) {
  const router = useRouter();
  const isFeatured = variant === 'featured';
  const imageData = Array.isArray(post.addMedia) ? post.addMedia[0] : null;
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

  const getImageUrl = () => {
    if (!imageData) return null;
    
    if (isFeatured) {
      return imageData.formats?.large?.url || 
             imageData.formats?.medium?.url || 
             imageData.url;
    }
    return imageData.formats?.medium?.url || 
           imageData.formats?.small?.url || 
           imageData.url;
  };

  const imageUrl = getImageUrl();

  return (
    <Link 
      href={`/posts/${post.slug}`}
      className="block group"
    >
      <article className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        {/* Image Section */}
        {imageUrl && (
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={`${baseUrl}${imageUrl}`}
              alt={post.title}
              fill
              className="object-fill"
              priority={isFeatured}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 800px, 1200px"
            />
            {/* Category Tag */}
            {post.category && (
              <div className="absolute top-4 left-4">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(`/categories/${post.category?.slug}`);
                  }}
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium
                    bg-white/80 backdrop-blur-sm text-gray-800"
                >
                  {post.category?.Name || 'Uncategorized'}
                </button>
              </div>
            )}
          </div>
        )}
        
        <div className="p-6">
          {/* Title - removed gradient hover effect */}
          <h3 className={`${isFeatured ? 'text-2xl' : 'text-xl'} font-bold text-gray-900 mb-3 line-clamp-2`}>
            {post.title}
          </h3>

          {/* Content Preview */}
          <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
            {post.content}
          </p>

          {/* Author and Date */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-700">
                  {post.User?.Name?.[0] || 'A'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-800">
                  {post.User?.Name || 'Anonymous'}
                </span>
                <time className="text-xs text-gray-500">
                  {formatDate(post.PublishedDate)}
                </time>
              </div>
            </div>

            {/* Read More Button */}
            <div 
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-md shadow-sm 
                group-hover:shadow-md group-hover:border-primary group-hover:text-primary transition-all duration-200"
            >
              <span className="text-sm font-medium text-gray-700 group-hover:text-primary">
                Read More
              </span>
              <svg 
                className="ml-2 w-4 h-4 text-gray-500 group-hover:text-primary transition-all duration-200 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
} 