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

    checkContentHeight();

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

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Posts</h1>
      <div className="post-list">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
      {loading && <div className="loading">Loading...</div>}
      {!hasMore && (
        <div className="no-more-posts">
          <span role="img" aria-label="party-popper">
            🎉
          </span>{" "}
          You've reached the end! No more posts.
        </div>
      )}
    </div>
  );
};

export default ListPosts;
