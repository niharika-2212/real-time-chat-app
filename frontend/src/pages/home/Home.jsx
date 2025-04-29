import React, { useState } from "react";
import "./Home.css";
import Sidebar from "../../components/Sidebar.jsx";
import ChatWindow from "../../components/ChatWindow.jsx";
import NavBar from "../../components/NavBar.jsx";

function Home() {
  const [selectedUser, setSelectedUser] = useState(null);
  const handleSelectUser = (user) => {
    setSelectedUser(user);
    console.log(user);
  };
  return (
    <div className="home">
      <NavBar/>
        <div className="home-main">
          <Sidebar onSelectUser={handleSelectUser} />
          <ChatWindow selectedUser={selectedUser} />
        </div>
    </div>
  );
}

export default Home;
