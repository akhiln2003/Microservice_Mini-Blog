import axios from 'axios';
import React, { useState } from 'react';
import PostList from './PostList';

function App() {
  const [title, setTitle] = useState('');

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setTitle(event.target.value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    await axios.post('http://localhost:4000/posts', {
      title
    });

    setTitle("")
  }

  return (
    <div>
      <h1 >Create Post</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            value={title}
            onChange={handleChange}
          />
          <button type='submit'>Submit</button>
        </form>
      </div>

      <div>< PostList /></div>
    </div>
  );
}

export default App;
