import React, { useEffect, useState } from 'react';
import { useUser } from "../context/UserContext.jsx";
import UserImage from "../assets/user.png";
import uploadImageToCloudinary from "./cloudinary.jsx";
import axios from 'axios';
import { FaCamera } from "react-icons/fa";


function Profile() {
  const { user, setUser } = useUser();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false); // loading state
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));

  }
  const handleUpload = async () => {
    setLoading(true);
    if (!image) return;
    try {
      // upload image to cloudinary and get url
      const imageUrl = await uploadImageToCloudinary(image);

      if (!imageUrl) return alert("Upload failed.");
      const token = localStorage.getItem("token");
      // save the image url to database
      const res = await axios.put(
        `http://localhost:5000/api/user/update-profile-pic/${user.uid}`,
        { image: imageUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile picture updated");

      // Update context + localStorage
      const updatedUser = { ...user, profilepic: imageUrl };
      setUser(updatedUser);
      setImage(null);
      setPreview("");
    } catch (err) {
      console.error(err);
      alert("Error updating profile picture");
    }
    setLoading(false);
  }

  if (!user) return <p>Please log in.</p>;
  return (
    <div className="profile-container">
      {/* <NavBar /> */}
      <div className='profile-heading'>Profile</div>
      <div className='profile-details'>
        <div className='profile-image'>
          <div className='avatar-wrapper'>
            <img
              src={preview || user.profilepic || UserImage}
              alt="Profile"
              className='avatar-image'
            />
            {/* <input type="file" accept="image/*" onChange={handleImageChange} /> */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              id="imageUpload"
              // className="buttons"
              style={{ display: "none" }}
            />
            <label htmlFor="imageUpload" className="camera-overlay">
              <FaCamera />
            </label>
          </div>
          {image && <button onClick={handleUpload} className='buttons'>{loading ? `Loading...` : `Update Profile Picture`}</button>}
        </div>
        <div>
          <p><strong>Full Name:</strong> <span style={{ color: "#A0A0B0" }}>{user.fullname}</span></p>
          <p ><strong>Email:</strong> <span style={{ color: "#A0A0B0" }}>{user.email}</span></p>
          <p><strong>Created At:</strong> <span style={{ color: "#A0A0B0" }}>{new Date(user.createdAt).toLocaleDateString()}</span></p>
        </div>
      </div>
    </div>

  )
}

export default Profile;