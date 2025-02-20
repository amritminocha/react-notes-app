import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["x-auth-token"] = token;
    }
  }, [token]);

  const login = async (credentials) => {
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", credentials);
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);
      setUser({ username: credentials.username });
      navigate("/notes");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      throw new Error(error.response?.data.msg || "Login failed");
    }
  };

  const signup = async (userData) => {
    try {
      const response = await axios.post("http://localhost:8080/api/auth/signup", userData);
      localStorage.setItem("token", response.data.jwt);
      setToken(response.data.jwt);
      setUser({ username: userData.username });
      navigate("/notes");
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      throw new Error(error.response?.data.msg || "Signup failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common["x-auth-token"];
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
