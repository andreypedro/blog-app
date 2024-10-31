import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

const DeletePost = ({ postId, onDelete }) => {
  const handleDelete = () => {
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute("content");

    axios
      .delete(`/posts/${postId}`, {
        headers: {
          "X-CSRF-Token": csrfToken,
        },
      })
      .then(() => {
        onDelete(postId);
      })
      .catch((error) => {
        console.error("There was an error deleting the post!", error);
      });
  };

  return (
    <button onClick={handleDelete} className="btn btn-danger">
      Delete
    </button>
  );
};

DeletePost.propTypes = {
  postId: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeletePost;
