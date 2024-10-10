import React from 'react';

interface Comment {
  id: string;
  content: string;
  status: string; // Add status to the Comment interface
}

interface Comments {
  comments: Comment[]; 
}

function CommentList({ comments }: Comments) {
  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => {
          let content;

          if (comment.status === 'approved') {
            content = comment.content;
          } else if (comment.status === 'pending') {
            content = 'This comment is awaiting moderation';
          } else if (comment.status === 'rejected') {
            content = 'This comment has been rejected';
          }

          return <li key={comment.id}>{content}</li>;
        })}
      </ul>
    </div>
  );
}

export default CommentList;
