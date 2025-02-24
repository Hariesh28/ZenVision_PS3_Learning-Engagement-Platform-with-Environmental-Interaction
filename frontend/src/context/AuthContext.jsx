import { createContext, useContext, useState, useEffect } from "react";

// Create Auth Context
export const AuthContext = createContext(); // ✅ Export directly

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  // Load userId from localStorage when app starts
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
      setIsSignedIn(true);
    }
  }, []);

  // Login function
  const login = (id) => {
    setUserId(id);
    setIsSignedIn(true);
    localStorage.setItem("userId", id);
  };

  // Logout function
  const logout = () => {
    setUserId(null);
    setIsSignedIn(false);
    localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider value={{ userId, isSignedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
