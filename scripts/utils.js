function handleLikeClick(evt) {
  const button = evt.target;
  if (button.src.includes("element-button-active.png")) {
    button.setAttribute("src", "./images/element-button.png");
  } else {
    button.setAttribute("src", "./images/element-button-active.png");
  }
}

function handleDeleteClick(evt) {
  const cardElement = evt.target.closest(".element");
  cardElement.remove();
}

function handleImageClick(name, link) {
  const imagePopup = document.querySelector(".image-popup");
  const popupImage = imagePopup.querySelector(".image-popup__image");
  const popupCaption = imagePopup.querySelector(".image-popup__text");

  imagePopup.style.display = "flex";
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

export {
  handleLikeClick,
  handleDeleteClick,
  handleImageClick,
  openPopup,
  closePopup,
};
