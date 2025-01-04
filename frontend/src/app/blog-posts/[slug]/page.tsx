import { fetchPostBySlug } from '@/lib/api';
import PostImage from '@/components/PostImage';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { data: posts } = await fetchPostBySlug(params.slug);
  const post = posts[0];

  if (!post) {
    return {
      title: 'Post Not Found'
    };
  }

  return {
    title: post.attributes.metaTitle || post.attributes.title,
    description: post.attributes.metaDescription,
    keywords: post.attributes.metaKeywords,
    alternates: {
      canonical: post.attributes.canonicalURL
    }
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { data: posts } = await fetchPostBySlug(params.slug);
  const post = posts[0];

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <Link href="/" className="text-blue-600 mb-8 inline-block hover:underline">
        ← Back to Home
      </Link>
      
      <h1 className="text-4xl font-bold mb-4">{post.attributes.title}</h1>
      
      <div className="flex items-center text-gray-600 mb-8">
        <time>
          {formatDate(post.attributes.PublishedDate)}
        </time>
        {post.attributes.category && (
          <>
            <span className="mx-2">•</span>
            <Link 
              href={`/categories/${post.attributes.category.slug}`}
              className="text-blue-600 hover:underline"
            >
              {post.attributes.category.Name}
            </Link>
          </>
        )}
      </div>

      {post.attributes.addMedia?.[0] && (
        <div className="mb-8">
          <PostImage
            imageData={post.attributes.addMedia[0]}
            title={post.attributes.title}
            className="aspect-[2/1] rounded-lg overflow-hidden"
          />
        </div>
      )}

      <div className="prose max-w-none">
        {post.attributes.content}
      </div>

      {post.attributes.User && (
        <div className="mt-12 pt-8 border-t">
          <h2 className="text-lg font-semibold mb-2">About the Author</h2>
          <div className="flex items-center gap-4">
            <div>
              <p className="font-medium">{post.attributes.User.Name}</p>
              {post.attributes.User.bio && (
                <p className="text-gray-600">{post.attributes.User.bio}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </article>
  );
} 