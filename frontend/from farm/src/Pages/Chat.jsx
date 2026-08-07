import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import api from "../api/axios";

const socket = io("https://from-farm.onrender.com");

function Chat() {
  const { userId } = useParams();
  const loginUser = JSON.parse(localStorage.getItem("user"));

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.emit("join", loginUser._id);
    fetchMessages();

    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });
    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("onlineUsers");
    };
  }, [userId]);

  const fetchMessages = async () => {
    const token = localStorage.getItem("token");

    const { data } = await api.get(
      `/messages/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setMessages(data);
  };

  const sendMessage = async () => {
    if (!text.trim()) return;

    const token = localStorage.getItem("token");

    const { data } = await api.post(
      "/messages",
      {
        receiverId: userId,
        message: text,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    socket.emit("sendMessage", {
      ...data,
      receiverId: userId,
    });

    setMessages((prev) => [...prev, data]);
    setText("");
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Chat 💬
      </h1>
      <p
        className={
          onlineUsers.includes(userId)
            ? "text-green-600 font-bold"
            : "text-gray-500 font-bold"
        }
      >
        {onlineUsers.includes(userId)
          ? "🟢 Online"
          : "⚫ Offline"}
      </p>

      <div className="border rounded p-4 h-96 overflow-y-auto mb-4">
        {messages.map((msg) => (
          <div
            key={msg._id || Math.random()}
            className={
              msg.senderId === loginUser._id
                ? "text-right mb-3"
                : "text-left mb-3"
            }
          >
            <span
              className={
                msg.senderId === loginUser._id
                  ? "inline-block bg-green-500 text-white px-3 py-2 rounded"
                  : "inline-block bg-gray-200 px-3 py-2 rounded"
              }
            >
              {msg.message}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
          className="border p-3 rounded w-full"
        />

        <button
          onClick={sendMessage}
          className="bg-green-600 text-white px-5 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
