const profileButton = document.querySelector(".profile__info-button");
const profileForm = document.querySelector(".popup");
const closeButton = document.querySelector(".popup__close-button");
const profileName = document.querySelector(".popup__container-name");
const profileAbout = document.querySelector(".popup__container-about");

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

const formElement = document.querySelector("#profile-form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = document.querySelector(".profile__info-name");
  const jobInput = document.querySelector(".profile__info-description");

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
const addOpenButton = document.querySelectorAll(".profile__add-button-click");
const addCloseButton = document.querySelector(".add-popup__close-icon");

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
    const card = evt.target.closest(".element");
    card.remove();
  }

  newTrashButton.addEventListener("click", eraseNewCard);

  cardElement.prepend(cardTemplate);

  clearInputs();
  closeAddForm();

  function openNewImagePopup(evt) {
    const newImagePopup = document.querySelector(".image-popup");
    const newPopupImage = newImagePopup.querySelector(".image-popup__image");
    const popupTitle = newImagePopup.querySelector(".image-popup__text");

    const clickedImage = evt.target;
    const imageSrc = clickedImage.getAttribute("src");

    const cardElement = clickedImage.closest(".element");
    const cardTitle = cardElement.querySelector(".element__name").textContent;

    newPopupImage.setAttribute("src", imageSrc);
    popupTitle.textContent = cardTitle;
    newImagePopup.style.display = "flex";
  }

  newImage.addEventListener("click", openNewImagePopup);
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
  const card = evt.target.closest(".element");
  card.remove();
}

trashButtons.forEach(function (button) {
  button.addEventListener("click", eraseCardTemplate);
});

const imagePopup = document.querySelector(".image-popup");
const popupImage = imagePopup.querySelector(".image-popup__image");
const cardImage = document.querySelectorAll(".element__image");

function openImagePopup(evt) {
  const clickedImage = evt.target;
  const imageSrc = clickedImage.getAttribute("src");

  const cardElement = clickedImage.closest(".element");
  const cardTitle = cardElement.querySelector(".element__name");

  popupImage.setAttribute("src", imageSrc);

  const popupTitle = imagePopup.querySelector(".image-popup__text");
  popupTitle.textContent = cardTitle.textContent;

  imagePopup.style.display = "flex";
}

cardImage.forEach((cardImage) => {
  cardImage.addEventListener("click", openImagePopup);
});

const closeImageButton = imagePopup.querySelector(".image-popup__close-icon");

function closeImagePopup() {
  imagePopup.style.display = "none";
}

closeImageButton.addEventListener("click", closeImagePopup);

const popupOverlays = document.querySelectorAll(".popup-overlay");

function closePopup() {
  closeAddForm();
  closeImagePopup();
  closeForm();
}

popupOverlays.forEach((overlay) => {
  overlay.addEventListener("click", (evt) => {
    if (evt.target === overlay) {
      closePopup();
    }
  });
});

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    closePopup();
  }
});
