function openImageModal(name, link) {
  const imagePopup = document.querySelector(".image-popup");
  const image = imagePopup.querySelector(".image-popup__image");
  const description = imagePopup.querySelector(".image-popup__description");

  image.src = link;
  image.alt = name;
  description.textContent = name;
  imagePopup.classList.add("popup_opened");
}

function setupImageModalListeners() {
  const imagePopup = document.querySelector(".image-popup");
  const closeButton = imagePopup.querySelector(".image-popup__close-button");

  imagePopup.addEventListener("click", (evt) => {
    if (evt.target === imagePopup) {
      closeImageModal();
    }
  });

  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closeImageModal();
    }
  });

  closeButton.addEventListener("click", closeImageModal);
}

function closeImageModal() {
  const imagePopup = document.querySelector(".image-popup");
  imagePopup.classList.remove("popup_opened");
}

function toggleLike(button) {
  button.classList.toggle("element__like-button_active");
}

export {
  openImageModal,
  toggleLike,
  closeImageModal,
  setupImageModalListeners,
};
