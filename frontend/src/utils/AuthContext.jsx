import React, { createContext, useState, useEffect } from "react";
import { getProfile } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // ✅ add token state
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      setUser(null);
      setToken(null); // clear token
      setLoading(false);
      return;
    }
    try {
      setToken(storedToken); // store token in state
      const res = await getProfile(storedToken);
      setUser(res.data.user);
    } catch (err) {
      localStorage.removeItem("token");
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const signin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken); // ✅ store token
    fetchProfile();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null); // clear token
  };

  return (
    <AuthContext.Provider value={{ user, loading, token, signin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
