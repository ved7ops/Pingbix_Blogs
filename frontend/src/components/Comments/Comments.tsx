'use client';
import React, { useState, useEffect } from 'react';
import { CommentForm } from './';
import { CommentThread } from './';
import { Comment, CommentFormData } from './types';

interface CommentsProps {
  postId: string;
}

const Comments = ({ postId }: CommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
      
      // Updated to match your schema
      const response = await fetch(`${baseUrl}/api/comments?populate=*&filters[blog_post][id]=${postId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Fetching comments for post:', postId);
      console.log('API URL:', `${baseUrl}/api/comments?populate=*&filters[blog_post][id]=${postId}`);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error('Failed to fetch comments');
      }

      const result = await response.json();
      console.log('Comments API Response:', result);

      const transformedComments = result.data?.map((item: any) => ({
        id: item.id,
        content: item.attributes.content,
        createdAt: item.attributes.createdat,
        parentId: item.attributes.parentId,
        author: {
          id: item.attributes.googleId || '0',
          name: item.attributes.displayName || 'Anonymous',
          avatar: item.attributes.avatar
        },
        email: item.attributes.email,
        replies: [] // We'll handle nested comments later
      })) || [];

      setComments(transformedComments);
    } catch (error) {
      console.error('Error details:', error);
      setError('Failed to load comments. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommentSubmit = async (data: CommentFormData) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
      const response = await fetch(`${baseUrl}/api/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            content: data.content,
            blog_post: postId,
            parentId: data.parentId || null,
            displayName: 'Anonymous', // You might want to get this from user session
            email: '', // You might want to get this from user session
            googleId: '', // You might want to get this from user session
          }
        }),
      });
      
      if (!response.ok) throw new Error('Failed to post comment');
      
      await fetchComments();
    } catch (error) {
      console.error('Error posting comment:', error);
      throw error;
    }
  };

  if (error) {
    return <div className="py-8 text-center text-red-600">{error}</div>;
  }

  if (isLoading) {
    return <div className="py-8 text-center">Loading comments...</div>;
  }

  return (
    <div className="comments-section max-w-4xl mx-auto px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {comments.length > 0 
            ? `Comments (${comments.length})` 
            : 'Drop a comment'}
        </h2>
      </div>
      
      {/* Main Comment Form */}
      <CommentForm 
        onSubmit={async (data: { content: string; parentId?: string | null }) => {
          await handleCommentSubmit({
            content: data.content,
            parentId: data.parentId ? Number(data.parentId) : null
          });
        }}
        className="mb-8"
      />

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-center text-gray-500 py-4">
            Be the first to share your thoughts!
          </p>
        ) : (
          comments.map(comment => (
            <CommentThread 
              key={comment.id}
              comment={comment}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Comments; 