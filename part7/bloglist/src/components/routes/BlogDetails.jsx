import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
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
      <div className="flex">
        <div className="flex flex-col gap-2 flex-1 pt-7 pl-7">
          <h1>
            {blog.title}
            <span className="text-sm pl-1">by {blog.author}</span>
          </h1>
          <a href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.url}
          </a>
          <p className="flex items-center justify-start text-center gap-2">
            {blog.likes} likes
            <button
              onClick={async () => {
                await dispatch(likeBlog(blog.id));
              }}
            >
              like
            </button>
          </p>
          <p>
            added by{" "}
            {blog?.user !== undefined ? (
              <Link to={`/users/${blog?.user?.id}`}>{blog?.user?.name}</Link>
            ) : (
              "n/a"
            )}
          </p>
        </div>
        <div className="flex-1 pt-7">
          <h3>comments</h3>
          <div>
            <input {...commentField} placeholder="New comment" />
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
      </div>
    </div>
  );
};
