export function createCard(
  cardTemplate,
  element,
  openHandler,
  deleteHandler,
  likeHandler,
  userId
) {
  const cardElement = getCardTemplate(cardTemplate);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardLikes = cardElement.querySelector(".card__like-counter");
  cardLikes.textContent = element.likes.length;

  cardElement.querySelector(".card__title").textContent = element.name;

  cardImage.src = element.link;
  cardImage.alt = element.name;

  cardImage.addEventListener("click", () =>
    openHandler(element.link, element.name)
  );

  deleteButton.addEventListener("click", () =>
    deleteHandler(element._id, cardElement)
  );
  if (userId !== element.owner._id)
    deleteButton.classList.add("card__delete-button-inactive");

  likeButton.addEventListener("click", () =>
    likeHandler(likeButton, element._id)
  );

  //отображение лайков пользователя при загрузке страницы
  if (element.likes.length > 0) {
    element.likes.forEach((like) => {
      if (like._id === userId)
        likeButton.classList.toggle("card__like-button_is-active");
    });
  }

  return cardElement;
}

function getCardTemplate(cardTemplate) {
  return cardTemplate.querySelector(".card").cloneNode(true);
}

export function removeCard(cardElement) {
  cardElement.remove();
}

export function likeCard(likeButton, likesCounter) {
  likeButton.classList.toggle("card__like-button_is-active");
  likeButton.nextElementSibling.textContent = likesCounter;
}
