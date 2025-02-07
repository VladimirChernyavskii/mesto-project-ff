import "./../pages/index.css";

import logo from "./../images/logo.svg";
const logoElement = document.querySelector(".logo");
logoElement.src = logo;

import avatar from "./../images/avatar.jpg";
const profileImage = document.querySelector(".profile__image");
profileImage.style.backgroundImage = `url(${avatar})`;

import { initialCards, createCard, deleteCard, likeCard } from "./cards.js";

import { openModal, closeModal, initModalEventListeners } from "./modal.js";

initModalEventListeners();

initialCards.forEach((element) =>
  createCard(element.name, element.link, deleteCard, likeCard)
);

const popupButtons = document.querySelectorAll("[data-popup]");
popupButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const popupSelector = button.dataset.popup;
    const popup = document.querySelector(`.${popupSelector}`);

    if (popupSelector === "popup_type_image") {
      const popupImage = popup.querySelector(".popup__image");
      const popupCaption = popup.querySelector(".popup__caption");

      const cardImage = event.target;
      popupImage.src = cardImage.src;
      popupImage.alt = cardImage.alt;
      popupCaption.textContent = cardImage.alt;
    }

    openModal(popup);
  });
});

const closePopupButtons = document.querySelectorAll(".popup__close");
closePopupButtons.forEach((button) => {
  button.addEventListener("click", (event) => closeModal(event));
});

const formEditProfile = document.forms["edit-profile"];
formEditProfile.addEventListener("submit", handleProfileFormSubmit);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = formEditProfile.name.value;
  const jobInput = formEditProfile.description.value;

  const profileName = document.querySelector(".profile__title");
  const profileJob = document.querySelector(".profile__description");

  profileName.textContent = nameInput;
  profileJob.textContent = jobInput;

  const openedPopup = document.querySelector(".popup_is-opened");
  closeModal(openedPopup);
}

const formAddPlace = document.forms["new-place"];
formAddPlace.addEventListener("submit", handlePlacesFormSubmit);

function handlePlacesFormSubmit(evt) {
  evt.preventDefault();

  const placeName = formAddPlace["place-name"];
  const placeLink = formAddPlace["link"];

  createCard(placeName.value, placeLink.value, deleteCard, likeCard, true);

  placeName.value = "";
  placeLink.value = "";

  const openedPopup = document.querySelector(".popup_is-opened");
  closeModal(openedPopup);
}
