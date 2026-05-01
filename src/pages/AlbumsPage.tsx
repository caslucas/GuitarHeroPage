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
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .toLowerCase();
  }

  const filteredAlbums = albums
    .map(album => ({
      ...album,
      tracks: album.tracks.filter(track =>
        normalize(track.title).includes(normalize(search)) ||
        normalize(track.artist).includes(normalize(search))
      )
    }))
    .filter(album => album.tracks.length > 0);

  useEffect(() => {
    if (filteredAlbums.length === 0) {
      setSelectedAlbum(null);
    } else if (!selectedAlbum || !filteredAlbums.some(a => a.id === selectedAlbum.id)) {
      setSelectedAlbum(filteredAlbums[0]);
    }
  }, [search, albums]);

  const originalSelectedAlbum = albums.find(a => a.id === selectedAlbum?.id) || null;
const totalMusicas = filteredAlbums.reduce((acc, album) => acc + album.tracks.length, 0);

  const filteredTracks = originalSelectedAlbum
    ? originalSelectedAlbum.tracks.filter(track =>
        normalize(track.title).includes(normalize(search)) ||
        normalize(track.artist).includes(normalize(search))
      )
    : [];

  // Responsividade e refs
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const detailsRef = useRef<HTMLDivElement>(null);
  const [albumChosen, setAlbumChosen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  // Ref para o container desktop
  const desktopListRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleScroll = () => {
      if (isMobile) {
        // Mobile: scroll da janela
        if (tableRef.current) {
          const rect = tableRef.current.getBoundingClientRect();
          setShowScrollTop(rect.top < 0);
        }
      } else {
        // Desktop: scroll do container
        if (desktopListRef.current) {
          setShowScrollTop(desktopListRef.current.scrollTop > 100);
        }
      }
    };

    if (isMobile) {
      window.addEventListener('scroll', handleScroll);
    } else if (desktopListRef.current) {
      desktopListRef.current.addEventListener('scroll', handleScroll);
    }
    handleScroll();

    return () => {
      if (isMobile) {
        window.removeEventListener('scroll', handleScroll);
      } else if (desktopListRef.current) {
        desktopListRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isMobile]);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading albums: {error}</div>;

  // --- MOBILE ---
  if (isMobile) {
    return (
      <div style={{ padding: 16 }}>
        <h2 style={{ color: '#fff', marginBottom: 16 }}>🎸 TODOS OS ÁLBUNS ({filteredAlbums.length}) </h2>
        <div style={{
  color: '#ffb300',
  fontWeight: 'bold',
  marginBottom: 16
}}>
  🎵 Total de músicas: {totalMusicas}</div>
        <div ref={tableRef} className="album-grid">
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
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              position: 'fixed',
              right: 20,
              bottom: 32,
              zIndex: 1000,
              background: 'rgba(0,0,0,0.7)',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: 48,
              height: 48,
              boxShadow: '0 2px 8px #0006',
              fontSize: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'opacity 0.2s'
            }}
            aria-label="Voltar ao topo"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255, 179, 0, 0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </button>
        )}
      </div>
    );
  }

  // --- DESKTOP ---
  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 100px)' }}>
      <div
        
        style={{ width: 600, padding: 24, overflowY: 'auto', background: '#18191a' }}
      >
        <h2 style={{ color: '#fff', marginBottom: 16 }}>🎸 TODOS OS ÁLBUNS ({filteredAlbums.length})</h2>
                <div style={{
  color: '#ffb300',
  fontWeight: 'bold',
  marginBottom: 16
}}>
  🎵 Total de músicas: {totalMusicas}</div>
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
      <div ref={desktopListRef} style={{ flex: 1, padding: 32, overflowY: 'auto', background: '#1a1a1a' }}>
        {originalSelectedAlbum && (
          <AlbumDetails album={originalSelectedAlbum} tracks={filteredTracks} />
        )}
        {!originalSelectedAlbum && <div style={{ color: '#fff' }}>Nenhuma música encontrada.</div>}
      </div>
      {showScrollTop && (
        <button
          onClick={() => {
            if (desktopListRef.current) {
              desktopListRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          style={{
            position: 'fixed',
            right: 20,
            bottom: 32,
            zIndex: 1000,
            background: 'rgba(0,0,0,0.7)',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: 48,
            height: 48,
            boxShadow: '0 2px 8px #0006',
            fontSize: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'opacity 0.2s'
          }}
          aria-label="Voltar ao topo"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255, 179, 0, 0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default AlbumsPage;