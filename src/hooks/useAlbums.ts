import { useEffect, useState } from 'react';
import { fetchAlbums } from '../services/api';
import { Album } from '../types/Album';

export default function useAlbums() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAlbums()
      .then(setAlbums)
      .catch(() => setError('Erro ao carregar álbuns'))
      .finally(() => setLoading(false));
  }, []);

  return { albums, loading, error };
}