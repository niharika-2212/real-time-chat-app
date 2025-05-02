import React, { useState } from 'react';
import './Profile.css';
import NavBar from '../../components/NavBar';
import { useUser } from '../../context/UserContext.jsx';
import UserImage from "../../assets/user.png"
import uploadImageToCloudinary from "../../components/cloudinary.jsx";
import axios from 'axios';
import { FaCamera } from "react-icons/fa";


function Profile() {
  const { user, setUser } = useUser();
  const [ image, setImage ] = useState(null);
  const [preview, setPreview] = useState("");
  
  const handleImageChange = async (e) => { 
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));

  }
  const handleUpload = async () => { 
    if (!image) return;
    try {
      // upload image to cloudinary and get url
      const imageUrl = await uploadImageToCloudinary(image);

      if (!imageUrl) return alert("Upload failed.");
      // save the image url to database
      const res = await axios.put(
        `http://localhost:5000/api/user/update-profile-pic/${user.uid}`,
        { image: imageUrl }
      );

      alert("Profile picture updated");

      // Update context + localStorage
      const updatedUser = { ...user, profilePic: imageUrl };
      setUser(updatedUser);
      setImage(null);
      setPreview("");
    } catch (err) {
      console.error(err);
      alert("Error updating profile picture");
    }
  }

  if (!user) return <p>Please log in.</p>;
  return (
    <div className="profile-container">
      <NavBar />
      <div className="profile-content">
        <h1>Profile</h1>
        <div className='profile-details'>
          <div className='profile-image'>
            <img
              src={preview || user.profilePic || UserImage}
              alt="Profile"
              width={150}
              height={150}
              style={{ borderRadius: "50%", objectFit: "cover" }}
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
            <label htmlFor="imageUpload" className="profile-input">
              Upload Image
            </label>
            {image && <button onClick={handleUpload} className='buttons'>Update Profile Picture</button>}
          </div>
          <div>
            <p><strong>Full Name:</strong> {user.fullname}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Profile;