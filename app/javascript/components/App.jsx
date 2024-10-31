import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ListPosts from "./posts/ListPosts.jsx";
import CreatePost from "./posts/CreatePost.jsx";
import Navbar from "./common/Navbar.jsx";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<ListPosts />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
