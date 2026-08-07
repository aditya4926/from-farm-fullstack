import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function EditProfile() {
    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const navigate = useNavigate();
    const [photo, setPhoto] = useState(
        user.photo || ""
    );
    const [formData, setFormData] =
        useState({
            name: user.name,
            mobile: user.mobile,
            village: user.village,
            taluka: user.taluka,
            district: user.district,
            latitude: user.location?.latitude || "",
            longitude: user.location?.longitude || "",
        });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const getLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position.coords.latitude);
                console.log(position.coords.longitude);
                setFormData((prev) => ({
                    ...prev,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                }));

                alert("Location Captured Successfully 📍");
            },
            (error) => {
                console.log(error);
                alert("Location Permission Denied");
            }
        );
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("SENDING PROFILE =", {
            ...formData,
            photo,
        });
        const token =
            localStorage.getItem("token");

        const { data } = await api.put(
            "/auth/profile",
            {
                ...formData,
                photo,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        localStorage.setItem(
            "user",
            JSON.stringify(data)
        );

        alert("Profile Updated");

        navigate("/profile");
    };

    return (
        <form
            onSubmit={submitHandler}
            className="p-8"
        >
            <input
                type="file"
                onChange={async (e) => {
                    const file = e.target.files[0];

                    const formData = new FormData();

                    formData.append(
                        "image",
                        file
                    );

                    const token =
                        localStorage.getItem("token");

                    const { data } = await api.post(
                        "/auth/upload-photo",
                        formData,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                "Content-Type":
                                    "multipart/form-data",
                            },
                        }
                    );

                    setPhoto(data.imageUrl);
                }}
            />
            <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border p-2 block mb-3"
            />

            <input
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="border p-2 block mb-3"
            />

            <input
                name="village"
                value={formData.village}
                onChange={handleChange}
                className="border p-2 block mb-3"
            />

            <input
                name="taluka"
                value={formData.taluka}
                onChange={handleChange}
                className="border p-2 block mb-3"
            />

            <input
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="border p-2 block mb-3"
            />
            <button
                type="button"
                onClick={getLocation}
                className="bg-blue-600 text-white px-4 py-2 rounded mb-3 block"
            >
                📍 Use Current Location
            </button>

            <button
                className="bg-green-600 text-white px-4 py-2 rounded"
            >
                Save Changes
            </button>
        </form>
    );
}

export default EditProfile;