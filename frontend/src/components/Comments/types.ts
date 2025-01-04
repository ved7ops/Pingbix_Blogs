export interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  email?: string;
  createdAt: string;
  parentId: number | null;
  replies?: Comment[];
}

export interface CommentFormData {
  content: string;
  parentId?: number | null;
} 