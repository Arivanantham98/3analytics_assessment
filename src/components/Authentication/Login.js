import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/user";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (user) {
      navigate("/posts");
    }
  }, [navigate, user]);

  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSumbit = () => {
    dispatch(login(loginDetails)).then(() => {
      navigate("/admin");
    });
  };
  return (
    <section className="hero is-info is-fullheight-with-navbar">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-one-third">
              <form autocomplete="off" className="box">
                <h3 className="title is-3 my-4" style={{ color: "#000" }}>
                  Login
                </h3>
                <div className="field">
                  <label className="label">Username</label>
                  <div className="control">
                    <input
                      onChange={handleChange}
                      type="text"
                      name="username"
                      placeholder="e.g. admin"
                      readonly
                      onfocus="this.removeAttribute('readonly');"
                      className="input"
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      onChange={handleChange}
                      name="password"
                      type="password"
                      placeholder="*******"
                      readonly
                      onfocus="this.removeAttribute('readonly');"
                      className="input"
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <button onClick={handleSumbit} className="button is-success">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
