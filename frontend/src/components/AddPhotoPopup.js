import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPhotoPopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setName('');
    setLink('');
  }, [onClose]);

  function handleAddPlaceName(evt) {
    setName(evt.target.value);
  }

  function handleAddPlaceLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({ name, link });
    onClose();
  }

  return (
    <PopupWithForm
      name="add-photo"
      title="Новое место"
      popupTitle="popup__title"
      container="container"
      isOpen={isOpen}
      onClose={onClose}
      button={isLoading ? 'Сохранение...' : 'Создать'}
      onSubmit={handleSubmit}
    >
      <label className="form__label">
        <input
          className="form__input form__input_photo-title"
          type="text"
          name="title"
          id="title"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          value={name}
          onChange={handleAddPlaceName}
          required
        />
        <span className="error title-error"></span>
      </label>
      <label className="form__label">
        <input
          className="form__input form__input_photo-link"
          type="url"
          name="link"
          id="link"
          placeholder="Ссылка на картинку"
          value={link}
          onChange={handleAddPlaceLink}
          required
        />
        <span className="error link-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPhotoPopup;
