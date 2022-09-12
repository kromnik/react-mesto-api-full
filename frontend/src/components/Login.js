import { useState } from 'react';

function Login ({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e){
    e.preventDefault();
    const userData = {
      email,
      password
    }
    onLogin(userData);
  }
  
  return (
    <section className='auth'>
      <h2 className='auth__title'>Вход</h2>
      <form 
        className='auth__form'
        onSubmit={handleSubmit}
      >
        <input
          className='auth__form-input'
          type="email"
          name="email"
          required
          placeholder="Email"
          autoComplete="off"
          value={ email || ''}
          onChange={handleEmailChange}
        />
        <input
          className='auth__form-input'
          type="password"
          name="password"
          required
          placeholder="Пароль"
          autoComplete="off"
          value={ password || ''}
          onChange={handlePasswordChange}
        />
        <button
            className='auth__submit-button'
            type="submit"
        >
          Войти
        </button>
      </form>   
    </section>
  );
}

export default Login;