import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register ({ onRegister }) {
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
    onRegister(userData);
  }
  
  return (
    <section className='auth'>
      <h2 className='auth__title'>Регистрация</h2>
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
          Зарегистрироваться
        </button>
        <p className='auth__signup-text'>Уже зарегистрированы?
          <Link to="/sign-in" className="auth__signup-link">
            Войти
          </Link>
        </p>
      </form>   
    </section>
  );
}

export default Register;