import React from "react";
import "./styles/PostItem.css";

const PostItem = ({ post }) => {
  return (
    <li className="post-item">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-content">{post.content}</p>
    </li>
  );
};

export default PostItem;
