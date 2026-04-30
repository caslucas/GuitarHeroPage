
import React, { useState } from 'react';

interface SongFilterProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}
const SongFilter: React.FC<SongFilterProps> = ({ searchTerm, setSearchTerm }) => (

    <header className="header">
      <div className="header-logo">Guitar Hero</div>
      <nav className="menu">
        <a className="active" href="#">Álbuns</a>
      </nav>
      <input
        type="search"
        placeholder="Buscar música..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </header>
);

export default SongFilter;