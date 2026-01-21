const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: String,
    author: String,
    url: String,
    likes: Number,
  },
  {
    collection: process.env.NODE_ENV === "test" ? "test_blogs" : "blogs",
  },
);

module.exports = mongoose.model("Blog", blogSchema);
