import React, { useEffect, useState, useRef } from "react";
import userAvatarImg from "../assets/user_avatar.jpg";
import { useNavigate } from "react-router-dom";
import { fetchUserData } from "../services/userService";
import { toast, ToastContainer } from "react-toastify";
import { updateUser } from "../services/userService";
import { CiCamera } from "react-icons/ci";

import axios from "axios";

const UserProfile = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      console.log("Ham lay user profile");
      const userData = await fetchUserData();
      if (userData) {
        console.log(userData);
        setLoggedInUser(userData);
        console.log(loggedInUser);
      } else {
        navigate("/login"); // Chuyển đến trang đăng nhập nếu không có token hợp lệ
      }
    };
    getUserData();
  }, [navigate]);
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState(""); // Thêm state cho New Password
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoggedInUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleEditProfile = () => {
    setIsEditing(true);
    setPassword(""); // Đặt giá trị mật khẩu mới là rỗng
    setConfirmPassword(""); // Đặt giá trị xác nhận mật khẩu là rỗng
  };

  const handleSave = async () => {
    // console.log("Mat khau moi", password);
    // console.log("Xac nhan", password);
    if (password !== "" || confirmPassword !== "") {
      if (password !== confirmPassword) {
        alert("Mật khẩu không khớp. Vui lòng thử lại.");
        return;
      }
    }
    const updatedUserData = {
      ...loggedInUser,
      ...(password ? { password } : {}),
    };
    console.log("update data", updatedUserData);
    toast.success("Cập nhật thông tin thành công");
    setIsEditing(false);
    setPassword("");
    setConfirmPassword("");
    console.log("update data 2", updatedUserData);
    const user = await updateUser({ updatedUserData });
    console.log("user", user);
    // Ở đây bạn có thể thêm logic để lưu thông tin vào backend
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra định dạng email
    if (!/\S+@\S+\.\S+/.test(loggedInUser.email)) {
      alert("Định dạng email không đúng. Vui lòng thử lại.");
      return;
    }

    if (!loggedInUser.name) {
      alert("Họ tên không được để trống");
      return;
    }

    // Kiểm tra mật khẩu
    if (password !== "" && password.length < 6) {
      alert("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    // Nếu có lỗi, dừng lại không gửi yêu cầu

    // Nếu không có lỗi, gọi hàm lưu thông tin
    await handleSave();
  };

  const [image, setImage] = useState();

  const cloud_name = "dxwr1b9aa";
  const preset_key = "watchstore";

  const handleImageUpload = (event) => {
    if (
      !event.target ||
      !event.target.files ||
      event.target.files.length === 0
    ) {
      return;
    }
    const file = event.target.file[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const renderField = (label, name, value, type = "text") => {
    if (isEditing) {
      return (
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">{label}:</label>
          {type === "textarea" ? (
            <textarea
              name={name}
              value={value}
              onChange={handleChange}
              className="w-full min-h-[100px] p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <input
              type="text"
              name={name}
              value={value}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>
      );
    }
    return (
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700">{label}:</span>
        <span className="text-gray-600">{value}</span>
      </div>
    );
  };
  return (
    <div className="w-full max-w-4xl mx-auto p-4 mt-100 ">
      <ToastContainer />
      <h1 className="text-3xl font-semibold text-center text-black">Profile</h1>
      {loggedInUser && (
        /* Profile Info */
        <div className="mt-[-64px] mx-4 relative bg-white rounded-lg shadow-lg">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={
                    loggedInUser.avatar ? loggedInUser.avatar : userAvatarImg
                  }
                  alt={loggedInUser.name}
                  className="w-32 h-32 rounded-full border-4 border-white"
                />
                {/* <div className="absolute bottom-0 right-0 px-2 py-1 text-sm bg-white rounded-lg shadow hover:bg-gray-50">
                  <CiCamera onClick={handleImageUpload} size={30} />
                </div> */}
              </div>
            </div>
            {/* Bio */}
            <div className="mt-6">
              {renderField("Họ tên", "name", loggedInUser.name)}
            </div>
            <div className="flex flex-col gap-1 mt-6">
              <label className="text-sm font-medium text-gray-700">
                Username:
              </label>
              <label className="text-gray-600"> {loggedInUser.username} </label>
            </div>
            <div className="mt-6">
              {renderField("Email", "email", loggedInUser.email)}
            </div>
            {isEditing && (
              <>
                <div className="flex flex-col gap-1 mt-6">
                  <label className="text-sm font-medium text-gray-700">
                    Mật khẩu mới:
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col gap-1 mt-6">
                  <label className="text-sm font-medium text-gray-700">
                    Xác thực mật khẩu:
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}
            {/* Action Buttons */}
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-600"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Lưu
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEditProfile}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Chỉnh sửa Profile
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
