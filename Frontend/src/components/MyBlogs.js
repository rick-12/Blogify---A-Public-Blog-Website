import React, { useContext, useEffect } from 'react'
import Blogs from "./Blogs";
import BlogContext from '../Context/BlogContext';

const MyBlogs = () => {
  const blogContext = useContext(BlogContext);
  const { blogs, fetchMyBlogs } = blogContext;

  useEffect(() => {
    fetchMyBlogs();
    // eslint-disable-next-line
  }, []);

  return (
    <div id='list'>
      {
        blogs.length ? <Blogs blogs={blogs}/> : <p id='message'>You have not published any blogs yet</p>
      }
    </div>
  )
}

export default MyBlogs
