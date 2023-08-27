import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register({ onRegister, isLoggedIn }) {
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
    onRegister(email, password);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="auth__form"
      noValidate
      name="register"
    >
      <h2 className='auth__title'>Регистрация</h2>
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
      <button type="submit" className="auth__button">Зарегистрироваться</button>
      <p className="auth__text">Уже зарегистрированы?{' '}
        <Link to="/sign-in" className="auth__link">Войти</Link>
      </p>
    </form>
  );
}
