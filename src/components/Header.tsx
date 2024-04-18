import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import LoadingPage from './LoadingPage';

function Header() {
  const [userName, setUserName] = useState('');
  const [loadingPage, setLoadingPage] = useState(false);

  useEffect(() => {
    const handleUserName = async () => {
      setLoadingPage(true);

      const result = await getUser();

      setLoadingPage(false);

      return setUserName(result.name);
    };

    handleUserName();
  }, []);

  return (
    <header data-testid="header-component">
      <NavLink to="/search" data-testid="link-to-search">Pesquisar</NavLink>
      <NavLink to="/favorites" data-testid="link-to-favorites">Favoritos</NavLink>
      <NavLink to="/profile" data-testid="link-to-profile">Perfil</NavLink>
      <h2 data-testid="header-user-name">
        {loadingPage === true && <LoadingPage />}
        {loadingPage === false && userName}
      </h2>
    </header>
  );
}

export default Header;
