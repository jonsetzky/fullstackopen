import React from "react";
import { useSelector } from "react-redux";

export const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification === null) return <></>;
  return (
    <div
      className="absolute top-32 p-2.5 rounded-md border-solid text-xl bg-gray-200"
      style={{
        color: notification.isError ? "red" : "green",
      }}
    >
      {notification.message}
    </div>
  );
};

export default Notification;
