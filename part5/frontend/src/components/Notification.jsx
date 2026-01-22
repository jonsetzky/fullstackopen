import React from "react";

export const Notification = ({ message, isError }) => {
  if (!message) return <></>;
  return (
    <div
      style={{
        color: isError ? "red" : "green",
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      {message}
    </div>
  );
};

export default Notification;
