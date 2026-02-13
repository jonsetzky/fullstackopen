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
    setTitle("");
    setAuthor("");
    setUrl("");
    setShow(false);
    await dispatch(
      setNotification(`a new blog "${title}" by ${author} added successfully`),
    );
  };

  return (
    <div>
      {!show ? (
        <button onClick={() => setShow(true)}>{"+ Add"}</button>
      ) : (
        <form onSubmit={handleBlogCreate}>
          <div className="flex flex-col gap-4">
            <h1 className="text-xl">Create a new blog</h1>
            <TextInput
              labelClassName="w-20"
              id="blog-title"
              label="title"
              placeholder="Sample Title"
              value={title}
              setValue={setTitle}
            />
            <TextInput
              labelClassName="w-20"
              id="blog-author"
              label="author"
              placeholder="Sample Author"
              value={author}
              setValue={setAuthor}
            />
            <TextInput
              labelClassName="w-20"
              id="blog-url"
              label="url"
              placeholder="http://example.com"
              value={url}
              setValue={setUrl}
            />
            <div className="flex w-full">
              <button type="submit">Create</button>
              <button onClick={() => setShow(false)}>Cancel</button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateBlog;
