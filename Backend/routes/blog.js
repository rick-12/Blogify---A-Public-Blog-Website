import express from "express";
import Blog from "../models/Blog.js";
import fetchuser from "../middleware/fetchuser.js";
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.json(blogs);
  } catch (error) {
    res.status(500).json({
      msg: error.message
    });
  }
});

router.get("/blog/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        msg: "This page does not exist"
      })
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({
      msg: error.message
    });
  }
});

router.get("/my-blogs", fetchuser, async (req, res) => {
  try {
    const blogs = await Blog.find({
      author: req.user.id
    });

    res.json(blogs);
  } catch (error) {
    res.status(500).json({
      msg: error.message
    });
  }
});

router.post("/compose", fetchuser, [
  body("title", "Title cannot be empty").exists(),
  body("content", "Your blog should be atleast of 10 characters").isLength({
    min: 5
  })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const { title, content } = req.body;

    console.log(req.user.name);
    const blog = new Blog({
      title, content, author: req.user.id
    });
    const savedBlog = await blog.save();
    res.status(201).json({
      msg: "Your blog has been published successfully",
      blog: savedBlog
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message
    });
  }
});

router.patch("/update-blog", fetchuser, [
  body("title", "Title cannot be empty").exists(),
  body("content", "Your blog should be of atleast 5 characters").isLength({
    min: 5
  })
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors)
  }

  try {
    const { id, title, content } = req.body;

    const blog = await Blog.findById(id);

    if (!blog) {
      res.status(404).json({
        msg: "This blog doesn't exist"
      });
    }
    else if (blog.author.toString() === req.user.id) {
      blog.title = title;
      blog.content = content;
      const updatedBlog = await blog.save();
      res.status(201).json({
        updatedBlog,
        msg: "Blog updated successfully"
      });
    }
    else {
      res.status(401).json({
        msg: "Please login to update the blog"
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: error.message
    });
  }
});

router.post("/delete-blog", fetchuser, async (req, res) => {
  try {
    const blog = await Blog.findById(req.body.id);
    if (req.user.id === blog.author.toString()) {
      const deletedBlog = await Blog.findByIdAndDelete(req.body.id);
  
      res.json({
        msg: "Blog has been deleted successfully",
        blog: deletedBlog
      });
    }
    else {
      res.status(401).json({
        msg: "Please login to delete the blog"
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: error.message
    });
  }
})

export default router;