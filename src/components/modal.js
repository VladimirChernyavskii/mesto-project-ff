export function openModal(targetElement){
    targetElement.classList.add('popup_is-opened');

    const nameInput = document.forms['edit-profile'].name;
    const jobInput = document.forms['edit-profile'].description;

    const profileName = document.querySelector(".profile__title").textContent;
    const profileJob = document.querySelector(".profile__description").textContent;

    nameInput.value=profileName;
    jobInput.value = profileJob;
}

export function closeModal(arg){
    let popup;

    if (arg instanceof Event) {
        // Если передан event, ищем ближайший попап
        popup = arg.target.closest(".popup");
    } else {
        // Если передан сам попап, используем его
        popup = arg;
    }
    popup.classList.remove("popup_is-opened");
  }
  