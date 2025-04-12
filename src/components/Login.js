import React, { useState } from "react";
import Password from "./Password";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/helper";
import { toast } from "react-toastify";
import axiosapp from "../utils/axiosapp";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      toast.error("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      toast.error("Please enter the password");
      return;
    }

    setError("");

    try {
      const response = await axiosapp.post("/login", {
        email: email,
        password: password,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("authToken", response.data.accessToken);
        toast.success("Login Successful!");
        navigate("/");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        setError("Please try again");
        toast.error("Please try again");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="email" className="login-label">
            Email
          </label>
          <input
            type="text"
            id="email"
            placeholder="Enter your Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="err-msg">{error}</p>}

          <button type="submit" className="login-button">
            Login
          </button>

          <p className="login-para">
            Don't have an account?
            <Link to="/signup" className="signup-link"> Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
