import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Family<span>Flix</span></div>
      <div className="search-bar">
        <input type="text" placeholder="Buscar filmes e séries..." />
        <button>Buscar</button>
      </div>
      <div className="user-actions">
        <button id='active'>Home</button>
        <button>Minha Lista</button>
        <button id='sing-in'>Entrar</button>
      </div>
    </header>
  );
};

export default Header;
