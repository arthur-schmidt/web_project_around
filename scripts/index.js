import Card from "./Card.js";
import { setupImageModalListeners } from "./utils.js";

const profileButton = document.querySelector(".profile__info-button-image");
const profileForm = document.querySelector(".popup");
const addButton = document.querySelectorAll(".profile__add-button-click");
const popupAdd = document.querySelector(".add-popup");
const profileCloseButton = profileForm.querySelector(".popup__close-button");
const addCloseButton = popupAdd.querySelector(".add-popup__close-button");

profileButton.addEventListener("click", () => {
  profileForm.style.display = "flex";
  profileForm.addEventListener("click", handleOverlayClick);
  document.addEventListener("keydown", handleEscapeKey);
});

addButton.forEach((button) => {
  button.addEventListener("click", () => {
    popupAdd.style.display = "flex";
    popupAdd.addEventListener("click", handleOverlayClick);
    document.addEventListener("keydown", handleEscapeKey);
  });
});

profileCloseButton.addEventListener("click", closePopup);
addCloseButton.addEventListener("click", closePopup);

function handleOverlayClick(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup();
  } else if (evt.target.classList.contains("add-popup")) {
    closePopup();
  }
}

function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    closePopup();
  }
}

function closePopup() {
  const openProfilePopups = document.querySelectorAll(".popup");
  const openAddPopups = document.querySelectorAll(".add-popup");
  openProfilePopups.forEach((popup) => {
    if (popup.style.display === "flex") {
      popup.style.display = "none";
      popup.removeEventListener("click", handleOverlayClick);
      document.removeEventListener("keydown", handleEscapeKey);
    }
  });
  openAddPopups.forEach((popup) => {
    if (popup.style.display === "flex") {
      popup.style.display = "none";
      popup.removeEventListener("click", handleOverlayClick);
      document.removeEventListener("keydown", handleEscapeKey);
    }
  });
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
