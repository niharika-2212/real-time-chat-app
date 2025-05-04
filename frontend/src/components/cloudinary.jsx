// import dotenv from "dotenv";
// dotenv.config();
import axios from "axios";
const uploadImageToCloudinary = async (imageFile) => {
  const data = new FormData();
  data.append("file", imageFile);
  data.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET); // from Cloudinary settings
  data.append("cloud_name", import.meta.env.VITE_CLOUD_NAME); // from Cloudinary settings

  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
      data
    );

    return res.data.secure_url; // this is your CDN image URL
  } catch (error) {
    console.error("Upload failed", error);
    return null;
  }
};

export default uploadImageToCloudinary;