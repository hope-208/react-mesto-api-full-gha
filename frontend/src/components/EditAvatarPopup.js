import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      popupTitle="popup__title"
      container="edit-avatar"
      isOpen={isOpen}
      onClose={onClose}
      button={isLoading ? 'Сохранение...' : 'Сохранить'}
      onSubmit={handleSubmit}
    >
      <label className="form__label">
        <input
          ref={inputRef}
          className="form__input form__input_edit-avatar"
          type="url"
          name="avatar"
          id="avatar"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="error avatar-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
