import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }
});

export default mongoose.model("Blog", blogSchema);