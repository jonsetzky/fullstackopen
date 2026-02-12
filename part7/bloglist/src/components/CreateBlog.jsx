import { useState } from "react";

import TextInput from "./TextInput";

import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/bloglistReducer";

const CreateBlog = () => {
  const dispatch = useDispatch();

  let [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleBlogCreate = async (event) => {
    event.preventDefault();
    await dispatch(
      createBlog({
        author,
        likes: 0,
        title,
        url,
      }),
    );
    await dispatch(
      setNotification(`a new blog "${title}" by ${author} added successfully`),
    );
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      {!show ? (
        <></>
      ) : (
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
            <TextInput
              id="blog-url"
              label="url"
              value={url}
              setValue={setUrl}
            />
            <button type="submit">create</button>
          </form>
        </div>
      )}
      <button onClick={() => setShow(!show)}>
        {show ? "cancel" : "create new blog"}
      </button>
    </div>
  );
};

export default CreateBlog;
