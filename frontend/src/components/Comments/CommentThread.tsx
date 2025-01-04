'use client';
import React, { useState } from 'react';
import { Comment } from './types';
import CommentForm from './CommentForm';
import { formatDate } from '@/lib/utils';

interface CommentThreadProps {
  comment: Comment;
  depth?: number;
  maxDepth?: number;
}

const CommentThread = ({ comment, depth = 0, maxDepth = 3 }: CommentThreadProps) => {
  const [isReplying, setIsReplying] = useState(false);
  const [showReplies, setShowReplies] = useState(true);

  const handleReplySubmit = async (data: { content: string }) => {
    // TODO: Implement reply submission
    console.log('Reply submitted:', data);
  };

  return (
    <div className="comment-thread">
      {/* Main Comment */}
      <div className="flex items-start space-x-3 bg-white rounded-lg p-4 shadow-sm">
        {/* Author Avatar */}
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-sm font-medium text-blue-600">
              {comment.author.name[0].toUpperCase()}
            </span>
          </div>
        </div>

        {/* Comment Content */}
        <div className="flex-grow">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-900">{comment.author.name}</span>
            <span className="text-sm text-gray-500">
              {formatDate(comment.createdAt)}
            </span>
          </div>
          <p className="mt-1 text-gray-600">{comment.content}</p>
          
          {/* Action Buttons */}
          <div className="mt-2 flex items-center space-x-4">
            {depth < maxDepth && (
              <button 
                onClick={() => setIsReplying(!isReplying)}
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
              >
                <svg 
                  className="w-4 h-4 mr-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                  />
                </svg>
                Reply
              </button>
            )}
            
            {comment.replies && comment.replies.length > 0 && (
              <button 
                onClick={() => setShowReplies(!showReplies)}
                className="text-sm text-gray-500 hover:text-gray-600 flex items-center"
              >
                <svg 
                  className={`w-4 h-4 mr-1 transform transition-transform ${showReplies ? 'rotate-90' : ''}`} 
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
                {showReplies ? 'Hide' : 'Show'} Replies ({comment.replies.length})
              </button>
            )}
          </div>

          {/* Reply Form */}
          {isReplying && (
            <div className="mt-4">
              <CommentForm 
                parentId={comment.id}
                onSubmit={handleReplySubmit}
                onCancel={() => setIsReplying(false)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Nested Replies */}
      {showReplies && comment.replies && comment.replies.length > 0 && (
        <div className={`mt-2 pl-4 md:pl-8 border-l-2 border-gray-100 space-y-4`}>
          {comment.replies.map(reply => (
            <CommentThread 
              key={reply.id}
              comment={reply}
              depth={depth + 1}
              maxDepth={maxDepth}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentThread; 