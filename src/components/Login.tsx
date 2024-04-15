import { useState } from 'react';
import { createUser } from '../services/userAPI';
import LoadingPage from './LoadingPage';

function Login() {
  const [login, setLogin] = useState({ name: '' });
  const [loading, setLoading] = useState(false);

  const minSize = login.name.length >= 3;

  const handleCreateUser = async () => {
    setLoading(true);

    await createUser(login);

    setLoading(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      {loading === true && (<LoadingPage />)}

      <div className="form-container">
        <form action="add" onSubmit={ handleSubmit }>
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
