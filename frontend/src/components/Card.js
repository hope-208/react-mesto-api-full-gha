import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = (card.owner?._id || card.owner) === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);  

  const cardLikeButtonClassName = `button-like ${
    (isLiked && 'button-like_active') || ''}`;

  const cardDeleteButtonClassName = `button-delete ${
    isOwn ? 'button-delete_active' : ''
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="element">
      {isOwn && (
        <button
          className={cardDeleteButtonClassName}
          type="button"
          name="delete"
          onClick={handleDeleteClick}
        />
      )}
      <img
        className="element__cover"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="element__caption">
        <h2 className="element__title">{card.name}</h2>
        <div>
          <button
            className={cardLikeButtonClassName}
            type="button"
            name="like"
            onClick={handleLikeClick}
          ></button>
          <p className="element__like-count">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
