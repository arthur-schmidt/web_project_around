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
