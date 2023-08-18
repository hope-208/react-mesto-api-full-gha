import React from 'react';

function InfoTooltip({ title, src, isOpen, onClose }) {
  return (
    <section className={`popup popup_info ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          className="button-close"
          type="button"
          onClick={onClose}
        ></button>
        <div className="popup__info-container">
          <img className="popup__icon" src={src} alt="Статус регистрации." />
          <h2 className="popup__title-info">{title}</h2>
        </div>
      </div>
    </section>
  );
}

export default InfoTooltip;
