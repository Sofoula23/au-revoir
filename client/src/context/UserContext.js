import React, { createContext, useContext, useState } from "react";

const beginSession = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const endSession = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = (user) => {
  const userJson = localStorage.getItem("user");
  if (!userJson) {
    return null;
  }
  return JSON.parse(userJson);
};

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(getCurrentUser());

  const handleUpdateUser = (user) => {
    if (user) {
      beginSession(user);
    } else {
      endSession();
    }
    setUser(user);
  };

  return (
    <UserContext.Provider value={{ user, setUser: handleUpdateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useCurrentUser = () => {
  const { user, setUser } = useContext(UserContext);
  return [user, setUser];
};

export default UserContextProvider;
