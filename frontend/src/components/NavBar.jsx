import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig.js";
import { CgProfile } from "react-icons/cg";
import { FaPowerOff } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";


function NavBar({profileClick, setSidebarOpen}) {
  const { setUser } = useUser();
  const navigate = useNavigate();
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
    <div className="navbar-container">
      <div className="navbar-heading" onClick={() => { navigate("/") }}>ChatterBox</div>
      <div className="right-nav">
        <div className="hamburger" onClick={() => setSidebarOpen(true)}>
          <GiHamburgerMenu className="hamburger-icon"/>
        </div>
        <div onClick={() => { profileClick(true) }}><CgProfile className="profile-icon" /></div>
        <FaPowerOff onClick={handleLogout} className="logout-button" />
      </div>
    </div>
  )
}
export default NavBar;