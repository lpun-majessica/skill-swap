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

  useEffect(() => {
    setCurrentUser(getUser());

    const handleStorageChange = () => {
      setCurrentUser(getUser());
    };

    // Listen for our custom storage events
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const login = (username) => {
    const success = loginUser(username);
    if (success) {
      setCurrentUser(getUser());
    }
    return success;
  };

  const logout = () => {
    logoutUser();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
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
