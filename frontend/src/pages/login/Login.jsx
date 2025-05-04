import React, { useState } from "react";
import { auth } from "../../firebaseConfig.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext.jsx";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { setUser } = useUser();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      const response = await axios.get(
        `http://localhost:5000/api/user/${user.uid}`
      );

      // Set user in context
      setUser(response.data);
      navigate("/");
    } catch (error) {
      console.error(
        "Login error:",
        error.response?.data?.message || error.message
      );
      setError(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <div className="login-name">ChatterBox</div>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="login-heading">Login</div>
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
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          </div>
          {error && <p style={{ color: "#F87171" }}>{error}</p>}
          <button type="submit" className="buttons">Login</button>
          <div className="signup-link">
            Don't have an account? <a href="/signup" className="link">Signup</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
