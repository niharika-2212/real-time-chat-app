import React, { useState, useEffect, useRef } from "react";
import "./component.css";
import { useUser } from "../context/UserContext.jsx";
import axios from "axios";
import io from "socket.io-client";
import { toast } from "react-toastify";
const socket = io("http://localhost:5001");

function ChatWindow({ selectedUser }) {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
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
          toast.info("📩 New message received! ", {
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
    if (!newMessage.trim()) return; // Prevent sending empty messages
    const messageData = {
      senderId: user._id,
      receiverId: selectedUser._id,
      text: newMessage,
    };
    try {
      // socket.emit("send_message", messageData);
      const response = await axios.post(
        "http://localhost:5000/api/message/send",
        messageData
      );
      socket.emit("send_message", response.data.message);
      // setMessages((prevMessages) => [...prevMessages, response.data.message]);
      // setMessages((prevMessages) => [...prevMessages, messageData]);
      console.log(messages);
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
      <div className="sidebar-heading">{selectedUser.fullname}</div>
      <div className="message-container">
        {messages.map((msg) => {
          return (
            <div
              key={msg._id}
              className="message"
              style={{
                alignSelf:
                  msg.senderId === user._id ? "flex-end" : "flex-start",
              }}
            >
              {msg.text}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="message-form">
        <input
          className="login-input"
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit" className="buttons">
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatWindow;
