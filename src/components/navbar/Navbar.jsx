import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import logo from "./../../images/logo.png";

const Navbar = () => {
  const [searchData, setSearchData] = useState("");
  const searchHandler = (event) => {
    setSearchData(event.target.value);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to={"/"}>
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="search"
          onChange={searchHandler}
          value={searchData}
        />
        {searchData === "" ? (
          <Link className="searchBtn" to={`/`}>
            <span>Search</span>
          </Link>
        ) : (
          <Link className="searchBtn" to={`/search/${searchData}`}>
            <span>Search</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
