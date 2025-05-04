import React, { useState } from "react";
// import "./Home.css";
import Sidebar from "../../components/Sidebar.jsx";
import ChatWindow from "../../components/ChatWindow.jsx";
import Profile from "../Profile/Profile.jsx";
import NavBar from "../../components/NavBar.jsx";
function Home() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isprofile, setIsProfile] = useState(false);  
  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setIsProfile(false); // Reset profile view when a user is selected
  };
  const handleProfileClick = (val) => {
    setIsProfile(val);
  };

  return (
    <div className="home">
      {/* <NavBar/> */}
      <NavBar profileClick={handleProfileClick}/>

        <div className="home-main">
          <Sidebar onSelectUser={handleSelectUser} profileClick={handleProfileClick}/>
          {isprofile ? <Profile/> : <ChatWindow selectedUser={selectedUser} />}
          
        </div>
    </div>
  );
}

export default Home;
