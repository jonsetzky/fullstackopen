import { useState } from "react";

import TextInput from "./TextInput";

import blogService from "../services/blogs";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";

const CreateBlog = ({ onAddBlog, user }) => {
  const dispatch = useDispatch();

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

    setTitle("");
    setAuthor("");
    setUrl("");
    onAddBlog({ ...newBlog, user });

    dispatch(
      setNotification(
        `a new blog "${newBlog.title}" by ${newBlog.author} added successfully`,
      ),
    );
  };
  return (
    <div>
      <h1>create new blog</h1>
      <form onSubmit={handleBlogCreate}>
        <TextInput
          id="blog-title"
          label="title"
          value={title}
          setValue={setTitle}
        />
        <TextInput
          id="blog-author"
          label="author"
          value={author}
          setValue={setAuthor}
        />
        <TextInput id="blog-url" label="url" value={url} setValue={setUrl} />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default CreateBlog;
