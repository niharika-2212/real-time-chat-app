import React from "react";

function Messages({msg, selectedUser}) {
  return (
    <div
      className="message"
      style={{
        alignSelf:
          selectedUser ? "flex-end" : "flex-start",
      }}
    >
      {msg.text && <div>{msg.text}</div>}
      {msg.image && (
        <img
          src={msg.image}
          alt="sent"
        />
      )}
    </div>
  )
}


export default Messages;