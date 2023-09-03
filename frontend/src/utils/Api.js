class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this._headers = options.headers;
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
        authorization: `Bearer ${localStorage.getItem('JWT')}`,
        // Accept: "*/*"
      },
    }).then(this._checkResponse);
  }

  // добавление карточки
  createCard(newCard) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers:  {
        "Content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem('JWT')}`,
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
        authorization: `Bearer ${localStorage.getItem('JWT')}`,
      },
    }).then(this._checkResponse);
  }

  // данные профиля
  getUserInfo() {
//    const token = localStorage.getItem('JWT')
//    console.log(token)
    return fetch(`${this.baseUrl}/users/me`, {
      headers:  {
        authorization: `Bearer ${localStorage.getItem('JWT')}`,
        Accept: "*/*"
      },
    }).then(this._checkResponse);
  }

  // редактирование данных профиля
  setUserInfo(item) {
    console.log(item) // приходят указанные данные
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers:  {
        "Content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem('JWT')}`
      },
      body: JSON.stringify({
        name: item.name,
        about: item.about,
      }),
    }).then(this._checkResponse);
  }

  // лайк
  likeCard(id) {
    const token = localStorage.getItem('JWT')
    console.log(token)
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers:  {
        authorization: `Bearer ${localStorage.getItem('JWT')}`,
      },
    }).then(this._checkResponse);
  }

  dislikeCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers:  {
        authorization: `Bearer ${localStorage.getItem('JWT')}`,
      },
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
        "Content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem('JWT')}`,
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkResponse);
  }
}

export const api = new Api({
  baseUrl: "https://api.domainname.students.nomoredomainsicu.ru",
  // baseUrl: '//localhost:3001',
  headers: {
    "Content-type": "application/json",
    // Authorization: `Bearer ${localStorage.getItem('JWT')}`,
  },
});
