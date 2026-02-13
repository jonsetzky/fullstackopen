import React from "react";
import CreateBlog from "../CreateBlog";
import { BlogList } from "../BlogList";

export const Blogs = () => {
  return (
    <div>
      <div>
        <CreateBlog />
      </div>
      <div />
      <BlogList />
    </div>
  );
};
