export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    console.log("Popup open chamado. Adicionando classe popup_opened.");
    console.log("Popup antes:", this._popup.classList.contains("popup_opened"));
    this._popup.classList.add("popup_opened");
    console.log(
      "Popup depois:",
      this._popup.classList.contains("popup_opened")
    );
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    console.log("Popup close chamado. Removendo classe popup_opened.");
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    console.log("setEventListeners chamado para:", this._popup);
    this._popup.addEventListener("click", (evt) => {
      console.log("Clique detectado no popup:", evt.target);
      if (evt.target === this._popup) {
        console.log("Clique no overlay detectado");
        this.close();
      }

      if (
        evt.target.classList.contains("popup__close-icon") ||
        evt.target.classList.contains("image-popup__close-icon")
      ) {
        console.log("Clique no botão de fechar detectado");
        this.close();
      }
    });
  }
}
