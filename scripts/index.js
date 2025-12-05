import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { setupImageModalListeners } from "./utils.js";

const profileButton = document.querySelector(".profile__info-button-image");
const profilePopup = document.querySelector(".popup_type_profile");
const addButton = document.querySelectorAll(".profile__add-button-click");
const popupAdd = document.querySelector(".popup_type_add");
const profileCloseButton = profilePopup.querySelector(".popup__close-button");
const addCloseButton = popupAdd.querySelector(".popup__close-button");

function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  popupElement.addEventListener("click", handleOverlayClick);
  document.addEventListener("keydown", handleEscapeKey);
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  popupElement.removeEventListener("click", handleOverlayClick);
  document.removeEventListener("keydown", handleEscapeKey);
}

profileButton.addEventListener("click", () => {
  openPopup(profilePopup);
});

addButton.forEach((button) => {
  button.addEventListener("click", () => {
    openPopup(popupAdd);
  });
});

profileCloseButton.addEventListener("click", () => closePopup(profilePopup));
addCloseButton.addEventListener("click", () => closePopup(popupAdd));

function handleOverlayClick(evt) {
  if (evt.target.classList.contains("popup")) {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

function createInitialCards() {
  initialCards.forEach((item) => {
    const card = new Card(item, "#element-template");
    const cardElement = card.generateCard();
    document.querySelector(".elements").append(cardElement);
  });
}

createInitialCards();

function generateCard(item) {
  const card = new Card(item, "#element-template");
  const cardElement = card.generateCard();
  return cardElement;
}

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
const cardForm = document.querySelector("#add-form");

const profileValidator = new FormValidator(settings, profileForm);
const cardValidator = new FormValidator(settings, cardForm);

profileValidator.enableValidation();
cardValidator.enableValidation();

profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const nameInput = profileForm.querySelector('input[name="name"]');
  const aboutInput = profileForm.querySelector('input[name="about"]');

  const profileName = document.querySelector(".profile__info-name");
  const profileAbout = document.querySelector(".profile__info-description");

  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;

  const openedPopup = document.querySelector(".popup_opened");
  if (openedPopup) {
    closePopup(openedPopup);
  }
});

cardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const titleInput = cardForm.querySelector('input[name="title"]');
  const linkInput = cardForm.querySelector('input[name="url"]');

  const newCardData = {
    name: titleInput.value,
    link: linkInput.value,
  };

  const newCard = generateCard(newCardData);
  document.querySelector(".elements").prepend(newCard);

  cardForm.reset();

  const openedPopup = document.querySelector(".popup_opened");
  if (openedPopup) {
    closePopup(openedPopup);
  }
});
