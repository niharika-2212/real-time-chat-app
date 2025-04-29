import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig.js";


function NavBar() {
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
      <div className="navbar-heading">ChatterBox</div>
      <button className="buttons" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}
export default NavBar;