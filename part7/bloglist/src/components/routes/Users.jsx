import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Users = () => {
  const users = useSelector((state) => state.users);

  return (
    <div className="p-7">
      <table>
        <thead>
          <tr>
            <th className="w-32 text-left">username</th>
            <th className="w-32 text-left">blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
