import React from "react";
import "./SearchBar.css";

export const SearchBar = ({ handleChange, keyword }) => {
  return (
    <div className="input-field search-container">
      <label htmlFor="search">
        <i className="fas fa-search"></i>search by recipe title or author{" "}
      </label>
      <input
        onChange={handleChange}
        type="search"
        defaultValue={keyword && keyword.length > 2 ? keyword : undefined}
        name="search"
        id="search"
      />
    </div>
  );
};
