class Auth {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  };

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  };

  register(data) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ 
        email: data.email,
        password: data.password
      })
    })
    .then(this._checkResponse)
  };

  authorize(data) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({  
        email: data.email,
        password: data.password
      })
    })
    .then(this._checkResponse)
  };

  getContent() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: "include"
    })
    .then(this._checkResponse)
  };

  signOut() {
    return fetch(`${this._url}/signout`, {
      method: 'GET',
      credentials: "include"
    })
    .then(this._checkResponse)
  };
}

const auth = new Auth({
  baseUrl: 'https://api.backmestoproject.kiro.nomorepartiesxyz.ru',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default auth;
