import React, {useState } from "react";
import './Home.css';
import Sidebar from "../../components/Sidebar.jsx";
import ChatWindow from "../../components/ChatWindow.jsx";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig.js";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext.jsx";

function Home() {
  const navigate = useNavigate();
    const { setUser } = useUser();
  const [selectedUser, setSelectedUser] = useState(null);
  const handleSelectUser = (user) => {
    setSelectedUser(user);   
    console.log(user)
  };
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out.");
      setUser(null); // Clear user from context
      navigate("/login"); // Redirect to login
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };
  return (
    <div className="home">
      <button className="logout" onClick={handleLogout}>Logout</button>
      <div className="home-main">
        <Sidebar onSelectUser={handleSelectUser}/>
        <ChatWindow selectedUser={selectedUser}/>
      </div>
    </div>
  )
}

export default Home;