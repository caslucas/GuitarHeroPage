import React from 'react';
import { Album } from '../types/Album';

interface AlbumCardProps {
  album: Album;
  selected?: boolean;
  onClick?: () => void;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album, selected, onClick }) => {
  const year = album.releaseDate ? new Date(album.releaseDate).getFullYear() : '';
  return (
    <div
      className={`album-card${selected ? ' selected' : ''}`}
      onClick={onClick}>
      <img src={album.coverImage} alt={album.title} />
      <h3>{album.title}</h3>
      <p>{year}</p>
    </div>
  );
};

export default AlbumCard;