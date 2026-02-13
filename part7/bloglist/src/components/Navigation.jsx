import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/localUserReducer";
import { Link } from "react-router-dom";

export const Navigation = () => {
  const dispatch = useDispatch();

  const localUser = useSelector((state) => state.localUser);

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        backgroundColor: "#d3d3d3",
        padding: "6px",
      }}
    >
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
      <div style={{ flex: 1 }} />
      <span>
        {localUser.name || localUser.username} logged in
        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(logout());
          }}
        >
          logout
        </button>
      </span>
    </div>
  );
};
