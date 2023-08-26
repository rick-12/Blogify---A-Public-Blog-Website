import { useState } from "react"
import BlogContext from "./BlogContext"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BlogState = ({ children }) => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [alert, setAlert] = useState(null);

  const showAlert = (type, heading, msg) => {
    setAlert({ type, heading, msg });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }

  const addBlog = async (blog) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      },
      proxy: {
        host: "10.32.0.1",
        port: "8080"
      }
    }

    try {
      const response = await axios.post("http://localhost:5000/api/v1/blogs/compose", blog, config);
      const savedBlog = response.data.savedBlog;
      if (savedBlog) {
        setBlogs(blogs.concat(savedBlog));
      }
      showAlert("success", "Success", response.data.msg);
      navigate(-1);
    } catch (error) {
      const status = error.response.status;
      if (status === 400) {
        showAlert("danger", "Error", error.response.data.errors[0].msg);
      }
      else {
        navigate("/error", {
          state: { code: error.response.status }
        });
      }
    }
  }

  const fetchBlogs = async () => {
    const config = {
      proxy: {
        host: "10.32.0.1",
        port: "8080"
      }
    };
    try {
      const response = await axios.get("http://localhost:5000/api/v1/blogs/", config);
      setBlogs(response.data);
    } catch (error) {
      navigate("/error", {
        state: { code: error.response.status }
      });
    }
  }

  const fetchMyBlogs = async () => {
    const config = {
      headers: {
        "Authorization": localStorage.getItem("token")
      },
      proxy: {
        host: "10.32.0.1",
        port: "8080"
      }
    };
    try {
      const response = await axios.get("http://localhost:5000/api/v1/blogs/my-blogs", config);
      setBlogs(response.data);
    } catch (error) {
      navigate("/error", {
        state: { code: error.response.status }
      });
    }
  }

  const editBlog = async (id, title, content) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        },
        proxy: {
          host: "10.32.0.1",
          port: "8080"
        }
      }
      // console.log(id);
      const response = await axios.patch("http://localhost:5000/api/v1/blogs/update-blog", { id, title, content }, config);
      setBlogs(blogs.concat(response.data.updatedBlog));
      showAlert("success", "Success", response.data.msg);
      navigate(-1);
    } catch (error) {
      navigate("/error", {
        state: { code: error.response.status }
      })
    }
  }

  const deleteBlog = async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        },
        proxy: {
          host: "10.32.0.1",
          port: "8080"
        }
      }
      const response = await axios.post("http://localhost:5000/api/v1/blogs/delete-blog", { id }, config);
      const newBlogs = blogs.filter((blog) => {
        return blog._id !== id
      })
      setBlogs(newBlogs);
      showAlert("success", "Success", response.data.msg)
    } catch (error) {
      navigate("/error", {
        state: { code: error.response.status }
      });
    }
  }

  return (
    <BlogContext.Provider value={{ blogs, setBlogs, addBlog, fetchBlogs, fetchMyBlogs, editBlog, deleteBlog, alert, showAlert }}>
      {children}
    </BlogContext.Provider>
  )
}

export default BlogState;