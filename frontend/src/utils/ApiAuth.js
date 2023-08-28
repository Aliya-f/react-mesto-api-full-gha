class ApiAuth {
  constructor({baseUrl}) {
    this.baseUrl = baseUrl;
  }
  // проверка на ошибки
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } 
    return Promise.reject(`Ошибка ${res.status}`);
  }
  // проверка токена
  checkToken(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization : `Bearer ${token}`
      }
    }).then((res) => this._checkResponse(res));
  }
  // регистрация
  signUp({ email, password }) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"},
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then((res) => this._checkResponse(res));
  }
  // вход
  signIn({ email, password }) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"},
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then((res) => this._checkResponse(res));
  }
}

export const apiAuth = new ApiAuth({
  baseUrl: 'https://api.domainname.students.nomoredomainsicu.ru' ,
});