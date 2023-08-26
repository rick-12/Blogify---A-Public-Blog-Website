import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BlogContext from "../Context/BlogContext.js"
import ThemeContext from '../Context/ThemeContext.js'

const Register = () => {
  const navigate = useNavigate();
  const blogContext = useContext(BlogContext);
  const { showAlert } = blogContext;
  const themeContext = useContext(ThemeContext);
  const { mode } = themeContext;

  const config = {
    header: {
      "Content-Type": "application/json"
    },
    proxy: {
      host: "10.32.0.1",
      port: "8080"
    }
  }

  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: ""
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
      if (user.password !== user.confirmPassword) {
        showAlert("danger", "Error", "Passwords do not match");
      }
      else {
        const response = await axios.post("http://localhost:5000/api/v1/auth/register",
        {
          name: user.name,
          username: user.username,
          password: user.password
        },
        config);
        localStorage.setItem("token", response.data.authtoken);
        localStorage.setItem("isAuthenticated", true);
        showAlert("success", "Success", response.data.msg);
        navigate(-1);
      }
    } catch (error) {
      const status = error.response.status;
      if (status === 400) {
        showAlert("danger", "Error", error.response.data.errors[0].msg);
      }
      else if (status === 409) {
        showAlert("danger", "Error", error.response.data.msg);
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
        <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

        <div className="form-floating">
          <input type="text" className="form-control" id="floatingName" placeholder="Your name" name="name" autoComplete="off" onChange={onChange} minLength={6} required style={mode === "dark" ? {backgroundColor: "#55486b", color: "white"} : null}/>
          <label htmlFor="floatingName">Your name</label>
        </div>
        <div className="form-floating">
          <input type="email" className="form-control" id="floatingEmail" placeholder="name@example.com" name="username" autoComplete="off" onChange={onChange} minLength={6} required style={mode === "dark" ? {backgroundColor: "#55486b", color: "white"} : null}/>
          <label htmlFor="floatingEmail">Email address</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name="password" onChange={onChange} minLength={6} required style={mode === "dark" ? {backgroundColor: "#55486b", color: "white"} : null}/>
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control" id="floatingConfirmPassword" placeholder="Confirm Password" name="confirmPassword" onChange={onChange} minLength={6} required style={mode === "dark" ? {backgroundColor: "#55486b", color: "white"} : null}/>
          <label htmlFor="floatingConfirmPassword">Confirm Password</label>
        </div>
        <button className="btn btn-primary w-100 py-2 mt-3" type="submit">Sign up</button>
      </form>
      <p className="mt-3">Already have an account? <Link to="/login">Sign in</Link></p>
    </main>
  )
}

export default Register
