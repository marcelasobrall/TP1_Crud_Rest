import React from 'react';
import './Post.css'; 

const Post = ({ post, onDelete }) => {
  const { id, title, body } = post;

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <li className="post">
      <h2 className="post-title">{title}</h2>
      <p className="post-body">{body}</p>
      <button className="post-delete" onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
};

export default Post;
