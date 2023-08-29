class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Код ошибки: ${res.status}`);
    }
  }

  _loadToken() {
    this._headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`
  }

  async getInitialCards() {
    this._loadToken();
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    });
    return this._checkResponse(res);
  }

  async getProfileInfo() {
    this._loadToken();
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    });
    return this._checkResponse(res);
  }

  async editMyProfile({ name, about }) {
    this._loadToken();
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
    return this._checkResponse(res);
  }

  async addPhoto({ name, link }) {
    this._loadToken();
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      }),
    });
    return this._checkResponse(res);
  }

  async changeLike(cardId, isLiked) {
    this._loadToken();
    const res = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      credentials: 'include',
      headers: this._headers,
    });
    return this._checkResponse(res);
  }

  async deleteCard(cardId) {
    this._loadToken();
    const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    });
    return this._checkResponse(res);
  }

  async editMyAvatar(data) {
    this._loadToken();
    const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ avatar: data.avatar }),
    });
    return this._checkResponse(res);
  }
}

const api = new Api({
  baseUrl: 'https://api.mesto.hope-208.nomoreparties.co',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export default api;
