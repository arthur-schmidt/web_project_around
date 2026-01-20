import { toggleLike } from "../scripts/utils.js";

export default class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleDeleteConfirmation
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteConfirmation = handleDeleteConfirmation;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  _handleLikeClick() {
    toggleLike(this._likeButton);
  }
  _handleDeleteClick() {
    this._handleDeleteConfirmation(this._id);
  }

  _handleImageClick() {
    this._handleCardClick(this._link, this._name, this._name);
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".element__like-button");
    this._trashButton = this._element.querySelector(".element__trash");
    this._cardImage = this._element.querySelector(".element__image");

    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });

    this._trashButton.addEventListener("click", () => {
      this._handleDeleteClick();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__image");
    this._cardTitle = this._element.querySelector(".element__name");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  _getCardId() {
    return this._id;
  }

  removeCard() {
    this._element.remove();
  }
}
