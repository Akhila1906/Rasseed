import React, { useEffect, useState } from "react";
import UserContextObj from "./UserContextObj";

function UserContext({ children }) {
  let [currentUser, setCurrentUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profileImageUrl: "",
  });
  useEffect(() => {
    const userInStorage = localStorage.getItem("currentuser");
    if (userInStorage) {
      setCurrentUser(JSON.parse(userInStorage));
    }
  }, []);
  return (
    <UserContextObj.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContextObj.Provider>
  );
}

export default UserContext;
