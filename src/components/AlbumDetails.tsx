import React from 'react';
import { Album, Track } from '../types/Album'; // Importe Track também

interface AlbumDetailsProps {
  album: Album;
  tracks: Track[]; // Use Track[] aqui
}

const AlbumDetails: React.FC<AlbumDetailsProps> = ({ album, tracks }) => {
  const year = album.releaseDate ? new Date(album.releaseDate).getFullYear() : '';
  const formatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  return (
    <div className="album-details">
      <div>
        <img src={album.coverImage} alt={album.title} />
      </div>
      <div style={{ marginLeft: 32 }}>
        <h2>{album.title} <span style={{ color: '#bbb' }}>({year})</span></h2>
        <p><b>Plataforma:</b> {album.platform}</p>
        <p><b>Lançamento:</b> {formatter.format(new Date(album.releaseDate))}</p>
        <p>{album.description}</p>
        <h3 style={{ marginTop: 24 }}>🎵 MÚSICAS DO ÁLBUM</h3>
        <div style={{ marginTop: -23, color: '#ffb300', marginLeft: 'auto', width: 'fit-content' }}>
          <b>🎸 Total de músicas: {tracks.length}</b>
        </div>
        <table className="track-list">
          <thead>
            <tr>
              <th>#</th>
              <th>MÚSICA</th>
              <th>ARTISTA</th>
              <th>ANO</th>
              <th>VERSÃO</th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((track: Track) => (
              <tr key={track.number}>
                <td>{track.number}</td>
                <td>{track.title}</td>
                <td>{track.artist}</td>
                <td>{track.ano}</td>
                <td>{track.versao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlbumDetails;