export function createCard(
  cardTemplate,
  element,
  openHandler,
  deleteHandler,
  likeHandler
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardElement.querySelector(".card__title").textContent = element.name;

  cardImage.src = element.link;
  cardImage.alt = element.name;

  cardImage.addEventListener("click", () =>
    openHandler(element.link, element.name)
  );
  deleteButton.addEventListener("click", () => deleteHandler(cardElement));
  likeButton.addEventListener("click", () => likeHandler(likeButton));

  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}
