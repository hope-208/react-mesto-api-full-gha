import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FormSign from './FormSign.js';

import Header from './Header.js';
const Register = ({ onSignUp, button }) => {
  const [formValue, setFormValue] = useState({
    password: '',
    email: '',
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
    const data = { password: formValue.password, email: formValue.email };
    onSignUp(data);
  };

  return (
    <>
      <Header>
        <div className="header__nav">
          <Link to="/sign-in" className="header__link" replace>
            Войти
          </Link>
        </div>
      </Header>
      <div className="auth-form">
        <h1 className="auth-form__title">Регистрация</h1>
        <FormSign
          handleChange={handleChange}
          formValue={formValue}
          handleSubmit={handleSubmit}
          button={button}
        />
        <p className="auth-form__signin">
          Уже зарегистрированы?<span> </span>
          <Link to="/sign-in" className="auth-form__login-link" replace>
            Войти
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
