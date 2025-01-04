'use client';
import React, { useState } from 'react';

interface CommentFormProps {
  parentId?: string | null;
  onSubmit: (data: { content: string, parentId?: string | null }) => Promise<void>;
  onCancel?: () => void;
  className?: string;
}

const CommentForm = ({ parentId, onSubmit, onCancel, className }: CommentFormProps) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({ content, parentId });
      setContent('');
      onCancel?.();
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${className} max-w-3xl mx-auto`}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment..."
          className="w-full min-h-[80px] p-3 text-gray-700 bg-gray-50 rounded-lg 
            border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
            focus:bg-white transition-all duration-200 resize-none text-sm"
        />
        
        <div className="flex justify-end gap-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-800 
                transition-colors duration-200"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting || !content.trim()}
            className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 
              rounded-md hover:bg-blue-700 disabled:opacity-50 
              disabled:cursor-not-allowed transition-all duration-200
              flex items-center gap-1.5 shadow-sm"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Posting...</span>
              </>
            ) : (
              'Post Comment'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm; 