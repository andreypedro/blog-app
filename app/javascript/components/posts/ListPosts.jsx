import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

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

    checkContentHeight(); // Check initially

    window.addEventListener("resize", checkContentHeight);
    return () => window.removeEventListener("resize", checkContentHeight);
  }, [hasMore, loading]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loading
    ) {
      return;
    }
    setPage((prevPage) => prevPage + 1);
  }, [loading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
      {loading && <div>Loading...</div>}
      {!hasMore && <div>No more posts</div>}
    </div>
  );
};

export default ListPosts;
