import { useEffect, useState } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from './MusicCard';
import { SongType } from '../types';

function Favorites() {
  const [musics, setMusics] = useState<SongType[]>([]);

  useEffect(() => {
    const handleFavoriteList = async () => {
      const result = await getFavoriteSongs();

      setMusics(result);
    };

    console.log('xablau');

    handleFavoriteList();
  }, []);

  return (
    <div>
      {musics.map((music) => (
        <MusicCard
          musicsData={ music }
          key={ music.trackId }
        />
      ))}
    </div>
  );
}

export default Favorites;
