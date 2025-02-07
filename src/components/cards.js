export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

export function createCard(title, link, deleteHandler, addToBegin = false) {
  const cardContainer = document.querySelector(".places__list");
  const cardTemplate = document.querySelector("#card-template").content;

  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__title").textContent = title;
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = title;

  deleteButton.addEventListener("click", deleteHandler);

  if (addToBegin) cardContainer.prepend(cardElement);
  else cardContainer.append(cardElement);
}

export function deleteCard(event) {
  const listItem = event.target.closest(".places__item.card");
  listItem.remove();
}