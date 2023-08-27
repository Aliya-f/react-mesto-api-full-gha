import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ onAuth, isLoggedIn }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassw(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAuth(email, password);
  }

  return (
    <form onSubmit={handleSubmit} className="auth__form" noValidate>
      <h2 className="auth__title">Вход</h2>
      <input
        name='Email'
        type='email'
        className='auth__input'
        id='email'
        placeholder='Email'
        minLength='6'
        maxLength='100'
        required
        value={email}
        onChange={handleChangeEmail}
      />
      <input
        name='Password'
        type='password'
        className='auth__input'
        id='password'
        placeholder='Пароль'
        minLength='6'
        maxLength='40'
        required
        value={password}
        onChange={handleChangePassw}
      />
      <button type="submit" className="auth__button">Войти</button>
    </form>
  );
}
