import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { likeBlog } from "../../reducers/bloglistReducer";

export const BlogDetails = () => {
  const dispatch = useDispatch();

  const id = useParams().id;
  const blog = useSelector((state) => state.bloglist[id]);

  if (!blog) return <div>loading...</div>;

  return (
    <div>
      <h1>{blog.title}</h1>
      <a href={blog.url} target="_blank" rel="noopener noreferrer">
        {blog.url}
      </a>
      <p>
        {blog.likes} likes
        <button
          onClick={async () => {
            dispatch(likeBlog(blog.id));
          }}
        >
          like
        </button>
      </p>
      <p>added by {blog?.user?.name || "n/a"}</p>
    </div>
  );
};
