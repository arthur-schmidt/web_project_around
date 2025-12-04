const profileButton = document.querySelector(".profile__info-button-image");
const profileForm = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-button");
const profileName = document.querySelector(".popup__container-name");
const profileAbout = document.querySelector(".popup__container-about");
const popupAdd = document.querySelector(".add-popup");
const imagePopup = document.querySelector(".image-popup");

function openPopup(evt) {
  if (evt.target.classList.contains("profile__info-button-image")) {
    const profileName = document.querySelector(".popup__container-name");
    const profileAbout = document.querySelector(".popup__container-about");
    const currentName = document.querySelector(
      ".profile__info-name"
    ).textContent;
    const currentDescription = document.querySelector(
      ".profile__info-description"
    ).textContent;

    profileForm.style.display = "flex";
    profileName.value = currentName;
    profileAbout.value = currentDescription;
    profileForm.addEventListener("click", handleOverlayClick);
  } else if (evt.target.classList.contains("profile__add-button-click")) {
    popupAdd.style.display = "flex";
    popupAdd.addEventListener("click", handleOverlayClick);
  } else if (evt.target.classList.contains("element__image")) {
    const newPopupImage = imagePopup.querySelector(".image-popup__image");
    const popupTitle = imagePopup.querySelector(".image-popup__text");
    const clickedImage = evt.target;
    const imageSrc = clickedImage.getAttribute("src");
    const cardElement = clickedImage.closest(".element");
    const cardTitle = cardElement.querySelector(".element__name").textContent;

    imagePopup.style.display = "flex";
    newPopupImage.setAttribute("src", imageSrc);
    popupTitle.textContent = cardTitle;
    imagePopup.addEventListener("click", handleOverlayClick);
  }

  document.addEventListener("keydown", handleEscapeKey);
}

document.addEventListener("click", openPopup);

function closePopup(evt) {
  let openedPopup = null;

  if (profileForm.style.display === "flex") {
    openedPopup = profileForm;
  } else if (popupAdd.style.display === "flex") {
    openedPopup = popupAdd;
  } else if (imagePopup.style.display === "flex") {
    openedPopup = imagePopup;
  }

  if (openedPopup) {
    openedPopup.style.display = "none";
    openedPopup.removeEventListener("click", handleOverlayClick);
    document.removeEventListener("keydown", handleEscapeKey);
  }
}

profileButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);

const formElement = document.querySelector("#profile-form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = document.querySelector(".profile__info-name");
  const jobInput = document.querySelector(".profile__info-description");

  nameInput.textContent = `${profileName.value}`;
  jobInput.textContent = `${profileAbout.value}`;

  closePopup(evt);
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

cardElement.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("element__button-image")) {
    handleLikeClick(evt);
  } else if (evt.target.classList.contains("element__trash-button")) {
    handleTrashClick(evt);
  } else if (evt.target.classList.contains("element__image")) {
    openPopup(evt);
  }
});

function handleLikeClick(evt) {
  const button = evt.target;
  if (button.src.includes("element-button-active.png")) {
    button.setAttribute("src", "./images/element-button.png");
  } else {
    button.setAttribute("src", "./images/element-button-active.png");
  }
}

function handleTrashClick(evt) {
  const card = evt.target.closest(".element");
  card.remove();
}

const addOpenButton = document.querySelectorAll(".profile__add-button-click");
const addCloseButton = document.querySelector(".add-popup__close-icon");

addCloseButton.addEventListener("click", closePopup);

const popupAddForm = document.querySelector("#add-form");

function clearInputs() {
  const inputs = document.querySelectorAll(".form-input");

  inputs.forEach(function (item) {
    item.value = "";
  });
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();

  const cardTemplate = document
    .querySelector("#element-template")
    .content.cloneNode(true);
  const titleInput = popupAdd.querySelector(".add-popup__container-name");
  const linkInput = popupAdd.querySelector(".add-popup__container-link");
  const newTitle = cardTemplate.querySelector(".element__name");
  const newImage = cardTemplate.querySelector(".element__image");

  newTitle.textContent = `${titleInput.value}`;
  newImage.src = `${linkInput.value}`;

  cardElement.prepend(cardTemplate);

  clearInputs();
  closePopup(evt);
}

popupAddForm.addEventListener("submit", handleAddFormSubmit);

const closeImageButton = imagePopup.querySelector(".image-popup__close-icon");

closeImageButton.addEventListener("click", closePopup);

function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup();
  }
}

function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    closePopup();
  }
}
