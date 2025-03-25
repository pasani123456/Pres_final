// src/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase/firebase"; // Ensure this path is correct
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Define the login function
  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
