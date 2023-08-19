import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Header from './Header.js';
import Card from './Card.js';
import Footer from './Footer.js';

function Main({
  userEmail,
  onSignOut,
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <Header>
        <div className="header__nav">
          <p className="header__login">{userEmail}</p>
          <Link to="/sign-in" onClick={onSignOut} className="header__link">
            Выйти
          </Link>
        </div>
      </Header>
      <main className="container">
        <section className="profile">
          <div className="avatar" onClick={onEditAvatar}>
            <img
              className="avatar__image"
              src={currentUser.avatar}
              alt="Аватар"
            />
            <div className="avatar__overlay"></div>
          </div>
          <div className="profile__info">
            <div className="profile__content">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                className="button-edit"
                name="edit"
                type="button"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
          <button
            className="button-add"
            name="add"
            type="button"
            onClick={onAddPlace}
          ></button>
        </section>

        <section className="elements" aria-label="Записи в профиле">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Main;
