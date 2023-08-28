class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
    this._token = options.token;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // отрисовка карточек
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers:  {
        authorization: `Bearer ${this._token}`
      },
    }).then(this._checkResponse);
  }

  // добавление карточки
  createCard(newCard) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers:  {
        authorization: `Bearer ${this._token}`
      },
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link,
      }),
    }).then(this._checkResponse);
  }

  // удаление карточки
  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers:  {
        authorization: `Bearer ${this._token}`
      },
    }).then(this._checkResponse);
  }

  // редактирование данных профиля
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers:  {
        authorization: `Bearer ${this._token}`
      },
    }).then(this._checkResponse);
  }

  setUserInfo(item) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers:  {
        authorization: `Bearer ${this._token}`
      },
      body: JSON.stringify({
        name: item.name,
        about: item.about,
      }),
    }).then(this._checkResponse);
  }

  // лайк
  likeCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._token,
    }).then(this._checkResponse);
  }

  dislikeCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._token,
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(id, hasLike) {
    if (!hasLike) {
      return api.likeCard(id);
    }
    return api.dislikeCard(id);
  }

  // аватар
  setAvatar(data) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers:  {
        authorization: `Bearer ${this._token}`
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkResponse);
  }
}

export const api = new Api({
  baseUrl: "https://api.domainname.students.nomoredomainsicu.ru",
  headers: {
    "content-type": "application/json",
    token: null
    // authorization: "2043a062-45f6-4faf-829f-6adc32416166",
  },
});
