import React, { useState, useEffect } from "react";
import "./ChatWindow.css";
import { useUser } from "../context/UserContext.jsx";
import axios from "axios";
function ChatWindow({ selectedUser }) {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  useEffect(() => {
    // Fetch messages from the server for the selected user
    const fetchMessages = async () => {
      if (!selectedUser || !user) return;
      try {
        // console.log("Fetching messages for:", user._id, selectedUser._id);
        const response = await axios.get(
          `http://localhost:5000/api/message/${user._id}/${selectedUser._id}`
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
  }, [selectedUser, user]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return; // Prevent sending empty messages
    const messageData = {
      senderId: user._id,
      receiverId: selectedUser._id,
      text: newMessage,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/message/send",
        messageData
      );
      setMessages((prevMessages) => [...prevMessages, response.data.message]);
      setNewMessage("");
    } catch (error) {
      console.error(
        "Error sending message:",
        error.response?.data?.message || error.message
      );
    }
  };

  if (!selectedUser) {
    return (
      <div className="chat-window">
        <p>Select a user to start chatting</p>
      </div>
    );
  }

  return (
    <div className="chat-window">
      <h2>{selectedUser.fullname}</h2>
      <div className="message-container">
      {messages.map((msg) => {
        return (<div
          key={msg._id}
          className="message"
          style={{
            alignSelf: msg.senderId === user._id ? "flex-end" : "flex-start",
          }}
        >
          {msg.text}
          
        </div>);
      })}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatWindow;
