import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header.js';
import FormSign from './FormSign.js';

const Login = ({ onSignIn, button }) => {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { password, email } = formValue;

    if (!password || !email) {
      return;
    }
    onSignIn(formValue);
  };

  return (
    <>
      <Header>
        <div className="header__nav">
          <Link to="/sign-up" className="header__link" replace>
            Регистрация
          </Link>
        </div>
      </Header>
      <div className="auth-form">
        <h1 className="auth-form__title">Вход</h1>
        <FormSign
          handleChange={handleChange}
          formValue={formValue}
          handleSubmit={handleSubmit}
          button={button}
        />
      </div>
    </>
  );
};

export default Login;
