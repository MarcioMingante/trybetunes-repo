import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../services/musicsAPI';
import LoadingPage from './LoadingPage';
import MusicCard from './MusicCard';
import { SongType } from '../types';

function Album() {
  const { id } = useParams();
  const [albumsList, setAlbumsList] = useState([]);
  const [songsList, setSongsList] = useState<SongType[]>([]);
  const [loadingPage, setLoadingPage] = useState(true);
  const [artist, setArtist] = useState('');
  const [collection, setCollection] = useState('');
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    const handleAPI = async () => {
      setLoadingPage(true);

      const result: any = await getMusics(String(id));

      setAlbumsList(result);

      setArtist(result[0].artistName);
      setCollection(result[0].collectionName);
      setLoadingPage(false);
      setShowList(true);
    };

    handleAPI();
  }, [id]);

  useEffect(() => {
    const handleAlbumsList = () => {
      const result = albumsList
        .filter((album: any) => album.kind === 'song')
        .map(({ trackName, previewUrl, trackId }) => ({
          trackId, trackName, previewUrl,
        }));

      return setSongsList(result);
    };

    handleAlbumsList();
  }, [albumsList]);

  return (
    <>
      {loadingPage === true && <LoadingPage />}

      {showList === true && (
        <div>
          <h2 data-testid="artist-name">{artist}</h2>
          <h2 data-testid="album-name">{collection}</h2>
          <div className="musics-list">
            {songsList.map((song) => (
              <MusicCard
                musicsData={ song }
                key={ song.trackId }
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Album;
