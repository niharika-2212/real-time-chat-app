import React, { useState } from "react";
import { auth } from "../../firebaseConfig.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext.jsx";
import axios from "axios";
import loginImage from "../../assets/login.png";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser(); // Get setUser function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      const userData = {
        uid: user.uid,
        fullname: fullname,
        email: user.email,
      };
      const idToken = await user.getIdToken();
      localStorage.setItem("token", idToken);
      const response = await axios.post("http://localhost:5000/api/user/signup", userData);
      console.log("User data saved to MongoDB:", response.data.user);
      setUser(response.data.user);

      console.log("Signup successful. User data saved to MongoDB.");
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || "Failed to signup");
    }
  };
  return (
    <div className="login-container">
      <div className="login-header">
        <div className="login-name">ChatterBox</div>
      </div>
      <div className="login-main">
        <form onSubmit={handleSubmit} className="form-container">
          <div className="login-heading">Let's Get You Started!</div>
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
            <label className="login-label">Enter your username</label>
            <input
              className="login-input"
              type="text"
              placeholder="Username"
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
          <div className="input-container">
            <label className="login-label">Confirm Password</label>
            <input
              className="login-input"
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              required
            />
          </div>
          {error && <p style={{ color: "#F87171" }}>{error}</p>}
          <button type="submit" className="buttons">Signup</button>
          <div className="signup-link">
            Already have an account? <a href="/login" className="link">Login</a>
          </div>
        </form>
        <img src={loginImage} alt="chat-image" className="login-image" />
      </div>
    </div>
  );
}
export default Signup;
