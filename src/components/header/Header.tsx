import './header.css';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo.svg';
import lupa from '../../images/Vector (3).svg';
import star from '../../images/🦆 icon _star empty_.svg';
import profile from '../../images/🦆 icon _profile_.svg';
import { getUser } from '../../services/userAPI';
import LoadingPage from '../loadingPage/LoadingPage';

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
      <img src={ logo } alt="" />

      <nav className="nav-container">
        <div>
          <img src={ lupa } alt="" />
          <NavLink to="/search" data-testid="link-to-search">Pesquisar</NavLink>
        </div>
        <div>
          <img src={ star } alt="" />
          <NavLink to="/favorites" data-testid="link-to-favorites">Favoritos</NavLink>
        </div>
        <div>
          <img src={ profile } alt="" />
          <NavLink to="/profile" data-testid="link-to-profile">Perfil</NavLink>
        </div>
      </nav>

      <h2 data-testid="header-user-name">
        {loadingPage === true && <LoadingPage />}
        {loadingPage === false && userName}
      </h2>
    </header>
  );
}

export default Header;
