const cardContainer = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

function createCard(title, link, deleteHandler) {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__title").textContent = title;
  const cardImage = cardElement.querySelector(".card__image")
  cardImage.src = link;
  cardImage.alt = title;

  deleteButton.addEventListener("click", deleteHandler);

  cardContainer.append(cardElement);
}

function deleteCard(event) {
  const listItem = event.target.closest(".places__item.card");
  listItem.remove();
}

initialCards.forEach((element) =>
  createCard(element.name, element.link, deleteCard)
);

// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
