import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Sidebar({ onSelectUser }) {
  const { user } = useUser(); // logged in user info
  const [users, setUsers] = React.useState([]); // all users info
  const [loading, setLoading] = useState(true); // loading state
  const navigate = useNavigate(); // for navigation
  useEffect(() => {
    const fetchUsers = async () => {
      if (!user) return; // if not logged in, don't fetch
      try {
        // this token is used to authenticate the user
        // if logged in fetch all users except current
        // const response = await axios.get(`http://localhost:5000/api/user/allusers/${user.uid}`, {
        //   headers: {
        //     "Authorization": `Bearer ${token}`,
        //   }
        // });
        const response = await axios.get(`http://localhost:5000/api/user/allusers/${user.uid}`);
        // save the data
        const data = response.data;
        setUsers(data.users);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user]);
  if (loading) {
    return <div>Loading users...</div>;
  }
  return (
    <div className="left-sidebar">
      {users.length == 0 ? (
        <p>no users available</p>
      ) : (
        users.map((user) => {
          return <p onClick={() => onSelectUser(user)} key={user.uid}>{user.fullname}</p>
        })
      )}
    </div>
  )

}

export default Sidebar;