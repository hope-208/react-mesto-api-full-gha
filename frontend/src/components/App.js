import React, { useEffect, useState, useCallback } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { register, authorize, checkToken } from '../utils/auth.js';
import api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import ProtectedRoute from './ProtectedRoute.js';
import Register from './Register.js';
import Login from './Login.js';
import Main from './Main.js';
import InfoTooltip from './InfoTooltip.js';
import successIcon from '../images/ok.svg';
import errorIcon from '../images/error.svg';
import PopupWithForm from './PopupWithForm.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import AddPhotoPopup from './AddPhotoPopup.js';
import ImagePopup from './ImagePopup.js';

const App = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(null);
  const [isRegisterSuccessPopupOpen, setIsRegisterSuccessPopupOpen] =
    useState(false);
  const [isRegisterErrorPopupClose, setIsRegisterErrorPopupClose] =
    useState(false);
  const [emailUser, setEmailUser] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [deleteCard, setDeleteCard] = useState(null);

  const checkIsToken = useCallback(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          const data = res.data;
          const userData = {
            _id: data._id,
            email: data.email,
          };
          if (res) {
            handleLogin();
            setEmailUser(userData.email);
            navigate('/', { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
          handleLogOut();
        });
    }
  }, []);

  useEffect(() => {
    api
      .getProfileInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });

    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    checkIsToken();
  }, []);

  useEffect(() => {
    function handleEsc(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }

    function handleClickOverlay(evt) {
      evt.target.classList.contains('popup_opened') && closeAllPopups();
    }

    document.addEventListener('keydown', handleEsc);
    document.addEventListener('mousedown', handleClickOverlay);
    return () => {
      document.removeEventListener('keydown', handleClickOverlay);
      document.removeEventListener('mousedown', handleEsc);
    };
  }, [
    isRegisterSuccessPopupOpen,
    isRegisterErrorPopupClose,
    isEditAvatarPopupOpen,
    isEditProfilePopupOpen,
    isDeletePopupOpen,
    isAddPlacePopupOpen,
  ]);

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleLogOut() {
    setLoggedIn(false);
  }
  function handleRegisterSuccess() {
    setIsRegisterSuccessPopupOpen(true);
  }

  function handleRegisterError() {
    setIsRegisterErrorPopupClose(true);
  }

  function handleSignUp(userData) {
    const { password, email } = userData;
    register(password, email)
      .then(() => {
        handleRegisterSuccess();
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        console.log(err);
        handleRegisterError();
      });
  }

  function handleSignIn(userData) {
    const { password, email } = userData;
    authorize(password, email)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        setEmailUser(userData.email);
        handleLogin();
        navigate('/', { replace: true });
      })

      .catch((err) => {
        console.log(err);
        handleLogOut();
      });
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    handleLogOut();
    navigate('/sign-in', { replace: true });
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleDeleteClick(card) {
    setDeletePopupOpen(true);
    setDeleteCard(card);
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    api
      .editMyProfile({ name, about })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);
    api
      .editMyAvatar({ avatar })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    setIsLoading(true);
    api
      .addPhoto({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardDelete(evt) {
    evt.preventDefault();
    setIsLoading(true);
    api
      .deleteCard(deleteCard._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== deleteCard._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
    setDeletePopupOpen(false);
    setDeleteCard(null);
    setIsRegisterSuccessPopupOpen(false);
    setIsRegisterErrorPopupClose(false);
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="/sign-up"
            element={<Register onSignUp={handleSignUp} />}
          />

          <Route
            path="/sign-in"
            element={
              <div>
                <Login onSignIn={handleSignIn} />
              </div>
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                element={Main}
                userEmail={emailUser}
                onSignOut={handleSignOut}
                cards={cards}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteClick}
              />
            }
          />
        </Routes>
        <CurrentUserContext.Provider value={currentUser}>
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
          <AddPhotoPopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />
          <ImagePopup onClose={closeAllPopups} card={selectedCard} />
          <PopupWithForm
            name="delete"
            title="Вы уверены?"
            card={deleteCard}
            popupTitle="popup__title-delete"
            container="delete-container"
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            button={isLoading ? 'Сохранение...' : 'Да'}
            onSubmit={handleCardDelete}
          ></PopupWithForm>
        </CurrentUserContext.Provider>

        <InfoTooltip
          title="Вы успешно зарегистрировались!"
          src={successIcon}
          isOpen={isRegisterSuccessPopupOpen}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          title="Что-то пошло не так!
Попробуйте ещё раз."
          src={errorIcon}
          isOpen={isRegisterErrorPopupClose}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </>
  );
};

export default App;
