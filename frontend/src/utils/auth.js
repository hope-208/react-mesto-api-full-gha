export const BASE_URL = 'https://auth.nomoreparties.co';
//export const BASE_URL = https://api.mesto.hope-208.nomoreparties.co;

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`код ошибки: ${res.status}`);
}

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      //'Origin': 'mesto.hope-208.nomoreparties.co',
    },
    body: JSON.stringify({ password, email }),
  }).then((res) => checkResponse(res));
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({ password, email }),
  })
    .then((res) => checkResponse(res))
    .then((data) => {
      return data;
    });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => checkResponse(res))
    .then((data) => data);
};
