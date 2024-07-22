import React from "react";
import SearchBar from "../SearchBar/SearchBar";

function Navbar(){
    return (
        <div className="navbar">
            <p className="heading">Stock Market Tracker</p>
            <SearchBar />
        </div>
    )
}

export default Navbar;