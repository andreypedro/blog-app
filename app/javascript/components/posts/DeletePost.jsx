import React from "react";
import axios from "axios";

const DeletePost = ({ postId }) => {
  const handleDelete = () => {
    axios
      .delete(`/posts/${postId}`)
      .then((response) => {
        console.log("Post deleted");
      })
      .catch((error) => {
        console.error("There was an error deleting the post!", error);
      });
  };

  return <button onClick={handleDelete}>Delete Post</button>;
};

export default DeletePost;
