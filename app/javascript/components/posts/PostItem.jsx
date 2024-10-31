import React from "react";
import "./styles/PostItem.css"; // Importar estilos específicos do componente

const PostItem = ({ post }) => {
  return (
    <div className="post-item">
      <h2 className="post-title">{post.title || post.name}</h2>
      {post.image && (
        <img src={post.image} alt={post.title} className="post-image" />
      )}
      <p className="post-content">{post.content || post.description}</p>
      {post.url && (
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="post-link"
        >
          Read more
        </a>
      )}
    </div>
  );
};

export default PostItem;
