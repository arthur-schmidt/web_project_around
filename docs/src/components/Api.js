export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _makeRequest(url, method = "GET", body = null) {
    const config = {
      method,
      headers: this.headers,
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    return fetch(url, config).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Erro: ${res.status}`);
    });
  }

  getUserInfo() {
    return this._makeRequest(`${this.baseUrl}/users/me`);
  }

  updateUserInfo(userData) {
    return this._makeRequest(`${this.baseUrl}/users/me`, "PATCH", {
      name: userData.name,
      about: userData.about,
    });
  }

  updateProfilePicture(userData) {
    return this._makeRequest(`${this.baseUrl}/users/me/avatar`, "PATCH", {
      avatar: userData.url,
    });
  }

  getInitialCards() {
    return this._makeRequest(`${this.baseUrl}/cards`);
  }

  addCard(cardData) {
    return this._makeRequest(`${this.baseUrl}/cards`, "POST", {
      name: cardData.name,
      link: cardData.link,
    });
  }

  deleteCard(cardId) {
    return this._makeRequest(`${this.baseUrl}/cards/${cardId}`, "DELETE");
  }

  addLike(cardId) {
    return this._makeRequest(`${this.baseUrl}/cards/${cardId}/likes`, "PUT");
  }

  removeLike(cardId) {
    return this._makeRequest(`${this.baseUrl}/cards/${cardId}/likes`, "DELETE");
  }
}
