import './search.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { handleSubmit } from '../../services/handleSubmits';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import LoadingPage from '../loadingPage/LoadingPage';
import { AlbumType } from '../../types';

function Search() {
  const [loading, setLoading] = useState(false);
  const [createList, setCreateList] = useState(false);
  const [inputInfo, setInputInfo] = useState('');
  const [currentArtist, setCurrentArtist] = useState('');
  const [albumsList, setAlbumsList] = useState<AlbumType[]>([]);

  const minSize = inputInfo.length >= 2;

  const handleSearch = async () => {
    setLoading(true);

    await searchAlbumsAPI(inputInfo);

    const result = await searchAlbumsAPI(inputInfo);

    setLoading(false);
    setCurrentArtist(inputInfo);
    setAlbumsList(result);
    setCreateList(true);
    setInputInfo('');

    return result;
  };

  return (
    <div>
      <div className="search-container">
        <form action="search" onSubmit={ handleSubmit }>
          <input
            data-testid="search-artist-input"
            placeholder="Nome do artista ou banda"
            type="text"
            id="search-bar"
            onChange={ (event) => setInputInfo(event.target.value) }
            value={ inputInfo }
          />

          <button
            data-testid="search-artist-button"
            disabled={ !minSize }
            onClick={ handleSearch }
          >
            Pesquisar
          </button>
        </form>
      </div>

      {loading === true && (
        <div className="loading-containder-search">
          <LoadingPage />
        </div>
      )}

      {createList === true && albumsList.length === 0 && (
        <h1 className="search-title">Nenhum álbum foi encontrado</h1>
      )}

      {createList === true && albumsList.length > 0 && (
        <h1 className="search-title">{`Resultado de álbuns de ${currentArtist}`}</h1>
      )}

      {createList === true && albumsList.length > 0 && (
        <ul className="list-container">
          {albumsList.map((album) => (
            <div className="music-album" key={ album.collectionId }>
              <img src={ album.artworkUrl100 } alt="" />
              <p>{album.collectionName}</p>
              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                Album
              </Link>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
