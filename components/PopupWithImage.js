export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector(".image-popup__image");
    this._descriptionElement = this._popup.querySelector(
      ".image-popup__description"
    );
  }

  open(imageLink, imageName, imageAlt) {
    this._imageElement.src = imageLink;
    this._imageElement.alt = imageAlt;
    this._descriptionElement.textContent = imageName;
    super.open();
  }
}
