export interface Track {
  number: number;
  title: string;
  artist: string;
 // duration: string;
  ano: string;
  versao: string;

}

export interface Album {
  id: string;
  title: string;
  year?: number; // Opcional, pois você pode extrair de releaseDate
  coverImage: string;
  platform: string;
  releaseDate: string;
  description: string;
  tracks: Track[];
}