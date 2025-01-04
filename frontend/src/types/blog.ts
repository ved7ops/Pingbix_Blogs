export interface MediaFormat {
  url: string;
}

export interface MediaFormats {
  thumbnail: MediaFormat;
  small: MediaFormat;
  medium: MediaFormat;
  large: MediaFormat;
}

export interface Media {
  data: {
    id: number;
    attributes: {
      url: string;
      formats: MediaFormats;
    };
  };
}

export interface BlogPost {
  id: number;
  attributes: {
    title: string;
    content: string;
    slug: string;
    publishedAt: string;
    addMedia: Media;
  };
}

export interface Category {
  id: number;
  attributes: {
    Name: string;
    slug: string;
    blog_posts: {
      data: BlogPost[];
    };
  };
} 