import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
    const user = JSON.parse(localStorage.getItem("user"));

    const [profile] = useState(user);
    const navigate = useNavigate();

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-green-600 mb-6">
                My Profile 👤
            </h1>

            <div className="border rounded-lg p-6 shadow-md max-w-lg">
                <img
                    src={
                        profile?.photo ||
                        "https://via.placeholder.com/150"
                    }
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover mb-4"
                />
                <p className="mb-3">
                    <strong>Name:</strong> {profile?.name}
                </p>

                <p className="mb-3">
                    <strong>Mobile:</strong> {profile?.mobile}
                </p>

                <p className="mb-3">
                    <strong>Role:</strong> {profile?.role}
                </p>

                <p className="mb-3">
                    <strong>Village:</strong> {profile?.village}
                </p>

                <p className="mb-3">
                    <strong>Taluka:</strong> {profile?.taluka}
                </p>

                <p className="mb-3">
                    <strong>District:</strong> {profile?.district}
                </p>

            </div>
            <button
                onClick={() => navigate("/edit-profile")}
                className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
            >
                Edit Profile
            </button>
        </div>
    );
}

export default Profile;