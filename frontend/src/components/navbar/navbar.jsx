import React, { useContext } from "react";
import "./navbar.css";
import { AuthContext } from "../../context/authContext";

function Navbar() {
  const { logout } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="logo">Logo</div>
      <div className="search">
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
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
        />
      </div>
      <div className="user-info" onClick={logout}>
        User
      </div>
    </div>
  );
}

export default Navbar;
