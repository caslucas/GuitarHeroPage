import React from 'react';

interface Track {
  number: number;
  title: string;
  artist: string;
  duration: string;
}

interface TrackListProps {
  tracks: Track[];
}

const TrackList: React.FC<TrackListProps> = ({ tracks }) => (
  <table className="track-list">
    <thead>
      <tr>
        <th>#</th>
        <th>MÚSICA</th>
        <th>ARTISTA</th>
        <th>DURAÇÃO</th>
      </tr>
    </thead>
    <tbody>
      {tracks.map(track => (
        <tr key={track.number}>
          <td>{track.number}</td>
          <td>{track.title}</td>
          <td>{track.artist}</td>
          <td>{track.duration}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default TrackList;