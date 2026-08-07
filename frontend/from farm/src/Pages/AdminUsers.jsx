import { useEffect, useState } from "react";
import api from "../api/axios";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");

    const { data } = await api.get("/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUsers(data);
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("User deleted successfully");
      fetchUsers();
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        All Users 👥
      </h1>

      {users.map((user) => (
        <div
          key={user._id}
          className="border p-4 rounded mb-3"
        >
          <h2 className="font-bold">{user.name}</h2>
          <p>Mobile: {user.mobile}</p>
          <p>Role: {user.role}</p>
          <p>
            Location: {user.village}, {user.taluka}, {user.district}
          </p>
          <button
            onClick={() => deleteUser(user._id)}
            className="bg-red-600 text-white px-4 py-2 rounded mt-3"
          >
            🗑 Delete User
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminUsers;