export default class PopupWithForm extends Popup {
  constructor(_handleSubmit, popupSelector) {
    super(popupSelector);
    this._handleSubmit = _handleSubmit;
  }

  _getInputValues() {
    const inputList = this._popup.querySelectorAll(".form__input");
    const inputObject = {};
    inputList.forEach((inputElement) => {
      inputObject[inputElement.name] = inputElement.value;
    });
    return inputObject;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
  }

  close() {
    const formElement = this._popup.querySelector(".popup__form");
    formElement.reset();
    super.close();
  }
}
