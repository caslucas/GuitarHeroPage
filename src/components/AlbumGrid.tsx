import React from 'react';
import AlbumCard from './AlbumCard';
import { Album } from '../types/Album';

interface AlbumGridProps {
  albums: Album[];
}

const AlbumGrid: React.FC<AlbumGridProps> = ({ albums }) => {
  return (
    <div className="album-grid">
      {albums.map(album => (
        <AlbumCard key={album.id} album={album} />
      ))}
    </div>
  );
};

export default AlbumGrid;