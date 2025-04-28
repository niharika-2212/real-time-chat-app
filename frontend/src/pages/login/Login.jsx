import React,{useState} from "react";
import './Login.css';
import { auth } from '../../firebaseConfig.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useUser } from "../../context/UserContext.jsx";
import axios from 'axios';

function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { setUser } = useUser();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // console.log("Login successful:", userCredential.user);
      const user = userCredential.user;
      // // fetch user data from backend
      // const response = await axios.get(`http://localhost:5000/api/user/${user.uid}`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      const response = await axios.get(`http://localhost:5000/api/user/${user.uid}`);

      // Set user in context
      setUser(response.data); 
      // console.log("Login successful. User data fetched", response.data);
      navigate("/");

    } catch (error) {
      console.error("Login error:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || error.message);
    }
  }
  
  return(
    <div>
      <form onSubmit={handleSubmit}>
        <input type='email' placeholder='Email' onChange={(e)=>setEmail(e.target.value)} value={email} required/>
        <input type='password' placeholder='password' onChange={(e)=>setPassword(e.target.value)} value={password} required/>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type='submit'>Login</button>
        <p>Don't have an account? <a href='/signup'>Signup</a></p>
      </form>
    </div>
  )
}

export default Login;