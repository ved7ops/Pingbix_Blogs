import Image from 'next/image';
import { MediaData } from '@/lib/api';

interface PostImageProps {
  imageData: MediaData;
  title: string;
  className?: string;
}

export default function PostImage({ imageData, title, className = '' }: PostImageProps) {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  
  if (!imageData?.attributes?.url) return null;

  return (
    <div className={`relative ${className}`}>
      <Image
        src={`${baseUrl}${imageData.attributes.url}`}
        alt={title || 'Blog post image'}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
} 