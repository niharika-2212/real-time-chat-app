import React, { useState } from 'react';
import './Signup.css';
import { auth } from '../../firebaseConfig.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext.jsx';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser(); // Get setUser function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // console.log("Signup successful:", userCredential.user);
      const user = userCredential.user;
      const userData = {
        uid: user.uid,
        fullname: fullname,
        email: user.email,
      }
      const response = await fetch('http://localhost:5000/api/user/signup', { // Replace with your backend API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to signup');
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
    <div>
      <form onSubmit={handleSubmit}>
        <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} required />
        <input type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} value={password} required />
        <input type='text' placeholder='Full Name' onChange={(e) => setFullname(e.target.value)} value={fullname} required />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type='submit'>Signup</button>
        <p>Already have an account? <a href='/login'>Login</a></p>
      </form>
    </div>
  )
}
export default Signup;