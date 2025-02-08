import "./../pages/index.css";

import logo from "./../images/logo.svg";
const logoElement = document.querySelector(".logo");
logoElement.src = logo;

import avatar from "./../images/avatar.jpg";
const profileImage = document.querySelector(".profile__image");
profileImage.style.backgroundImage = `url(${avatar})`;

import { initialCards, createCard, deleteCard, likeCard } from "./cards.js";

import {
  openModal,
  closeModal,
  initModalEventListeners,
  handleEscapeKey,
} from "./modal.js";

initModalEventListeners();

const openEditProfilePopup = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector(".popup_type_edit");
const openNewCardPopup = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const closePopupButtons = document.querySelectorAll(".popup__close");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const formEditProfile = document.forms["edit-profile"];
const formAddPlace = document.forms["new-place"];
const cardContainer = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

initialCards.forEach((element) => {
  const cardElement = createCard(
    cardTemplate.querySelector(".card").cloneNode(true),
    imagePopup,
    element.name,
    element.link,
    openCard,
    deleteCard,
    likeCard
  );
  cardContainer.append(cardElement);
});

openEditProfilePopup.addEventListener("click", () => {
  const nameInput = formEditProfile.name;
  const jobInput = formEditProfile.description;

  const profileNameValue = profileName.textContent;
  const profileJobValue = profileJob.textContent;

  nameInput.value = profileNameValue;
  jobInput.value = profileJobValue;
  openModal(editProfilePopup);
});

openNewCardPopup.addEventListener("click", () => openModal(newCardPopup));

function openCard(popup, link, title) {
  const popupImage = popup.querySelector(".popup__image");
  const popupCaption = popup.querySelector(".popup__caption");

  popupImage.src = link;
  popupImage.alt = title;
  popupCaption.textContent = title;

  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscapeKey);
}

closePopupButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const popup = event.target.closest(".popup");
    closeModal(popup);
  });
});

formEditProfile.addEventListener("submit", handleProfileFormSubmit);
formAddPlace.addEventListener("submit", handlePlacesFormSubmit);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = formEditProfile.name.value;
  const jobInput = formEditProfile.description.value;

  profileName.textContent = nameInput;
  profileJob.textContent = jobInput;

  closeModal(editProfilePopup);
}

function handlePlacesFormSubmit(evt) {
  evt.preventDefault();

  const placeName = formAddPlace["place-name"];
  const placeLink = formAddPlace["link"];
  const cardElement = createCard(
    cardTemplate.querySelector(".card").cloneNode(true),
    imagePopup,
    placeName.value,
    placeLink.value,
    openCard,
    deleteCard,
    likeCard
  );

  cardContainer.prepend(cardElement);
  formAddPlace.reset();

  closeModal(newCardPopup);
}
