import React, { useState } from 'react';
import Header from './components/Header';
import AlbumsPage from './pages/AlbumsPage';
import './styles/global.css';
import SongFilter from './components/SongFilter';

const App: React.FC = () => {
  const [search, setSearch] = useState('');
  return(
    <>

    <Header onSearch={setSearch} />
    <AlbumsPage search={search} />
  </>
);
};
export default App;