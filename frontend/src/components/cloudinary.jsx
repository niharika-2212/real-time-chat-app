
const uploadImageToCloudinary = async (imageFile) => {
  const data = new FormData();
  data.append("file", imageFile);
  data.append("upload_preset", "chat_uploads"); // from Cloudinary settings
  data.append("cloud_name", "dwfle7byp");

  try {
    const res = await fetch("https://api.cloudinary.com/v1_1/dwfle7byp/image/upload", {
      method: "POST",
      body: data,
    });

    const json = await res.json();
    return json.secure_url; // this is your CDN image URL
  } catch (error) {
    console.error("Upload failed", error);
    return null;
  }
};

export default uploadImageToCloudinary;