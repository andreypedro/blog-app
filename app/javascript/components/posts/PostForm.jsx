import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./styles/PostForm.css";

const PostForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then((response) => {
          setTitle(response.data.title || "");
          setContent(response.data.content || "");
        })
        .catch((error) => {
          console.error("There was an error fetching the post!", error);
        });
    } else {
      setTitle("");
      setContent("");
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute("content");

    const postData = { title, content };

    if (id) {
      axios
        .put(`/posts/${id}`, postData, {
          headers: {
            "X-CSRF-Token": csrfToken,
          },
        })
        .then((response) => {
          console.log("Post updated:", response.data);
          navigate("/");
        })
        .catch((error) => {
          console.error("There was an error updating the post!", error);
        });
    } else {
      axios
        .post(
          "/posts",
          { post: postData },
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
    }
  };

  return (
    <div>
      <h1>{id ? "Edit Post" : "Create a new post"}</h1>
      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? "Save Changes" : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
