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
const profileButton = document.querySelector(".profile__info-button-image");
const pictureFormElement = document.querySelector("#profile-picture-form");
const pictureFormButton = document.querySelector(".profile__image-container");
const cardForm = document.querySelector("#add-form");
const addButtons = document.querySelectorAll(".profile__add-button-click");

const cardsListSection = new Section(
  { items: [], renderer: createAndAddCard },
  ".elements"
);

const user = new UserInfo({
  nameSelector: ".profile__info-name",
  aboutSelector: ".profile__info-description",
  avatarSelector: ".profile__image",
});

const profileValidator = new FormValidator(settings, profileForm);
const pictureFormValidator = new FormValidator(settings, pictureFormElement);
const addValidator = new FormValidator(settings, cardForm);

pictureFormValidator.enableValidation();
profileValidator.enableValidation();
addValidator.enableValidation();

const profilePopup = new PopupWithForm(
  handleProfileSubmit,
  ".popup_type_profile"
);
const pictureFormPopup = new PopupWithForm(
  handlePictureFormSubmit,
  ".popup_type_pfp"
);
const addPopup = new PopupWithForm(handleAddSubmit, ".popup_type_add");
const imagePopup = new PopupWithImage(".image-popup");

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

function submitForm(buttonSelector, contactServerOperation) {
  const submitButton = document.querySelector(buttonSelector);

  submitButton.textContent = "Salvando...";

  setTimeout(() => {
    const contactServer = contactServerOperation();

    contactServer
      .then(() => {})
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        submitButton.textContent = "Salvar";
      });
  }, 500);
}

pictureFormButton.addEventListener("click", () => {
  pictureFormPopup.open();
});

profileButton.addEventListener("click", () => {
  const currentUserInfo = user.getUserInfo();
  nameInput.value = currentUserInfo.name;
  aboutInput.value = currentUserInfo.about;

  profilePopup.open();
});

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    addPopup.open();
  });
});

profilePopup.setEventListeners();
pictureFormPopup.setEventListeners();
imagePopup.setEventListeners();
addPopup.setEventListeners();
setupImageModalListeners();

function handleProfileSubmit(inputValues) {
  const contactServerOperation = () => {
    return api.updateUserInfo(inputValues).then(() => {
      user.setUserInfo({
        name: inputValues.name,
        about: inputValues.about,
        avatar: user.getUserInfo().avatar,
      });
      profilePopup.close();
    });
  };

  submitForm(".popup__button-profile", contactServerOperation);
}

function handlePictureFormSubmit(inputValue) {
  const contactServerOperation = () => {
    return api.updateProfilePicture(inputValue).then(() => {
      user.setAvatar(inputValue.url);
      pictureFormPopup.close();
    });
  };

  submitForm(".popup__button-picture", contactServerOperation);
}

function handleAddSubmit(inputValues) {
  const newCardData = {
    name: inputValues.title,
    link: inputValues.url,
  };

  const contactServerOperation = () => {
    return api.addCard(newCardData).then((savedCard) => {
      createAndAddCard(savedCard);
      addPopup.close();
    });
  };

  submitForm(".popup__button-card", contactServerOperation);
}

function handleCardClick(link, name) {
  imagePopup.open(link, name, name);
}

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
    createAndAddCard(cardData);
  });
});
