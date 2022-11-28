import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Authentication/Login";
import HomeLayout from "./components/HomeLayout";
import { ToastContainer } from "react-toastify";
import Posts from "./components/Posts/Posts";
import PostDetails from "./components/Posts/PostDetails";

function App() {
  return (
    <div className="is-fullheight">
      <HomeLayout />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/details/:id" element={<PostDetails/>}/>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
