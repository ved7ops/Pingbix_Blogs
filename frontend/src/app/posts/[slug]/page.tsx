import { fetchPostBySlug } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';
import Markdown from 'markdown-to-jsx';
// import { Comments } from '@/components/Comments';  // Temporarily disabled

export default async function PostPage({ params }: { params: { slug: string } }) {
  try {
    const response = await fetchPostBySlug(params.slug);
    const post = response.data[0];

    if (!post) {
      return (
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold">Post not found</h1>
          <Link href="/" className="text-primary hover:underline mt-4 inline-block">
            ← Back to Home
          </Link>
        </div>
      );
    }

    // Get image data
    const imageData = Array.isArray(post.addMedia) ? post.addMedia[0] : null;
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
    const imageUrl = imageData?.formats?.large?.url || 
                    imageData?.formats?.medium?.url || 
                    imageData?.url;

    return (
      <div className="min-h-screen bg-gray-50">
        <article className="container mx-auto px-4 py-12 max-w-4xl">
          <Link 
            href="/" 
            className="inline-flex items-center px-4 py-2 mb-8 bg-white border border-gray-200 rounded-md shadow-sm 
              hover:shadow-md hover:border-primary hover:text-primary transition-all duration-200 group
              active:shadow-inner active:translate-y-[1px]"
          >
            <svg 
              className="mr-2 w-4 h-4 text-gray-500 group-hover:text-primary transition-all duration-200 group-hover:-translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="text-sm font-medium text-gray-700 group-hover:text-primary">
              Back to Home
            </span>
          </Link>
          
          {/* Featured Image */}
          {imageUrl && (
            <div className="relative aspect-[21/9] w-full mb-8 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={`${baseUrl}${imageUrl}`}
                alt={post.title}
                fill
                className="object-fill"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
              {/* Category Tag */}
              {post.category && (
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-sm">
                    {post.category.Name}
                  </span>
                </div>
              )}
            </div>
          )}

          <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
          
          <div className="flex items-center justify-between mb-8 pb-8 border-b">
            <div className="flex items-center text-gray-600">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                <span className="text-lg font-semibold">
                  {post.User?.Name?.[0] || 'A'}
                </span>
              </div>
              <div>
                <div className="font-medium">{post.User?.Name || 'Anonymous'}</div>
                <time className="text-sm text-gray-500">
                  {formatDate(post.PublishedDate)}
                </time>
              </div>
            </div>

            <ShareButtons 
              title={post.title} 
              url={`${process.env.NEXT_PUBLIC_STRAPI_URL}/posts/${post.slug}`}
            />
          </div>

          <div className="prose prose-lg max-w-none">
            <Markdown
              options={{
                overrides: {
                  h1: {
                    component: ({ children }) => <h1 className="text-4xl font-bold mb-6">{children}</h1>
                  },
                  h2: {
                    component: ({ children }) => <h2 className="text-3xl font-bold mb-4 mt-8">{children}</h2>
                  },
                  p: {
                    component: ({ children }) => <p className="mb-6 text-gray-700 leading-relaxed">{children}</p>
                  },
                  ul: {
                    component: ({ children }) => <ul className="list-disc pl-6 mb-6 text-gray-700">{children}</ul>
                  },
                  li: {
                    component: ({ children }) => <li className="mb-2">{children}</li>
                  },
                  strong: {
                    component: ({ children }) => <strong className="font-semibold">{children}</strong>
                  }
                }
              }}
            >
              {post.content}
            </Markdown>
          </div>

          {/* Category Footer */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex flex-wrap gap-2">
              {post.category && (
                <span className="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-sm">
                  {post.category.Name}
                </span>
              )}
            </div>
          </div>
        </article>
        
        {/* Comments section temporarily disabled
        <Comments postId={post.id} />
        */}
      </div>
    );
  } catch (error) {
    console.error('Error loading post:', error);
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-red-600">Error loading post</h1>
        <p className="mt-4 text-gray-600">Please try again later</p>
        <Link href="/" className="text-primary hover:underline mt-4 inline-block">
          ← Back to Home
        </Link>
      </div>
    );
  }
} 