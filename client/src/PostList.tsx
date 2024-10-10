import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

interface Comment {
  id: string;
  content: string;
}

interface Post {
  id: string;
  title: string;
  comments: Comment[];  // Adding comments property
}



function PostList() {
  const [post, setPost] = useState<Record<number, Post >>({});

  async function fetchPost(): Promise<void> {
    const res = await axios.get('http://localhost:4002/posts'); 
       
    setPost(res.data);
  }

  useEffect(() => {
    fetchPost();
  }, []);

  const renderPost = Object.values(post).map((value) => {
    return (
      <div 
        key={value.id} 
        style={{
          border: '1px solid #ddd',
          padding: '10px',
          marginBottom: '10px',
          borderRadius: '5px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#f9f9f9',
          transition: 'transform 0.2s',
        }}
       
      >
        <h1>{value.title}</h1>
        < CommentCreate postId={value.id} />
        < CommentList comments={value.comments} />
      </div>
    );
  });

  return <div style={{ maxWidth: '600px', margin: '20px auto' }}>{renderPost}</div>;
}

export default PostList;
