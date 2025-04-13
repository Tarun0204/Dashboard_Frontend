import React from "react";
import { FaSearch } from "react-icons/fa";
import "../styles/Header.css";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="search-container">
      <FaSearch className="search-icon" />
      <input
        type="search"
        placeholder="Search..."
        className="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
