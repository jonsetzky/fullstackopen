import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/localUserReducer";
import { Link, useLocation } from "react-router-dom";

const LinkWrapper = (props) => {
  const path = useLocation();
  return (
    <Link
      to={props.to}
      className={
        (props.className || "") +
        " select-none " +
        (path.pathname === props.to ? "underline" : "")
      }
    >
      {props.children}
    </Link>
  );
};

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
      <LinkWrapper to="/">blogs</LinkWrapper>
      <LinkWrapper to="/users">users</LinkWrapper>
      <div style={{ flex: 1 }} />
      <div className="flex gap-2 select-none">
        Logged in as {localUser.name || localUser.username}
        <button
          className="border rounded-sm bg-red-800 text-white border-red-800 hover:text-black hover:bg-red-700 hover:border-red-700"
          onClick={(e) => {
            e.preventDefault();
            dispatch(logout());
          }}
        >
          logout
        </button>
      </div>
    </div>
  );
};
