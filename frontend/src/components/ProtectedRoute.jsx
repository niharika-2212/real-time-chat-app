import React from "react";
import { useUser } from "../context/UserContext.jsx";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children }) => {
  const { user } = useUser();
  if (!user) {
    return (<Navigate to="/login" replace />);
  }
  return children;
}
export default ProtectedRoute;

