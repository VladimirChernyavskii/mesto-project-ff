import './../pages/index.css'; // Путь к CSS в Webpack

import logo from './../images/logo.svg';
const logoElement = document.querySelector('.logo');
logoElement.src = logo;

import avatar from './../images/avatar.jpg'; // Импортируем картинку
const profileImage = document.querySelector('.profile__image');
profileImage.style.backgroundImage = `url(${avatar})`;

import { initialCards,createCard, deleteCard} from './cards.js';

import { openModal, closeModal } from './modal.js';

initialCards.forEach((element) =>
  createCard(element.name, element.link, deleteCard)
);

const popupButtons = document.querySelectorAll("[data-popup]");
popupButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popupSelector = button.dataset.popup; // Получаем название попапа
    const popup = document.querySelector(`.${popupSelector}`); // Находим нужный попап

    if (popupSelector === "popup_type_image") {
      const popupImage = popup.querySelector(".popup__image"); // Находим img в попапе
      const popupCaption = popup.querySelector(".popup__caption"); // Находим подпись

      const cardImage = event.target; // Получаем кликнутую картинку
      popupImage.src = cardImage.src; // Передаём src в попап
      popupImage.alt = cardImage.alt; // Передаём alt в попап
      popupCaption.textContent = cardImage.alt; // Используем alt как подпись
    }

    openModal(popup);
  });
});


const closePopupButtons = document.querySelectorAll(".popup__close");
closePopupButtons.forEach((button) => {
  button.addEventListener("click", (event) => closeModal(event))
});

const popups = document.querySelectorAll(".popup");

// Добавляем обработчик клика для всех попапов
popups.forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (event.target === popup) { // Проверяем, что клик был именно по фону
      closeModal(event);
    }
  });
});

document.addEventListener("keydown", function (event) { 
  if (event.key === 'Escape') {
      const openedPopup = document.querySelector(".popup_is-opened"); // Находим открытый попап
      if (openedPopup) {
          closeModal(openedPopup);
      }
  }
});
