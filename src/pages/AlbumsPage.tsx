import React, { useState, useEffect, useRef } from 'react';
import useAlbums from '../hooks/useAlbums';
import AlbumCard from '../components/AlbumCard';
import AlbumDetails from '../components/AlbumDetails';
import { Album } from '../types/Album';

interface AlbumsPageProps {
  search: string;
}

const AlbumsPage: React.FC<AlbumsPageProps> = ({ search }) => {
  const { albums, loading, error } = useAlbums();
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  function normalize(str: string) {
  return str
    .normalize('NFD') // separa acentos das letras
    .replace(/[\u0300-\u036f]/g, '') // remove acentos
    .replace(/[^a-zA-Z0-9 ]/g, '') // remove caracteres especiais
    .toLowerCase();
}

  // Filtra álbuns que possuem pelo menos uma música que bate com o filtro
const filteredAlbums = albums
  .map(album => ({
    ...album,
    tracks: album.tracks.filter(track =>
      normalize(track.title).includes(normalize(search)) ||
      normalize(track.artist).includes(normalize(search))
    )
  }))
  .filter(album => album.tracks.length > 0);

  // Sempre mantenha selectedAlbum como referência ao álbum original
  useEffect(() => {
    if (filteredAlbums.length === 0) {
      setSelectedAlbum(null);
    } else if (!selectedAlbum || !filteredAlbums.some(a => a.id === selectedAlbum.id)) {
      setSelectedAlbum(filteredAlbums[0]);
    }
  }, [search, albums]);

  // Encontre o álbum original pelo ID
  const originalSelectedAlbum = albums.find(a => a.id === selectedAlbum?.id) || null;

  // Calcule as músicas filtradas
const filteredTracks = originalSelectedAlbum
  ? originalSelectedAlbum.tracks.filter(track =>
      normalize(track.title).includes(normalize(search)) ||
      normalize(track.artist).includes(normalize(search))
    )
  : [];


    //processo Mobile
      
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
const detailsRef = useRef<HTMLDivElement>(null);
const [albumChosen, setAlbumChosen] = useState(false);

useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth <= 600);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

useEffect(() => {
  if (isMobile && selectedAlbum && detailsRef.current && albumChosen) {
    detailsRef.current.scrollIntoView({ behavior: 'smooth' });
  }
}, [selectedAlbum, isMobile, albumChosen]);

if (loading) return <div>Loading...</div>;
if (error) return <div>Error loading albums: {error}</div>;

if (isMobile) {
  // Layout mobile: detalhes abaixo dos álbuns
  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ color: '#fff', marginBottom: 16 }}>🎸 TODOS OS ÁLBUNS</h2>
      <div className="album-grid">
        {filteredAlbums.map(album => (
          <AlbumCard
            key={album.id}
            album={album}
            selected={selectedAlbum?.id === album.id}
            onClick={() => {
    setSelectedAlbum(album);
    setAlbumChosen(true);
  }}
          />
        ))}
      </div>
      <div ref={detailsRef}>
        {originalSelectedAlbum && (
          <AlbumDetails album={originalSelectedAlbum} tracks={filteredTracks} />
        )}
        {!originalSelectedAlbum && <div style={{ color: '#fff' }}>Nenhuma música encontrada.</div>}
      </div>
    </div>
  );
}

// Layout desktop: lado a lado
return (
  <div style={{ display: 'flex', height: 'calc(100vh - 100px)' }}>
    <div style={{ width: 600, padding: 24, overflowY: 'auto', background: '#18191a' }}>
      <h2 style={{ color: '#fff', marginBottom: 16 }}>🎸 TODOS OS ÁLBUNS</h2>
      <div className="album-grid">
        {filteredAlbums.map(album => (
          <AlbumCard
            key={album.id}
            album={album}
            selected={selectedAlbum?.id === album.id}
            onClick={() => setSelectedAlbum(album)}
          />
        ))}
      </div>
    </div>
    <div style={{ flex: 1, padding: 32, overflowY: 'auto', background: '#1a1a1a' }}>
      {originalSelectedAlbum && (
        <AlbumDetails album={originalSelectedAlbum} tracks={filteredTracks} />
      )}
      {!originalSelectedAlbum && <div style={{ color: '#fff' }}>Nenhuma música encontrada.</div>}
    </div>
  </div>
);
};

export default AlbumsPage;