export const settings = {
  inputSelector: '.form__input',
  submitButtonSelector: '.button-submit',
  inactiveButtonClass: 'button-submit_disabled',
  createProfile: 'button-submit_edit-profile',
  createCardButton: 'button-submit_add-photo',
  inputErrorClass: 'form__input-error',
  errorClass: 'error_active',
  errorSpanPostfix: '-error',
};

export const profileForm = document.forms.profile;
export const photoForm = document.forms.formAddPhoto;
export const deleteForm = document.forms.formDeleteCard;
export const avatarForm = document.forms.formEditAvatar;

export const editPopupButton = document.querySelector('.button-edit');
export const addPopupButton = document.querySelector('.button-add');
export const avatarPopupButton = document.querySelector('.avatar');
