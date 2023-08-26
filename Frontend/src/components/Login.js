import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BlogContext from '../Context/BlogContext';
import ThemeContext from '../Context/ThemeContext';

const Login = () => {
  const navigate = useNavigate();
  const blogContext = useContext(BlogContext);
  const { showAlert } = blogContext;
  const themeContext = useContext(ThemeContext);
  const { mode } = themeContext;

  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        header: {
          "Content-Type": "application/json"
        },
        proxy: {
          host: "10.32.0.1",
          port: "8080"
        }
      }
      const response = await axios.post("http://localhost:5000/api/v1/auth/login", user, config);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.authtoken);
        localStorage.setItem("isAuthenticated", true);
        showAlert("success", "Success", response.data.msg);
        navigate(-1);
      }
    } catch (error) {
      const status = error.response.status;
      const errors = error.response.data.errors;
      if (status === 400) {
        if (errors) {
          showAlert("danger", "Error", errors[0].msg);
        }
        else {
          showAlert("danger", "Error", error.response.data.msg);
        }
      }
      else {
        navigate("/error", {
          state: { code: error.response.status }
        });
      }
    }
  }

  return (
    <main className="form-signin w-100 m-auto mt-3">
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <div className="form-floating">
          <input type="email" className="form-control" id="username" placeholder="name@example.com" name="username" autoComplete="off" onChange={onChange} style={mode === "dark" ? {backgroundColor: "#55486b", color: "white"} : null} required/>
          <label htmlFor="username">Email address</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control" id="password" placeholder="Password" name="password" onChange={onChange} style={mode === "dark" ? {backgroundColor: "#55486b", color: "white"} : null}/>
          <label htmlFor="password" minLength={6} required>Password</label>
        </div>
        <button className="btn btn-primary w-100 py-2 mt-3" type="submit">Sign in</button>
      </form>
      <p className="mt-3">Don't have an account? <Link to="/register">Sign up</Link></p>
    </main>
  )
}

export default Login
