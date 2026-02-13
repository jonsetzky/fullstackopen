import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

export const UserDetails = () => {
  const id = useParams().id;
  const user = useSelector((state) => state.users.find((u) => u.id === id));

  if (!user) return <div>loading...</div>;

  return (
    <div className="p-7 flex flex-col">
      <h1>
        {user.name}
        <span className="text-sm select-none">'s blogs</span>
      </h1>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            - <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
