import React, { useContext, useEffect } from 'react'
import Blogs from './Blogs';
import { Link } from 'react-router-dom';
import BlogContext from '../Context/BlogContext';
import ThemeContext from '../Context/ThemeContext';

const Home = () => {
  const blogContext = useContext(BlogContext);
  const { blogs, fetchBlogs } = blogContext;

  const themeContext = useContext(ThemeContext);
  const { mode } = themeContext;

  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line
  }, [])

  return (
    <div data-bs-theme={mode}>
      <h1>Home</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, delectus blanditiis! Omnis quidem corrupti harum suscipit incidunt nobis possimus sunt quas et natus iure, aliquam adipisci? Quas voluptates numquam sit velit sapiente cumque reiciendis! Eaque quidem culpa error sequi vel incidunt obcaecati eligendi numquam rem beatae eum dolores, assumenda molestiae eius, omnis distinctio ex enim minus voluptatum! Earum quos repellendus explicabo nesciunt. Adipisci, possimus animi velit accusantium optio laboriosam! Ut!</p>

      <div className="button-container">
        <Link to={`${localStorage.getItem("isAuthenticated") ? "/compose" : "/login"}`}><button type="button" className="btn btn-primary">Create a post</button></Link>
      </div>
      <Blogs blogs={blogs}/>
    </div>
  )
}

export default Home
