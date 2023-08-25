import React from 'react';

function FormSign({ handleChange, formValue, handleSubmit, button }) {
  return (
    <>
      <form onSubmit={handleSubmit} className="auth-form__form">
        <input
          className="auth-form__form-input"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          minLength="5"
          maxLength="64"
          value={formValue.email}
          onChange={handleChange}
          required
        />
        <input
          className="auth-form__form-input"
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          minLength="3"
          maxLength="20"
          value={formValue.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="button-submit-auth">
          {button}
        </button>
      </form>
    </>
  );
}

export default FormSign;
