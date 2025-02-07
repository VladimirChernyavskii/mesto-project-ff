export function openModal(targetElement) {
  targetElement.classList.remove("popup_is-animated");
  targetElement.classList.add("popup_is-opened");

  const nameInput = document.forms["edit-profile"].name;
  const jobInput = document.forms["edit-profile"].description;

  const profileName = document.querySelector(".profile__title").textContent;
  const profileJob = document.querySelector(
    ".profile__description"
  ).textContent;

  nameInput.value = profileName;
  jobInput.value = profileJob;

  document.addEventListener("keydown", handleEscapeKey);
}

function handleEscapeKey(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

export function closeModal(arg) {
  let popup;

  if (arg instanceof Event) {
    popup = arg.target.closest(".popup");
  } else {
    popup = arg;
  }

  popup.classList.add("popup_is-animated");
  popup.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", handleEscapeKey);
}

export function initModalEventListeners() {
  const popups = document.querySelectorAll(".popup");
  popups.forEach((popup) => {
    popup.addEventListener("click", (event) => {
      if (event.target === popup) {
        closeModal(event);
      }
    });

    popup.classList.add("popup_is-animated");
  });
}
