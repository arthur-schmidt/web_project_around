import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(handleConfirmation, popupSelector) {
    super(popupSelector);
    this._handleConfirmation = handleConfirmation;
    this._confirmButton = this._popup.querySelector(
      ".popup__container-confirm_button",
    );
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", () => {
      this._handleConfirmation();
    });
  }
}
