import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ViewBlog = () => {
  const { param } = useParams();
  const index = param.lastIndexOf('-');
  const id = param.substring(index + 1);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBlog() {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/blogs/blog/${id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        navigate("/error", {
          state: { code: error.response.status }
        });
      }
    }
    fetchBlog();
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  )
}

export default ViewBlog
