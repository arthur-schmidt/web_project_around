import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { setupImageModalListeners } from "../scripts/utils.js";
import Api from "../components/Api.js";

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "26d54752-d871-4075-a046-17b8f1f75ce5",
    "Content-Type": "application/json",
  },
});

function createAndAddCard(cardData) {
  const card = new Card(
    cardData,
    "#element-template",
    handleCardClick,
    (cardId) => handleDeleteConfirmation(cardId, card),
    api
  );
  const cardElement = card.generateCard();
  cardsListSection.addItem(cardElement);
  return cardElement;
}

const cardsListSection = new Section(
  { items: [], renderer: createAndAddCard },
  ".elements"
);

function handleDeleteConfirmation(cardId, cardInstance) {
  const removeCard = () => {
    cardInstance.removeCard();
    api.deleteCard(cardId);
    confirmationPopup.close();
  };
  const confirmationPopup = new PopupWithConfirmation(
    removeCard,
    ".popup_type_delete"
  );
  confirmationPopup.setEventListeners();
  confirmationPopup.open();
}

Promise.all([api.getUserInfo(), api.getInitialCards()]).then((res) => {
  user.setUserInfo(res[0]);
  res[1].forEach((cardData) => {
    const cardElement = createAndAddCard(cardData);
  });
});

//////// add e remove likes

///////////

setupImageModalListeners();

const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const profileForm = document.querySelector("#profile-form");
const nameInput = profileForm.querySelector('input[name="name"]');
const aboutInput = profileForm.querySelector('input[name="about"]');

const user = new UserInfo({
  nameSelector: ".profile__info-name",
  aboutSelector: ".profile__info-description",
});

function handleProfileSubmit(inputValues) {
  const submitButton = document.querySelector(".popup__button-profile");

  submitButton.textContent = "Salvando...";
  setTimeout(contactServer, 500);

  function contactServer() {
    api
      .updateUserInfo(inputValues)
      .then(() => {
        user.setUserInfo({
          name: inputValues.name,
          about: inputValues.about,
        });
        profilePopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        submitButton.textContent = "Salvar";
      });
  }
}

const profilePopup = new PopupWithForm(
  handleProfileSubmit,
  ".popup_type_profile"
);

const profileValidator = new FormValidator(settings, profileForm);
const profileButton = document.querySelector(".profile__info-button-image");

profilePopup.setEventListeners();

profileButton.addEventListener("click", () => {
  profileValidator.enableValidation();
  const currentUserInfo = user.getUserInfo();

  nameInput.value = currentUserInfo.name;
  aboutInput.value = currentUserInfo.about;

  profilePopup.open();
});

const cardForm = document.querySelector("#add-form");
const addPopup = new PopupWithForm(handleAddSubmit, ".popup_type_add");
const addValidator = new FormValidator(settings, cardForm);
const addButton = document.querySelectorAll(".profile__add-button-click");
const imagePopup = new PopupWithImage(".image-popup");
imagePopup.setEventListeners();

function handleAddSubmit(inputValues) {
  const newCardData = {
    name: inputValues.title,
    link: inputValues.url,
  };
  const submitButton = document.querySelector(".popup__button-card");

  submitButton.textContent = "Salvando...";
  setTimeout(contactServer, 500);

  function contactServer() {
    api
      .addCard(newCardData)
      .then((savedCard) => {
        createAndAddCard(savedCard);
        addPopup.close();
      })
      .finally(() => {
        submitButton.textContent = "Salvar";
      });
  }
}

addPopup.setEventListeners();

addButton.forEach((button) => {
  button.addEventListener("click", () => {
    addValidator.enableValidation();
    addPopup.open();
  });
});

function handleCardClick(link, name) {
  imagePopup.open(link, name, name);
}
