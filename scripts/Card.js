import {
  handleLikeClick,
  handleDeleteClick,
  handleImageClick,
  openPopup,
  closePopup,
} from "./utils.js";

export class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__image");
    this._likeButton = this._element.querySelector(".element__button-image");
    this._trashButton = this._element.querySelector(".element__trash");
    this._cardTitle = this._element.querySelector(".element__name");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", handleLikeClick);

    this._trashButton.addEventListener("click", handleDeleteClick);

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }
}
