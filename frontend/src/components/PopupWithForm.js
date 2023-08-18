import React from 'react';

function PopupWithForm({
  name,
  title,
  card,
  popupTitle,
  container,
  isOpen,
  onClose,
  button,
  children,
  onSubmit,
}) {
  return (
    <section className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className={`popup__${container}`}>
        <button
          className={`button-close button-close_${name}`}
          type="button"
          form={`${name}`}
          onClick={onClose}
        ></button>

        <form
          className={`form form_${name}`}
          name={`${name}`}
          id={`${name}`}
          onSubmit={onSubmit}
          card={card}
        >
          <h2 className={popupTitle}>{title}</h2>
          {children}
          <button
            className={`button-submit button-submit_${name}`}
            type="submit"
            form={`${name}`}
          >
            {button}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
