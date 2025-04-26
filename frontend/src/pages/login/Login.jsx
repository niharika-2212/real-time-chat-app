import React,{useState} from "react";
import './Login.css';
import { auth } from '../../firebaseConfig.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useUser } from "../../context/UserContext.jsx";

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
      // fetch user data from backend
      const response = await fetch(`http://localhost:5000/api/user/${user.uid}`);
      // if no response throw error
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to fetch user details');
        throw new Error(errorData.message || 'Failed to fetch user details');
      }
      // if response is ok then parse the data
      const userData = await response.json();

      setUser(userData); 
      console.log("Login successful. User data fetched", userData);
      navigate("/");

    } catch (error) {
      console.error("Login error:", error.message);
      setError(error.message);
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