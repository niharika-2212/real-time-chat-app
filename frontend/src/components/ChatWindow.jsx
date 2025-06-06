import React, { useState, useEffect, useRef } from "react";
import { useUser } from "../context/UserContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import uploadImageToCloudinary from "./cloudinary.jsx";
import { MdFileUpload } from "react-icons/md";
import Messages from "./Messages.jsx";
import socket from "../Socket.js"; // Import the socket instance
import userImage from "../assets/user.png";
function ChatWindow({ selectedUser }) {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [image, setImage] = useState(null);
  const [isSending, setIsSending] = useState(false);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    // Fetch messages from the server for the selected user
    const fetchMessages = async () => {
      if (!selectedUser || !user) return;
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/message/${user._id}/${selectedUser._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.error(
          "Error fetching messages:",
          error.response?.data?.message || error.message
        );
      }
    };
    fetchMessages();

    socket.on("receive_message", (message) => {
      if (
        (message.senderId === user._id &&
          message.receiverId === selectedUser._id) ||
        (message.senderId === selectedUser._id &&
          message.receiverId === user._id)
      ) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
      if (message.receiverId === user._id) {
        if (selectedUser && message.senderId === selectedUser._id) {
          toast.info(`New message from ${selectedUser.fullname}: ${message.text}`, {
            position: "bottom-left",
            autoClose: 2500,
            theme: "colored",
          });
        } else {
          toast.info(`📩 New message received! `, {
            position: "bottom-left",
            autoClose: 2500,
            theme: "colored",
          });
        }
      }
    });

    // Clean up socket listener on component unmount
    return () => {
      socket.off("receive_message");
    };
  }, [selectedUser, user]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() && !image) return;

    setIsSending(true); // start loading

    let imageUrl = null;
    if (image) {
      imageUrl = await uploadImageToCloudinary(image);
      if (!imageUrl) {
        setIsSending(false); // stop loading on failure
        return;
      }
    }

    const messageData = {
      senderId: user._id,
      receiverId: selectedUser._id,
      text: newMessage,
      image: imageUrl,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/message/send",
        messageData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      socket.emit("send_message", response.data.message);
      setNewMessage("");
      setImage(null);
    } catch (error) {
      console.error("Error sending message:", error.response?.data?.message || error.message);
    } finally {
      setIsSending(false); // stop loading regardless of success or failure
    }
  };

  if (!selectedUser) {
    return (
      <div className="chat-window">
        <div className="select-user">Select a user to start chatting</div>
      </div>
    );
  }

  return (
    <div className="chat-window">
      <div className="chat-heading">
        <img src={user.profilepic || userImage} alt="user" className="avatar-image-s" />
        <div>{selectedUser.fullname}</div>
      </div>
      <div className="message-container">
        {messages.length === 0 ? (
          <div className="no-messages">No messages to display</div>
        ) : (
          messages.map((msg) => (
            <Messages key={msg._id} msg={msg} selectedUser={msg.senderId === user._id} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      {image && (
        <div className="image-preview">
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
          />
          <button onClick={() => setImage(null)} className="cancel-button">X</button>
        </div>
      )}
      <form onSubmit={handleSendMessage} className="message-form">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          id="imageUpload"
          className="file-input"
          style={{ display: "none" }}
        />
        <label htmlFor="imageUpload" className="upload-label">
          <MdFileUpload className="upload-icon" />
        </label>
        <input
          className="login-input"
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          required
        />
        <button type="submit" className={`buttons ${isSending ? "disabled" : ""}`} disabled={isSending}>
          {isSending ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}

export default ChatWindow;
