import React, { useState } from 'react';
import useAlbums from '../hooks/useAlbums';
import AlbumCard from '../components/AlbumCard';
import AlbumDetails from '../components/AlbumDetails';

const AlbumsPage: React.FC = () => {
  const { albums, loading, error } = useAlbums();
  const [selectedAlbum, setSelectedAlbum] = useState(albums[0] || null);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading albums: {error}</div>;

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 100px)' }}>
      {/* Coluna da esquerda: grid de álbuns */}
      <div style={{ width: 400, padding: 24, overflowY: 'auto', background: '#18191a' }}>
        <h2 style={{ color: '#fff', marginBottom: 16 }}>🎸 TODOS OS ÁLBUNS</h2>
        <div className="album-grid">
          {albums.map(album => (
            <AlbumCard
              key={album.id}
              album={album}
              selected={selectedAlbum?.id === album.id}
              onClick={() => setSelectedAlbum(album)}
            />
          ))}
        </div>
      </div>
      {/* Coluna da direita: detalhes do álbum */}
      <div style={{ flex: 1, padding: 32, overflowY: 'auto', background: '#1a1a1a' }}>
        {selectedAlbum && (
  <AlbumDetails album={selectedAlbum} tracks={selectedAlbum.tracks} />
)}
      </div>
    </div>
  );
};

export default AlbumsPage;