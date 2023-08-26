import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom';
import BlogContext from '../Context/BlogContext';
import ThemeContext from '../Context/ThemeContext';

const Compose = () => {
  const location = useLocation();
  const blogContext = useContext(BlogContext);
  const { addBlog, editBlog } = blogContext;
  const themeContext = useContext(ThemeContext);
  const { mode } = themeContext;

  const [blog, setBlog] = useState({
    title: `${location.pathname === "/edit-blog" ? location.state.title : ""}`,
    content: `${location.pathname === "/edit-blog" ? location.state.content : ""}`
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (location.pathname === "/compose") {
      addBlog(blog)
    }
    if (location.pathname === "/edit-blog") {
      editBlog(location.state.id, blog.title, blog.content)
    }
  }

  const onChange = (e) => {
    setBlog({
      ...blog,
      [e.target.name]: e.target.value
    })
  }
  
  return (
    <>
      <h1>Compose</h1>
      <form onSubmit={handleSubmit}>
        <div className="my-4">
          <label htmlFor="blog-title" className="form-label">Title</label>
          <input type="text" className="form-control" id="blog-title" name="title" value={blog.title} onChange={onChange} style={mode === "dark" ? {backgroundColor: "#55486b", color: "white"} : null} required minLength={5}/>
        </div>
        <div className="mb-3">
          <p id="compose-post">Post</p>
          <textarea name="content" value={blog.content} id="blog-content" rows="10" onChange={onChange} style={mode === "dark" ? {backgroundColor: "#55486b", color: "white"} : null} required minLength={10}></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Publish</button>
      </form>
    </>
  )
}

export default Compose
