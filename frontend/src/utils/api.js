class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  };

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  };

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
      credentials: "include"
    })
    .then(this._checkResponse)
  };  
  
  getUserInfoApi() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: "include"
    })
    .then(this._checkResponse);
  };

  setUserInfoApi(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })  
    .then(this._checkResponse);
  };

  setUserAvatarApi(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then(this._checkResponse);
  };

  postCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._checkResponse);
  };

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: "include"
    })
    .then(this._checkResponse);
  };

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: this._headers,
      credentials: "include"
    })
    .then(this._checkResponse);
  };

  getInitialData() {
    return Promise.all([this.getUserInfoApi(), this.getInitialCards()])
  };
}

const api = new Api({
  url: 'https://api.backmestoproject.kiro.nomorepartiesxyz.ru',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
