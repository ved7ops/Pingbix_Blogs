import axios from 'axios';

export const API_URL = 'http://127.0.0.1:1337';

export interface MediaFormat {
  url: string;
  width?: number;
  height?: number;
  size?: number;
  mime?: string;
  name?: string;
}

export interface MediaData {
  id: number;
  attributes: {
    url: string;
    formats: {
      thumbnail: MediaFormat;
      small: MediaFormat;
      medium: MediaFormat;
      large: MediaFormat;
    };
  };
}

export interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  PublishedDate: string;
  slug: string;
  addMedia: Array<{
    id: number;
    name: string;
    formats: {
      thumbnail: { url: string };
      small: { url: string };
      medium: { url: string };
      large: { url: string };
    };
    url: string;
  }>;
  User?: {
    id: number;
    Name: string;
    bio: string;
  };
  category?: {
    id: number;
    Name: string;
    slug: string;
  };
  tags?: {
    id: number;
    name: string;
    slug: string;
  }[];
}

interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    }
  }
}

export const strapiApi = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
  }
});

export async function fetchPosts(): Promise<StrapiResponse<BlogPost>> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    if (!baseUrl) throw new Error('Strapi URL not configured');

    const response = await fetch(
      `${baseUrl}/api/blog-posts?populate[addMedia][populate]=*&populate[User][populate]=*&populate[category][populate]=*`, 
      {
        cache: 'no-store',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Map the response to match our interface
    const mappedData = {
      data: data.data.map((item: any) => ({
        id: item.id,
        title: item.title,
        content: item.content,
        PublishedDate: item.PublishedDate,
        slug: item.slug || item.postUrl,
        addMedia: item.addMedia,
        User: item.User,
        category: item.category
      })),
      meta: data.meta
    };

    console.log('Mapped Posts:', mappedData);
    return mappedData;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { data: [], meta: { pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 } } };
  }
}

export async function fetchPostBySlug(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    if (!baseUrl) throw new Error('Strapi URL not configured');

    const response = await fetch(
      `${baseUrl}/api/blog-posts?filters[slug][$eq]=${slug}&populate[addMedia][populate]=*&populate[User][populate]=*&populate[category][populate]=*`, 
      {
        cache: 'no-store',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      data: data.data.map((item: any) => ({
        id: item.id,
        title: item.title,
        content: item.content,
        PublishedDate: item.PublishedDate,
        slug: item.slug,
        addMedia: item.addMedia,
        User: item.User,
        category: item.category
      }))
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
}

export async function fetchPostsByCategory(categorySlug: string): Promise<StrapiResponse<BlogPost>> {
  try {
    const response = await strapiApi.get('/api/blog-posts', {
      params: {
        populate: ['addMedia', 'User', 'category'],
        'filters[category][slug][$eq]': categorySlug,
        'filters[PublishedDate][$notNull]': true,
        'sort': 'PublishedDate:desc',
      }
    });

    const mappedData = response.data.data.map((post: any) => ({
      id: post.id,
      attributes: {
        title: post.attributes.title,
        content: post.attributes.content,
        PublishedDate: post.attributes.PublishedDate,
        slug: post.attributes.slug,
        addMedia: post.attributes.addMedia?.map((media: any) => ({
          id: media.id,
          url: media.url,
          formats: media.formats
        })) || [],
        User: post.attributes.User,
        category: post.attributes.category
      }
    }));

    return {
      data: mappedData,
      meta: response.data.meta
    };
  } catch (error) {
    console.error('Error fetching category posts:', error);
    throw error;
  }
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  documentId: string;
  postCount: number;
}

export async function fetchCategories() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    if (!baseUrl) throw new Error('Strapi URL not configured');

    const response = await fetch(
      `${baseUrl}/api/categories?populate=*`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );

    const data = await response.json();

    return {
      data: data.data.map((item: any) => ({
        id: item.id,
        name: item.Name,
        slug: item.slug,
        documentId: item.documentId,
        postCount: 0
      }))
    };
  } catch (error) {
    console.error('Error:', error);
    return { data: [] };
  }
}

export async function fetchCategory(slug: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories?filters[slug][$eq]=${slug}`);
  return response.json();
} 