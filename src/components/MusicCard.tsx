import { useState } from 'react';
import { SongType } from '../types';
import checkedHeart from '../images/checked_heart.png';
import emptyHeart from '../images/empty_heart.png';

type Props = {
  musicsData: SongType
};

function MusicCard({ musicsData: { trackName, previewUrl, trackId } }: Props) {
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    const current = checked;

    current === true ? setChecked(false) : setChecked(true);
  };

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
          onClick={ handleClick }
          type="checkbox"
          id={ `favorite-${trackId}` }
          alt=" favorite"
        />
      </div>
    </div>
  );
}

export default MusicCard;
