import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const EditPost = ({ postId }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    axios
      .get(`/posts/${postId}.json`)
      .then((response) => {
        setTitle(response.data.title);
        setContent(response.data.content);
      })
      .catch((error) => {
        console.error("There was an error fetching the post!", error);
      });
  }, [postId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`/posts/${postId}`, { post: { title, content } })
      .then((response) => {
        console.log("Post updated:", response.data);
      })
      .catch((error) => {
        console.error("There was an error updating the post!", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <button type="submit">Update Post</button>
    </form>
  );
};

EditPost.propTypes = {
  postId: PropTypes.number.isRequired,
};

export default EditPost;
