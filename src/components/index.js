import './../pages/index.css';

import logo from './../images/logo.svg';
const logoElement = document.querySelector('.logo');
logoElement.src = logo;

import avatar from './../images/avatar.jpg'; 
const profileImage = document.querySelector('.profile__image');
profileImage.style.backgroundImage = `url(${avatar})`;

import { initialCards,createCard, deleteCard} from './cards.js';

import { openModal, closeModal } from './modal.js';

initialCards.forEach((element) =>
  createCard(element.name, element.link, deleteCard)
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
  button.addEventListener("click", (event) => closeModal(event))
});

const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closeModal(event);
    }
  });
});

document.addEventListener("keydown", function (event) { 
  if (event.key === 'Escape') {
      const openedPopup = document.querySelector(".popup_is-opened");
      if (openedPopup) {
          closeModal(openedPopup);
      }
  }
});




function handleFormSubmit(evt) {
    evt.preventDefault();
    
    const nameInput = formEditProfile.name.value;
    const jobInput = formEditProfile.description.value;

    const profileName = document.querySelector(".profile__title");
    const profileJob = document.querySelector(".profile__description");

    profileName.textContent=nameInput;
    profileJob.textContent = jobInput;
    
}

const formEditProfile = document.forms['edit-profile'];
formEditProfile.addEventListener('submit', handleFormSubmit);