import React from 'react'
import Blog from './Blog';

const Blogs = ({ blogs }) => {

  return (
    <>
      {
        blogs.map((blog) => {
          return (
            blog && <div key={blog._id}>
              <Blog id={blog._id} title={blog.title} content={blog.content} />
            </div>
          )
        })
      }
    </>
  )
}

export default Blogs
