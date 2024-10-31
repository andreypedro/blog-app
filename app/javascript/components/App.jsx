import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ListPosts from "./ListPosts.jsx";
import CreatePost from "./CreatePost.jsx";

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/create">Create Post</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<ListPosts />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
