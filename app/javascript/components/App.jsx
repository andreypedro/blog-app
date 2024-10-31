import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListPosts from "./posts/ListPosts.jsx";
import Navbar from "./common/Navbar.jsx";
import PostForm from "./posts/PostForm.jsx";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<ListPosts />} />
          <Route path="/create" element={<PostForm />} />
          <Route path="/edit/:id" element={<PostForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
