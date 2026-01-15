import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { setupImageModalListeners } from "../scripts/utils.js";
import Api from "../components/Api.js";

/* const initialCards = [
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


const cardsListSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      createAndAddCard(item);
    },
  },
  ".elements"
);

cardsListSection.renderItems(); */

/* api.getUserInfo().then((data) => {
  const userData = {
    name: data.name,
    about: data.about,
  };
  user.setUserInfo(userData);
});

api.getInitialCards().then((data) => {
  data.forEach((cardData) => {
    const card = new Card(cardData, "#element-template", handleCardClick);
    const cardElement = card.generateCard();
    cardsListSection.addItem(cardElement);
  });
}); */

////////////////////////////////////////////////

/* function createAndAddCard(cardData) {
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
); */

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "26d54752-d871-4075-a046-17b8f1f75ce5",
    "Content-Type": "application/json",
  },
});

function createAndAddCard(cardData) {
  console.log("Criando cartao:", cardData.name);
  const card = new Card(cardData, "#element-template", handleCardClick);
  const cardElement = card.generateCard();
  cardsListSection.addItem(cardElement);
  return cardElement;
}

const cardsListSection = new Section(
  { items: [], renderer: createAndAddCard },
  ".elements"
);

Promise.all([api.getUserInfo(), api.getInitialCards()]).then((res) => {
  user.setUserInfo(res[0]);
  console.log(res[1]);
  res[1].forEach((cardData) => {
    createAndAddCard(cardData);
  });
});

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

function handleAddSubmit(inputValues) {
  const newCardData = {
    name: inputValues.title,
    link: inputValues.url,
  };
  createAndAddCard(newCardData);

  addPopup.close();
}

const addValidator = new FormValidator(settings, cardForm);
const addButton = document.querySelectorAll(".profile__add-button-click");

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
