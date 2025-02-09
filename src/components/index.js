import "./../pages/index.css";

import logo from "./../images/logo.svg";
const logoElement = document.querySelector(".logo");
logoElement.src = logo;

import avatar from "./../images/avatar.jpg";
const profileImage = document.querySelector(".profile__image");
profileImage.style.backgroundImage = `url(${avatar})`;

import { initialCards } from "./cards.js";

import { createCard, deleteCard, likeCard } from "./card.js";

import { openModal, closeModal, initModalEventListeners } from "./modal.js";

initModalEventListeners();

const profilePopupButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector(".popup_type_edit");
const newCardPopupButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const formEditProfile = document.forms["edit-profile"];
const formAddPlace = document.forms["new-place"];
const cardContainer = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;
const popups = document.querySelectorAll(".popup");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

initialCards.forEach((element) => {
  const cardElement = createCard(
    cardTemplate,
    element,
    openCard,
    deleteCard,
    likeCard
  );
  cardContainer.append(cardElement);
});

profilePopupButton.addEventListener("click", () => {
  const nameInput = formEditProfile.name;
  const jobInput = formEditProfile.description;

  const profileNameValue = profileName.textContent;
  const profileJobValue = profileJob.textContent;

  nameInput.value = profileNameValue;
  jobInput.value = profileJobValue;
  openModal(profilePopup);
});

newCardPopupButton.addEventListener("click", () => openModal(newCardPopup));

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

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = formEditProfile.name.value;
  profileJob.textContent = formEditProfile.description.value;

  closeModal(profilePopup);
}

function handlePlacesFormSubmit(evt) {
  evt.preventDefault();

  const element = {
    name: formAddPlace["place-name"].value,
    link: formAddPlace["link"].value,
  };
  const cardElement = createCard(
    cardTemplate,
    element,
    openCard,
    deleteCard,
    likeCard
  );

  cardContainer.prepend(cardElement);
  formAddPlace.reset();

  closeModal(newCardPopup);
}
