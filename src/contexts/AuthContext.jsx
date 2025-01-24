import React, { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../firebase"; // Import auth from firebase.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe; // Unsubscribe from the listener when component unmounts
  }, []);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const value = {
    currentUser,
    signup,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-blue-600 mb-4 animate-bounce">
              Shopi
              <span className="inline-block w-2 h-2 bg-blue-600 rounded-full ml-0.5 animate-pulse"></span>
            </div>
            <div className="w-12 h-0.5 bg-blue-600/30 animate-pulse"></div>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
