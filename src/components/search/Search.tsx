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
      <form action="search" onSubmit={ handleSubmit }>
        <div>
          <label htmlFor="search-bar">Nome do artista ou banda</label>
          <input
            data-testid="search-artist-input"
            type="text"
            id="search-bar"
            onChange={ (event) => setInputInfo(event.target.value) }
            value={ inputInfo }
          />
        </div>

        <button
          data-testid="search-artist-button"
          disabled={ !minSize }
          onClick={ handleSearch }
        >
          Pesquisar
        </button>
      </form>

      {loading === true && (<LoadingPage />)}

      {createList === true && albumsList.length === 0 && (
        <h1>Nenhum álbum foi encontrado</h1>
      )}

      {createList === true && albumsList.length > 0 && (
        <h1>{`Resultado de álbuns de: ${currentArtist}`}</h1>
      )}

      {createList === true && albumsList.length > 0 && (
        <ul>
          {albumsList.map((album) => (
            <li key={ album.collectionId }>
              {album.collectionName}
              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                Album
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
