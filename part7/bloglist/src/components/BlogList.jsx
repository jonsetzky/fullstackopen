import React from "react";
import { useSelector } from "react-redux";
import Blog from "./Blog";

export const BlogList = () => {
  /**
   * @type {import("../reducers/bloglistReducer").BloglistState}
   */
  let bloglist = useSelector((state) => state.bloglist);
  return (
    <>
      {Object.values(bloglist)
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </>
  );
};
