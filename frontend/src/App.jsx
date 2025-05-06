// import { useState } from 'react';
import './App.css'
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
// import Profile from './pages/Profile/Profile.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} className="notification"/>
    </div>
  )
}

export default App
