export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscapeKey);
}

function handleEscapeKey(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscapeKey);
}

export function initModalEventListeners() {
  const popups = document.querySelectorAll(".popup");
  popups.forEach((popup) => {
    popup.addEventListener("click", (event) =>
      closeByOverlayClick(event, popup)
    );
    popup.classList.add("popup_is-animated");
  });
}

function closeByOverlayClick(event, popup) {
  if (event.target === popup) {
    closeModal(popup);
  }
}
