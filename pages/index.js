import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { setupImageModalListeners } from "../scripts/utils.js";

const profileButton = document.querySelector(".profile__info-button-image");
const addButton = document.querySelectorAll(".profile__add-button-click");

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

function createAndAddCard(cardData) {
  const card = new Card(cardData, "#element-template", handleCardClick);
  const cardElement = card.generateCard();
  cardsListSection.addItem(cardElement);
  return cardElement;
}

const cardsListSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      createAndAddCard(item);
    },
  },
  ".elements"
);

cardsListSection.renderItems();

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
  user.setUserInfo({
    name: inputValues.name,
    about: inputValues.about,
  });

  profilePopup.close();
}

const profilePopup = new PopupWithForm(
  handleProfileSubmit,
  ".popup_type_profile"
);

const profileValidator = new FormValidator(settings, profileForm);

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

function handleAddSubmit(inputValues) {
  const newCardData = {
    name: inputValues.title,
    link: inputValues.url,
  };
  createAndAddCard(newCardData);

  addPopup.close();
}

const addValidator = new FormValidator(settings, cardForm);

addPopup.setEventListeners();

addButton.forEach((button) => {
  button.addEventListener("click", () => {
    addValidator.enableValidation();
    addPopup.open();
  });
});

const imagePopup = new PopupWithImage(".image-popup");
imagePopup.setEventListeners();

function handleCardClick(link, name) {
  imagePopup.open(link, name, name);
}
