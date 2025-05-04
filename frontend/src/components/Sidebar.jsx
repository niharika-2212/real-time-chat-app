import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext.jsx";
import axios from "axios";
import userImage from "../assets/user.png"
import NavBar from "./NavBar.jsx";

function Sidebar({ onSelectUser, profileClick }) {
  const { user } = useUser(); // logged in user info
  const [users, setUsers] = React.useState([]); // all users info
  const [loading, setLoading] = useState(true); // loading state
  const [selectedUid, setSelectedUid] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!user) return; // if not logged in, don't fetch
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/allusers/${user.uid}`
        );
        // save the data
        const data = response.data;
        setUsers(data.users);
        // console.log("Fetched users:", data.users);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user]);
  
  if (loading) {
    return <div>Loading users...</div>;
  }
  return (
    <div className="sidebar-container">
      {users.length == 0 ? (
        <div>no users available</div>
      ) : (
        users.map((user) => {
          return (
            <div
              className="user"
              style={{
                backgroundColor:
                  user.uid === selectedUid ? "#414346" : null,
              }}
              onClick={() => {
                setSelectedUid(user.uid);
                onSelectUser(user);
              }}
              key={user.uid}
            >
              <img src={user.profilepic || userImage}  alt="user" className="avatar-image-s" />
              {user.fullname}
            </div>
            
          );
        })
      )}
    </div>
  );
}

export default Sidebar;
