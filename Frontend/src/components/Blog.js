import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import _ from "lodash";
import BlogContext from '../Context/BlogContext';
import ThemeContext from '../Context/ThemeContext';

const Blog = ({ id, title, content }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const blogContext = useContext(BlogContext);
  const { deleteBlog } = blogContext;
  const themeContext = useContext(ThemeContext);
  const { mode } = themeContext;

  const handleClick = () => {
    navigate("/edit-blog", {
      state: { id, title, content }
    });
  }

  return (
    <>
      <div className="modal fade" data-bs-theme={mode} id={id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Delete this blog</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this blog?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-danger" onClick={() => deleteBlog(id)} data-bs-dismiss="modal">Delete</button>
            </div>
          </div>
        </div>
      </div>
      <div className="blog my-5 px-4 pt-4" style={mode === "dark" ? { backgroundColor: "#290c5c" } : { backgroundColor: "white" }}>
        <div className="heading">
          <h2>{title}</h2>
          <div className='actions'>
            {location.pathname === "/my-blogs" ? <button type="button" className="btn btn-success edit-btn" id='edit-btn' onClick={handleClick}>Edit</button> : null}
            {location.pathname === "/my-blogs" ? <button type="button" className="btn btn-danger delete-btn" id='delete-btn' data-bs-toggle="modal" data-bs-target={`#${id}`}>Delete</button> : null}
          </div>
        </div>
        <p className="my-3">
          {content.slice(0, 300)}... <Link to={`/posts/${_.kebabCase(title)}-${id}`} >Read more</Link>
        </p>
      </div>
    </>
  )
}

export default Blog
