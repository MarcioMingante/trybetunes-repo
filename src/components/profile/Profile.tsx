import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import LoadingPage from '../loadingPage/LoadingPage';

function Profile() {
  const [userInfo, setUserInfo] = useState({});
  const [loadingPage, setLoadingPage] = useState(false);

  useEffect(() => {
    const handleApi = async () => {
      setLoadingPage(true);

      const result = await getUser();

      setUserInfo(result);
      setLoadingPage(false);
    };

    handleApi();
  }, []);

  return (
    <div>
      {loadingPage === true && (
        <LoadingPage />
      )}

      {loadingPage === false && (
        <div>
          <div>
            <h2>Nome</h2>
            <p>{userInfo.name}</p>
          </div>
          <div>
            <h2>Email</h2>
            <p>{userInfo.email}</p>
          </div>
          <div>
            <h2>Descrição</h2>
            <p>{userInfo.description}</p>
          </div>

          <img src={ userInfo.image } alt="user" data-testid="profile-image" />

          <Link to="/profile/edit">Editar perfil</Link>
        </div>
      )}
    </div>
  );
}

export default Profile;
