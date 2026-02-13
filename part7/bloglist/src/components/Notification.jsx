import React from "react";
import { useSelector } from "react-redux";

export const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification === null) return <></>;
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 p-2.5 border-solid text-xl bg-gray-100 rounded-b-md"
      style={{
        color: notification.isError ? "red" : "green",
      }}
    >
      {notification.message}
    </div>
  );
};

export default Notification;
