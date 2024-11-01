import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./styles/PostItem.css";

const PostItem = ({ post, isAuthenticated, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleDelete = () => {
    onDelete(post.id);
    setShowModal(false);
  };

  const handleEdit = () => {
    navigate(`/edit/${post.id}`);
  };

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
      {isAuthenticated && !post.url && (
        <>
          <button onClick={handleEdit} className="btn btn-primary">
            Edit
          </button>
          <button onClick={() => setShowModal(true)} className="btn btn-danger">
            Delete
          </button>
          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <h3>Confirm Delete</h3>
                <p>Are you sure you want to delete this post?</p>
                <button onClick={handleDelete} className="btn btn-danger">
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    content: PropTypes.string,
    image: PropTypes.string,
    url: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PostItem;
