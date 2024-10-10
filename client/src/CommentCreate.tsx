import axios from 'axios';
import React, { useState } from 'react';

interface CommentCreateProps {
  postId: string;
}

function CommentCreate({ postId }: CommentCreateProps) {
  const [content, setContent] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await axios.post(`http://localhost:4001/post/${postId}/comments`, {
      content,
    });
    setContent('');
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>New Comment</label>
        <input
          type="text"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CommentCreate;
