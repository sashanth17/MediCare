// context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Load auth from localStorage if available
  const [auth, setAuth] = useState(() => {
    const stored = localStorage.getItem("auth");
    return stored
      ? JSON.parse(stored)
      : { isLoggedIn: false, role: null, user: null };
  });

  const login = (role, userData) => {
    const newAuth = { isLoggedIn: true, role, user: userData };
    setAuth(newAuth);
    localStorage.setItem("auth", JSON.stringify(newAuth));
    navigate(`/${role.toLowerCase()}/dashboard`);
  };

  const logout = () => {
    setAuth({ isLoggedIn: false, role: null, user: null });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
