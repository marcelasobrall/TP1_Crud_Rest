import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './components/Post';
import PostForm from './components/PostForm';
import './App.css';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      const totalPosts = response.data.length;
      setTotalPages(Math.ceil(totalPosts / 3));
      const startIndex = (currentPage - 1) * 3;
      const endIndex = startIndex + 3;
      setPosts(response.data.slice(startIndex, endIndex));
    } catch (error) {
      console.error(error);
    }
  };

  const createPost = (post) => {
    setPosts([...posts, post]);
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      const updatedPosts = posts.filter((post) => post.id !== id);
      setPosts(updatedPosts);
    } catch (error) {
      console.error(error);
    }
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <Post key={post.id} post={post} onDelete={deletePost} />
        ))}
      </ul>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button key={page} onClick={() => goToPage(page)}>
            {page}
          </button>
        ))}
      </div>
      <PostForm onPostCreated={createPost} />
    </div>
  );
};

export default App;
