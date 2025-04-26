import { createContext, useState, useContext } from "react";

// 1. Create Context
const UserContext = createContext();

// 2. Create a Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// 3. Create a custom hook (to easily use it later)
export const useUser = () => useContext(UserContext);