import { useEffect, useState } from 'react';
import { SongType } from '../types';
import checkedHeart from '../images/checked_heart.png';
import emptyHeart from '../images/empty_heart.png';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

type Props = {
  musicsData: SongType
};

function MusicCard(
  { musicsData: { trackName, previewUrl, trackId } }: Props,
) {
  const [checked, setChecked] = useState(false);
  const [storage, setStorage] = useState<SongType[]>([]);

  const handleClick = async () => {
    const current = checked;
    const songObj = {
      trackId,
      trackName,
      previewUrl,
    };

    if (current === true) {
      removeSong(songObj);
      return setChecked(false);
    }

    if (current === false) {
      addSong(songObj);
      return setChecked(true);
    }
  };

  useEffect(() => {
    const handleFavoriteSongs = async () => {
      const result = await getFavoriteSongs();

      setStorage(result);
    };
    const info = storage.map((current) => current.trackName);

    const handleChecked = () => {
      if (info.includes(trackName)) {
        return setChecked(true);
      }

      return setChecked(false);
    };

    handleFavoriteSongs();
    handleChecked();
  }, [storage]);

  return (
    <div>
      <h3>{trackName}</h3>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
      </audio>
      <div>
        <label
          data-testid={ `checkbox-music-${trackId}` }
          htmlFor={ `favorite-${trackId}` }
        >
          <img src={ checked === false ? emptyHeart : checkedHeart } alt="favorite" />
        </label>
        <input
          checked={ checked }
          onClick={ handleClick }
          type="checkbox"
          name={ trackName }
          id={ `favorite-${trackId}` }
          alt=" favorite"
        />
      </div>
    </div>
  );
}

export default MusicCard;
