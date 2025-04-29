import React, { useState } from "react";
import "./Signup.css";
import { auth } from "../../firebaseConfig.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext.jsx";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser(); // Get setUser function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // console.log("Signup successful:", userCredential.user);
      const user = userCredential.user;
      const userData = {
        uid: user.uid,
        fullname: fullname,
        email: user.email,
      };
      const response = await fetch("http://localhost:5000/api/user/signup", {
        // Replace with your backend API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to signup");
      }
      setUser(userData);
      console.log("Signup successful. User data saved to MongoDB.");
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error.message);
      setError(error.message);
    }
  };
  return (
    <div className="login-container">
      <div className="login-header">
        <div className="login-name">ChatterBox</div>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="login-heading">Signup</div>
          <div className="input-container">
            <label className="login-label">Enter your Email</label>
            <input
              className="login-input"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="input-container">
            <label className="login-label">Enter your Password</label>
            <input
              className="login-input"
              type="text"
              placeholder="Full Name"
              onChange={(e) => setFullname(e.target.value)}
              value={fullname}
              required
            />
          </div>
          <div className="input-container">
            <label className="login-label">Enter your Password</label>
            <input
              className="login-input"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          {error && <p style={{ color: "#F87171" }}>{error}</p>}
          <button type="submit" className="buttons">Signup</button>
          <div className="signup-link">
            Already have an account? <a href="/login" className="link">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Signup;
