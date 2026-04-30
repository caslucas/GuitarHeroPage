import React from 'react';

const Header: React.FC<{ onSearch: (value: string) => void }> = ({ onSearch }) => (
  <header className="header">
    <div className="header-logo">Guitar Hero</div>
    <nav className="menu">
      <a className="active" href="#">Álbuns</a>
    </nav>
    <input type="search" placeholder="Buscar música..."  onChange={e => onSearch(e.target.value)}/>
  </header>
);

export default Header;