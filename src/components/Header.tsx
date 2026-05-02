import React, { useState, useEffect } from 'react';

const Header: React.FC<{ onSearch: (value: string) => void }> = ({ onSearch }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const [searchValue, setSearchValue] = useState(''); // <-- Adicione esta linha


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return (
      <header className="header-mobile">
    
        
      </header>
    );
  } else {
    return (
      <header className="header">
  

          <div className="search-bar">
          <span className="icon">🔍</span>
          <input
            type="search"
            placeholder="Buscar músicas ou artistas..."
            onChange={e => onSearch(e.target.value)}
          />
        </div>
      </header>
    );
  }
};

export default Header;