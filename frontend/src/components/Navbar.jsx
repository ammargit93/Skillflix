// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ username, user_id }) => {
  return (
    <header className="flex justify-between items-center px-6 py-4 border-b border-gray-700 bg-black/30 backdrop-blur-sm">
      <h1 className="text-xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
        Skillflix
      </h1>
      <nav className="space-x-4 text-sm text-gray-300 font-medium">
        <Link to={`/history/${user_id}`} className="hover:text-white transition">
          History
        </Link>
        <Link to={`/profile/${username}`} className="hover:text-white transition">
          My Profile
        </Link>
        <Link to="/login" className="hover:text-white transition">
          Logout
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
