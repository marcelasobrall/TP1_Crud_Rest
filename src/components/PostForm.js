import React, { useState } from 'react';
import axios from 'axios';
import './PostForm.css';

const PostForm = ({ onPostCreated }) => {
  const [formData, setFormData] = useState({ title: '', body: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Please enter a title';
      isValid = false;
    }

    if (!formData.body.trim()) {
      newErrors.body = 'Please enter a body';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const createPost = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', formData);
      onPostCreated(response.data);
      setFormData({ title: '', body: '' });
      setErrors({});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h2>Create a Post</h2>
      <form onSubmit={createPost}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className={`input-field ${errors.title ? 'input-error' : ''}`}
        />
        {errors.title && <p className="error">{errors.title}</p>}
        <textarea
          name="body"
          placeholder="Body"
          value={formData.body}
          onChange={handleChange}
          className={`textarea-field ${errors.body ? 'textarea-error' : ''}`}
        ></textarea>
        {errors.body && <p className="error">{errors.body}</p>}
        <button type="submit" className="submit-button">Create</button>
      </form>
    </div>
  );
};

export default PostForm;
