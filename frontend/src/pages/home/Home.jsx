import React from "react";
import { useUser } from "../../context/UserContext.jsx";
function Home() {
  const { user } = useUser();
  return(
    <div>
      <h1>{user?.fullname}</h1>
    </div>
  )
}

export default Home;