import './login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { createUser } from '../../services/userAPI';
import LoadingPage from '../loadingPage/LoadingPage';
import { handleSubmit } from '../../services/handleSubmits';

function Login() {
  const [login, setLogin] = useState({ name: '' });
  const [loading, setLoading] = useState(false);
  const redirect = useNavigate();

  const minSize = login.name.length >= 3;

  const handleCreateUser = async () => {
    setLoading(true);

    await createUser(login);

    setLoading(false);

    redirect('/search');
  };

  return (
    <>
      {loading === false && (
        <div className="form-container">
          <img src={ logo } alt="logo" />
          <form action="enter" onSubmit={ handleSubmit }>
            <div className="input-container">
              <input
                placeholder="Qual é o seu nome?"
                data-testid="login-name-input"
                type="text"
                id="login"
                onChange={ (event) => {
                  setLogin({ name: event.target.value });
                } }
                value={ login.name }
              />
            </div>

            <div className="button-container">
              <button
                data-testid="login-submit-button"
                disabled={ !minSize }
                onClick={ handleCreateUser }
              >
                ENTRAR
              </button>
            </div>
          </form>
        </div>
      )}

      {loading === true && (
        <div className="loading-containder-login">
          <LoadingPage />
        </div>
      )}
    </>
  );
}

export default Login;
