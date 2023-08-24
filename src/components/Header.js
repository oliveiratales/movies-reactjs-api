import React, { useState, useRef, useEffect } from "react";
import Api from "../Api";
import "./Header.css";

const Header = ({ setSearchResults, setSearchTerm }) => {
  const [searchResults, setSearchResultsLocal] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false); // New state for showing/hiding search results
  const searchRef = useRef(null);
  const searchResultsRef = useRef(null);

  const handleSearch = async (searchTerm) => {
    if (searchTerm) {
      const results = await Api.searchMovies(searchTerm);
      setSearchResultsLocal(results.slice(0, 5));
      setSearchResults(results.slice(0, 5));
      setShowSearchResults(true); // Show search results when there are results
    } else {
      setSearchResultsLocal([]);
      setSearchResults([]);
      setShowSearchResults(false); // Hide search results when input is empty
    }
  };

  const handleDocumentClick = (e) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(e.target) &&
      searchResultsRef.current &&
      !searchResultsRef.current.contains(e.target)
    ) {
      setSearchResults([]);
      setShowSearchResults(false); // Hide search results when clicking outside
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <header className="header">
      <div className="logo">
        Family<span>Flix</span>
      </div>
      <div className="search-bar" ref={searchRef}>
        <input
          type="text"
          placeholder="Buscar filmes e séries..."
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            setSearchTerm(e.target.value);
            handleSearch(e.target.value);
          }}
        />
        <button>Buscar</button>
        {showSearchResults && searchResults.length > 0 && (
          <div className="search-results" ref={searchResultsRef}>
            {searchResults.map((result, index) => (
              <div key={index} className="search-result">
                <img
                  src={`https://image.tmdb.org/t/p/w92${result.poster_path}`}
                  alt={result.title}
                />
                <span>{result.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="user-actions">
        <button id="active">Home</button>
        <button>Minha Lista</button>
        <button id="sing-in">Entrar</button>
      </div>
    </header>
  );
};

export default Header;
