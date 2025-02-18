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

import {enableValidation, clearValidation} from "./validation.js";

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

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type-error',
  errorClass: 'popup__input-error_active'
};

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
  clearValidation(formEditProfile, validationConfig);
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

enableValidation(validationConfig);

/*
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector(".form__submit");
  toggleButtonState(inputList, buttonElement)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement)
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));

    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset);
    });

  });
};


function hasInvalidInput (inputList){
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputList,buttonElement){
  if (hasInvalidInput(inputList)) buttonElement.classList.add("button_inactive")
  else buttonElement.classList.remove("button_inactive")
}

enableValidation();
*/