import express from "express";
import { body, validationResult } from 'express-validator';
import bcryptjs from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import fetchuser from "../middleware/fetchuser.js";

const router = express.Router();

router.post("/register", [
  body("name", "Your name should be of atleast 3 characters").isLength({
    min: 3
  }),
  body("username", "Please enter a valid email").isEmail(),
  body("password", "Your password should have atleast 6 characters").isLength({
    min: 6
  })
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  const { name, username, password } = req.body;

  try {
    let user = await User.findOne({ username });

    if (user) {
      return res.status(409).json({
        msg: "Sorry, a user with this email already exists"
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    user = new User({
      name: name,
      username: username,
      password: hashedPassword
    });
    await user.save();

    const data = {
      id: user._id
    };

    const authtoken = jwt.sign(data, process.env.JWT_SECRET);

    res.json({
      authtoken,
      msg: "Account created successfully"
    });
  } catch (error) {
    console.log(error.msg);
    res.json({
      msg: error.message
    })
  }

});

router.post("/login", [
  body("username", "Please enter a valid email").isEmail(),
  body("password", "Password cannot be blank").isLength({ min: 1 })
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      username: username
    });

    if (!user) {
      return res.status(400).json({
        msg: "Please enter your correct credentials"
      });
    }

    const result = await bcryptjs.compare(password, user.password);

    if (result) {
      const data = {
        id: user._id
      };

      const authtoken = jwt.sign(data, process.env.JWT_SECRET);

      res.json({
        authtoken,
        msg: "Logged in successfully"
      });
    }
    else {
      console.log("Here");
      res.status(400).json({
        msg: "Please enter your correct credentials"
      })
    }
  } catch (error) {
    res.status(500).json({
      msg: error.message
    })
  }
});

router.post("/get-user", fetchuser, async (req, res) => {
  const id = req.user.id;
  try {
    const user = await User.findById(id).select("-password");

    res.json(user);
  } catch (error) {
    console.log(error.message);
  }
});

export default router;