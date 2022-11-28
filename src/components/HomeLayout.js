import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/user";

function HomeLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      navigate("/");
    });
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
}, [navigate, user]);

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a href="/" className="navbar-item">
            Home
          </a>
          {user && (
            <a href="/posts" className="navbar-item">
              All Posts
            </a>
          )}
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {user ? (
                <button className="button is-link" onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <button className="button is-primary" onClick={() => navigate("/")}>
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default HomeLayout;
