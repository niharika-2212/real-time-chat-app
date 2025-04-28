import { createContext, useState, useContext,useEffect } from "react";

// 1. Create Context
const UserContext = createContext();

// 2. Create a Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Check if user data exists in localStorage when app loads
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      // store in local storage if user provided
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      // remove from local storage if user is null
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// 3. Create a custom hook (to easily use it later)
export const useUser = () => useContext(UserContext);