import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { commentBlog, likeBlog } from "../../reducers/bloglistReducer";
import { useField } from "../../hooks";

export const BlogDetails = () => {
  const dispatch = useDispatch();

  const id = useParams().id;
  const blog = useSelector((state) => state.bloglist[id]);

  const { reset: resetCommentField, ...commentField } = useField("text");

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
            await dispatch(likeBlog(blog.id));
          }}
        >
          like
        </button>
      </p>
      <p>added by {blog?.user?.name || "n/a"}</p>
      <h3>comments</h3>
      <div>
        <input {...commentField} />
        <button
          onClick={async () => {
            await dispatch(commentBlog(blog.id, commentField.value));
            resetCommentField();
          }}
        >
          add comment
        </button>
      </div>
      <ul>
        {blog.comments.map((comment, i) => (
          <li key={i}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};
