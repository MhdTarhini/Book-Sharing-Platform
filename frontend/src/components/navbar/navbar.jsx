import React, { useContext, useState } from "react";
import "./navbar.css";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

function Navbar({ onSearch }) {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const { logout, userData } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <div className="navbar">
      <div className="logo-nav">BOOKS Platform</div>
      <div className="search">
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={handleSearch}>
          <path
            d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search"
          className="search-input"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="user-info">
        <div>{`${userData.user.firstName} ${userData.user.lastName}`}</div>
        <div className="logout" onClick={handleLogout}>
          Logout
        </div>
      </div>
    </div>
  );
}

export default Navbar;
