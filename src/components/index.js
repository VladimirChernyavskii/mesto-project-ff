import "./../pages/index.css";

import logo from "./../images/logo.svg";
const logoElement = document.querySelector(".logo");
logoElement.src = logo;

import { createCard, removeCard, likeCard } from "./card.js";

import { openModal, closeModal, initModalEventListeners } from "./modal.js";

import { enableValidation, clearValidation } from "./validation.js";

import {
  getInitialData,
  addCard,
  updateUser,
  deleteCard,
  addLike,
  removeLike,
  updateAvatar,
} from "./api.js";

initModalEventListeners();

const profilePopupButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_type_edit");
const newCardPopupButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const avatarPopupButton = document.querySelector(".profile__image")
const avatarPopup = document.querySelector(".popup_type_avatar");

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const formEditProfile = document.forms["edit-profile"];
const formAddPlace = document.forms["new-place"];
const formUpdateAvatar = document.forms["avatar"];

const cardContainer = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;
const popups = document.querySelectorAll(".popup");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

let userId;

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type-error",
  errorClass: "popup__input-error_active",
};

profilePopupButton.addEventListener("click", () => {
  const nameInput = formEditProfile.name;
  const jobInput = formEditProfile.description;

  const profileNameValue = profileName.textContent;
  const profileJobValue = profileJob.textContent;

  nameInput.value = profileNameValue;
  jobInput.value = profileJobValue;
  clearValidation(formEditProfile, validationConfig);
  openModal(profilePopup);
});

newCardPopupButton.addEventListener("click", () => openModal(newCardPopup));
avatarPopupButton.addEventListener('click', () => openModal(avatarPopup))

function openCard(link, title) {
  popupImage.src = link;
  popupImage.alt = title;
  popupCaption.textContent = title;

  openModal(imagePopup);
}

popups.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", () => closeModal(popup));
});

formEditProfile.addEventListener("submit", handleProfileFormSubmit);
formAddPlace.addEventListener("submit", handlePlacesFormSubmit);
formUpdateAvatar.addEventListener("submit", handleAvatarFormSubmit);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  formEditProfile.querySelector(".popup__button").textContent = "Сохранение...";
  
  updateUser(
    formEditProfile.name.value,
    formEditProfile.description.value
  ).then(() => {
    profileName.textContent = formEditProfile.name.value;
    profileJob.textContent = formEditProfile.description.value;

    closeModal(profilePopup);
  })
  .finally(()=> formEditProfile.querySelector(".popup__button").textContent= "Сохранить");
}

function handlePlacesFormSubmit(evt) {
  evt.preventDefault();
  formAddPlace.querySelector(".popup__button").textContent = "Сохранение...";

  const element = {
    name: formAddPlace["place-name"].value,
    link: formAddPlace["link"].value,
  };

  addCard(element.name, element.link).then((newCard) => {
    const cardElement = createCard(
      cardTemplate,
      newCard,
      openCard,
      onDeleteCard,
      onLikeCard,
      userId
    );
    cardContainer.prepend(cardElement);
    formAddPlace.reset();

    closeModal(newCardPopup);
  })
  .finally(()=> formAddPlace.querySelector(".popup__button").textContent= "Сохранить");;
}

function handleAvatarFormSubmit(evt){
  evt.preventDefault();
  formUpdateAvatar.querySelector(".popup__button").textContent = "Сохранение...";

  updateAvatar(formUpdateAvatar['avatar-url'].value)
  .then(()=> {
    profileImage.style.backgroundImage = `url(${formUpdateAvatar['avatar-url'].value})`;

    formUpdateAvatar.reset();
    closeModal(avatarPopup);
  })
  .finally(()=> formUpdateAvatar.querySelector(".popup__button").textContent= "Сохранить");
}

enableValidation(validationConfig);

getInitialData()
  .then(([user, cards]) => {
    userId = user._id;
    profileName.textContent = user.name;
    profileJob.textContent = user.about;
    profileImage.style.backgroundImage = `url(${user.avatar})`;

    cards.forEach((element) => {
      const cardElement = createCard(
        cardTemplate,
        element,
        openCard,
        onDeleteCard,
        onLikeCard,
        userId
      );
      cardContainer.append(cardElement);
    });
  })
  .catch((err) => console.log(err));

function onDeleteCard(cardId, cardElement) {
  deleteCard(cardId).then(() => removeCard(cardElement));
}

function onLikeCard(likeButton, id) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const likeMethod = isLiked ? removeLike : addLike;
  likeMethod(id).then((card) => likeCard(likeButton, card.likes.length));
}


