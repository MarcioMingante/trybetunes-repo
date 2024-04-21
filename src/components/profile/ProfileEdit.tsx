import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../../services/userAPI';
import LoadingPage from '../loadingPage/LoadingPage';
import { UserType } from '../../types';

function ProfileEdit() {
  const redirect = useNavigate();
  const [loadingPage, setLoadingPage] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [newUserInfo, setNewUserInfo] = useState<UserType>({
    name: '',
    email: '',
    image: '',
    description: '',
  });

  useEffect(() => {
    const handelApi = async () => {
      setLoadingPage(true);

      const result = await getUser();

      setUserName(result.name);
      setEmail(result.email);
      setDescription(result.description);
      setImage(result.image);

      setLoadingPage(false);
    };

    handelApi();
  }, []);

  const mailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{3,4}$/;

  const validateInfo = !userName
  || !mailRegex.test(email)
  || !description
  || !image;

  const handleChange = () => {
    setNewUserInfo({
      name: userName,
      email,
      description,
      image,
    });
  };

  const specificHandleSUbmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoadingPage(true);

    await updateUser(newUserInfo);

    setLoadingPage(false);

    redirect('/profile');
  };

  return (
    <>
      {loadingPage === true && (
        <LoadingPage />
      )}
      <div>
        <form action="add" onSubmit={ specificHandleSUbmit }>
          <div>
            <label htmlFor="name">Nome de usuario</label>
            <input
              data-testid="edit-input-name"
              type="text"
              id="name"
              onChange={ (event) => {
                setUserName(event.target.value);
              } }
              value={ userName }
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              data-testid="edit-input-email"
              type="text"
              id="email"
              onChange={ (event) => {
                setEmail(event.target.value);
              } }
              value={ email }
            />
          </div>

          <div>
            <label htmlFor="description">Descrião</label>
            <input
              data-testid="edit-input-description"
              type="text"
              id="description"
              onChange={ (event) => {
                setDescription(event.target.value);
              } }
              value={ description }
            />
          </div>

          <div>
            <label htmlFor="image">Foto de perfil</label>
            <input
              data-testid="edit-input-image"
              type="text"
              id="image"
              onChange={ (event) => {
                setImage(event.target.value);
              } }
              value={ image }
            />
          </div>

          <button
            data-testid="edit-button-save"
            type="submit"
            disabled={ validateInfo }
            onClick={ handleChange }
          >
            Salvar
          </button>
        </form>
      </div>

    </>
  );
}

export default ProfileEdit;
