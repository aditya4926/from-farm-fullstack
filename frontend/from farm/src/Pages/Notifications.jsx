import { useEffect, useState } from "react";
import api from "../api/axios";

function Notifications() {
  const [notifications, setNotifications] =
    useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const token =
      localStorage.getItem("token");

    const { data } = await api.get(
      "/notifications",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setNotifications(data);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Notifications 🔔
      </h1>

      {notifications.map((item) => (
        <div
          key={item._id}
          className="border p-4 rounded mb-3"
        >
          {item.message}
        </div>
      ))}
    </div>
  );
}

export default Notifications;
