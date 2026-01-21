const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: String,
    author: String,
    url: String,
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: process.env.NODE_ENV === "test" ? "test_blogs" : "blogs",
  },
);

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
