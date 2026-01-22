import { useState } from "react";

import TextInput from "./TextInput";

import blogService from "../services/blogs";

const CreateBlog = ({ onAddBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleBlogCreate = async (event) => {
    event.preventDefault();
    const newBlog = await blogService.create({
      title,
      author,
      url,
    });
    onAddBlog(newBlog);
  };
  return (
    <div>
      <h1>create new blog</h1>
      <form onSubmit={handleBlogCreate}>
        <TextInput label="title" value={title} setValue={setTitle} />
        <TextInput label="author" value={author} setValue={setAuthor} />
        <TextInput label="url" value={url} setValue={setUrl} />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default CreateBlog;
