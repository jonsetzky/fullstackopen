import React from "react";
import { useSelector } from "react-redux";

export const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification === null) return <></>;
  return (
    <div
      style={{
        color: notification.isError ? "red" : "green",
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      {notification.message}
    </div>
  );
};

export default Notification;
