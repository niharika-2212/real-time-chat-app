import React from "react";

function Messages({msg, selectedUser}) {
  return (
    <div
      className="message"
      style={{
        alignSelf:
          selectedUser ? "flex-end" : "flex-start",
        textAlign:
          selectedUser ? "right" : "left",
      }}
    >
      {msg.text && <div>{msg.text}</div>}
      {msg.image && (
        <img
          src={msg.image}
          alt="sent"
          className="message-image"
        />
      )}
    </div>
  )
}


export default Messages;