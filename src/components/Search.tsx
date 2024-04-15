function Search() {
  return (
    <div>
      <form action="">
        <div>
          <label htmlFor="search-bar">Nome do artista ou banda</label>
          <input
            data-testid="search-artist-input"
            type="text"
            id="search-bar"
          />
        </div>

        <button data-testid="search-artist-button">Pesquisar</button>
      </form>
    </div>
  );
}

export default Search;
