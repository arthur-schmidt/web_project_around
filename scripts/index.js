let profileButton = document.querySelector(".profile__info-button");
let profileForm = document.querySelector(".popup");
let closeButton = document.querySelector(".popup__close-button");
let profileName = document.querySelector(".popup__container-name");
let profileAbout = document.querySelector(".popup__container-about");

function openForm() {
  profileForm.style.display = "flex";
  const currentName = document.querySelector(".profile__info-name").textContent;
  const currentJob = document.querySelector(
    ".profile__info-description"
  ).textContent;

  profileName.value = currentName;
  profileAbout.value = currentJob;
}

function closeForm() {
  profileForm.style.display = "none";
}

profileButton.addEventListener("click", openForm);
closeButton.addEventListener("click", closeForm);

let formElement = document.querySelector("#profile-form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let nameInput = document.querySelector(".profile__info-name");
  let jobInput = document.querySelector(".profile__info-description");

  nameInput.textContent = `${profileName.value}`;
  jobInput.textContent = `${profileAbout.value}`;

  closeForm();
}

formElement.addEventListener("submit", handleProfileFormSubmit);

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

cardElement = document.querySelector(".elements");

initialCards.forEach(function (card) {
  const cardTemplate = document
    .querySelector("#element-template")
    .content.cloneNode(true);
  const cardName = cardTemplate.querySelector(".element__name");
  const cardImage = cardTemplate.querySelector(".element__image");

  cardName.textContent = `${card.name}`;
  cardImage.src = `${card.link}`;
  cardImage.alt = `${card.name}`;

  cardElement.append(cardTemplate);
});

const popupAdd = document.querySelector(".add-popup");
let addOpenButton = document.querySelectorAll(".profile__add-button-click");
let addCloseButton = document.querySelector(".add-popup__close-icon");

function openAddForm() {
  popupAdd.style.display = "flex";
}

addOpenButton.forEach(function (button) {
  button.addEventListener("click", openAddForm);
});

function closeAddForm() {
  popupAdd.style.display = "none";
}

addCloseButton.addEventListener("click", closeAddForm);

const popupAddForm = document.querySelector("#add-form");

function clearInputs() {
  let inputs = document.querySelectorAll(".form-input");

  inputs.forEach(function (item) {
    item.value = "";
  });
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();

  const cardTemplate = document
    .querySelector("#element-template")
    .content.cloneNode(true);

  let titleInput = popupAdd.querySelector(".add-popup__container-name");
  let linkInput = popupAdd.querySelector(".add-popup__container-link");
  let newTitle = cardTemplate.querySelector(".element__name");
  let newImage = cardTemplate.querySelector(".element__image");

  newTitle.textContent = `${titleInput.value}`;
  newImage.src = `${linkInput.value}`;

  const newLikeButton = cardTemplate.querySelector(".element__button-image");
  newLikeButton.addEventListener("click", function () {
    if (newLikeButton.src.includes("element-button-active.png")) {
      newLikeButton.setAttribute("src", "./images/element-button.png");
    } else {
      newLikeButton.setAttribute("src", "./images/element-button-active.png");
    }
  });

  const newTrashButton = cardTemplate.querySelector(".element__trash-button");

  function eraseNewCard(evt) {
    let card = evt.target.closest(".element");
    card.remove();
  }

  newTrashButton.addEventListener("click", eraseNewCard);

  cardElement.prepend(cardTemplate);
  clearInputs();
  closeAddForm();
}

popupAddForm.addEventListener("submit", handleAddFormSubmit);

const likeButtons = document.querySelectorAll(".element__button-image");

likeButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    if (button.src.includes("element-button-active.png")) {
      button.setAttribute("src", "./images/element-button.png");
    } else {
      button.setAttribute("src", "./images/element-button-active.png");
    }
  });
});

const trashButtons = document.querySelectorAll(".element__trash-button");
function eraseCardTemplate(evt) {
  let card = evt.target.closest(".element");
  card.remove();
}

trashButtons.forEach(function (button) {
  button.addEventListener("click", eraseCardTemplate);
});
