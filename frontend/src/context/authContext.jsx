import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (data) => {
    const response = await axios.post(
      "http://127.0.0.1:8000/auth/login",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const userdata = await response.data;
    setUserData(userdata);
    localStorage.setItem("user", JSON.stringify(userData));
  };
  const logout = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
    await axios.post("http://127.0.0.1:8000/auth/logout");
    localStorage.clear();
    setUserData(null);
  };
  const verify = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
    const response = await axios.post("http://127.0.0.1:8000/auth/verify");
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(userData));
  }, [userData]);

  return (
    <AuthContext.Provider value={{ userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
