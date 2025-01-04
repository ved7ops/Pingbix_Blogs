import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

interface CategoryCardProps {
  title: string;
  posts: BlogPost[];
}

export default function CategoryCard({ title, posts }: CategoryCardProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No posts found</p>
      </div>
    );
  }

  return (
    <div className="mb-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => {
          const postData = post.attributes || post;
          const slug = postData.slug;
          const title = postData.title;
          const content = postData.content;
          const publishedAt = postData.publishedAt;
          const media = postData.addMedia?.[0];

          return (
            <Link 
              key={post.id} 
              href={`/posts/${slug}`}
              className="group"
            >
              <article className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                {media && (
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${media.url}`}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span>{formatDate(publishedAt)}</span>
                    <span className="mx-2">•</span>
                    <span>3 min read</span>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {content}
                  </p>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </div>
  );
} 