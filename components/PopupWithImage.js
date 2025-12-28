import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector(".image-popup__image");
    this._descriptionElement = this._popup.querySelector(".image-popup__text");
  }

  open(imageLink, imageName, imageAlt) {
    console.log("PopupWithImage open chamado com:", imageLink, imageAlt);
    console.log("Popup element:", this._popup);
    console.log("Popup display antes:", getComputedStyle(this._popup).display);

    this._imageElement.src = imageLink;
    this._imageElement.alt = imageAlt;
    this._descriptionElement.textContent = imageName;
    super.open();

    console.log("Popup display depois:", getComputedStyle(this._popup).display);
  }
}
