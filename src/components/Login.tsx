import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import LoadingPage from './LoadingPage';
import { handleSubmit } from '../services/handleSubmits';

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
      {loading === true && (<LoadingPage />)}

      <div className="form-container">
        <form action="enter" onSubmit={ handleSubmit }>
          <div>
            <label htmlFor="login">Nome de usuario</label>
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

          <button
            data-testid="login-submit-button"
            disabled={ !minSize }
            onClick={ handleCreateUser }
          >
            ENTRAR
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
