import React from 'react';

function ImagePopup({ onClose, card }) {
  return (
    <section
      className={`popup popup_zoom ${card && 'popup_opened'}`}
      aria-label="Всплывающее окно увеличения фото карточки(места)"
    >
      <div className="popup__zoom-container">
        <button
          className="button-close button-close_zoom"
          type="button"
          onClick={onClose}
        ></button>
        <figure className="popup__zoom-photo">
          <img className="popup__photo" src={card?.link} alt={card?.name} />
          <figcaption className="popup__zoom-title">
            <p className="popup__photo-title">{card?.name}</p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export default ImagePopup;
