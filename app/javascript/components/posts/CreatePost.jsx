import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Obter o token CSRF do meta tag
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute("content");

    axios
      .post(
        "/posts",
        { post: { title, content } },
        {
          headers: {
            "X-CSRF-Token": csrfToken,
          },
        }
      )
      .then((response) => {
        console.log("Post created:", response.data);
        navigate("/");
      })
      .catch((error) => {
        console.error("There was an error creating the post!", error);
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
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePost;
