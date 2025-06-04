"use client";

import { createContext, useState, useEffect, useContext } from "react";
import {
  login as loginUser,
  logout as logoutUser,
  getUser,
} from "@/utils/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCurrentUserData = () => {
      const user = getUser();
      setCurrentUser(user);
    };

    getCurrentUserData();
    setIsLoading(false);

    const handleStorageChange = getCurrentUserData;

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = (username, password) => {
    const success = loginUser({ username, password });
    if (success) {
      const loggedInUser = getUser();
      setCurrentUser(loggedInUser);
    }
    return success;
  };

  const logout = () => {
    logoutUser();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
