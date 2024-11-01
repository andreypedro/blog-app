import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import PostItem from "./PostItem.jsx";
import "./styles/ListPosts.css";

const ListPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const currentUser = document
      .querySelector('meta[name="current-user"]')
      .getAttribute("content");
    setIsAuthenticated(currentUser === "true");
  }, []);

  const fetchPosts = useCallback(() => {
    setLoading(true);
    axios
      .get(`/posts.json?page=${page}`)
      .then((response) => {
        setPosts((prevPosts) => [...prevPosts, ...response.data]);
        setLoading(false);
        setHasMore(response.data.length > 0);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [page]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    const checkContentHeight = () => {
      if (
        document.documentElement.scrollHeight <= window.innerHeight &&
        hasMore &&
        !loading
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    checkContentHeight(); // Check initially

    window.addEventListener("resize", checkContentHeight);
    return () => window.removeEventListener("resize", checkContentHeight);
  }, [hasMore, loading]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1 &&
      hasMore &&
      !loading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleDelete = (id) => {
    axios
      .delete(`/posts/${id}`, {
        headers: {
          "X-CSRF-Token": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
        },
      })
      .then(() => {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the post!", error);
      });
  };

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Posts</h1>
      <div className="post-list">
        {posts.map((post, index) => (
          <PostItem
            key={post.id || `remote-${index}`}
            post={post}
            isAuthenticated={isAuthenticated}
            onDelete={handleDelete}
          />
        ))}
      </div>
      {loading && <div className="loading">Loading...</div>}
      {!hasMore && (
        <div className="no-more-posts">
          <span role="img" aria-label="party-popper">
            🎉
          </span>
          You&apos;ve reached the end! No more posts.
        </div>
      )}
    </div>
  );
};

export default ListPosts;
