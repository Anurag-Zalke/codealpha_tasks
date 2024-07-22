import React, { useState, useEffect, useRef } from "react";
import { searchKeyword } from "../../api";
import { useNavigate } from "react-router-dom";

function SearchBar() {
    const [keyword, setKeyword] = useState("");
    const [suggestions, setSuggestions] = useState(null);
    const navigate = useNavigate();
    const searchRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSuggestions(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    async function getSuggestions() {
        const { data } = await searchKeyword(keyword);
        console.log(data);
        setSuggestions(data.bestMatches);
    }
    
    function handleChange(event){
        const value = event.target.value;
        function suggestioncall(val) {
            if(val !== "") {
                getSuggestions();
            } else {
                setSuggestions(null);
            }
        }
        setKeyword((prevValue) => {
            suggestioncall(value);
            return value;
        });
    }

    function handleClick(event){
        console.log(event);
        navigate(`/card/${event.target.id}`);
    }

    return (
        <div className="searchbar" ref={searchRef}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input placeholder="Search" onChange={handleChange} value={keyword}></input>
            {suggestions && (
                <div className="dropdown">
                    {suggestions.map((suggestion) => (
                        <div className="entry" onClick={handleClick} id={suggestion["1. symbol"]} key={suggestion["1. symbol"]}>
                            <p>{suggestion["2. name"]}</p>
                            <p className="sugsymbol">{suggestion["1. symbol"]}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

}

export default SearchBar;
