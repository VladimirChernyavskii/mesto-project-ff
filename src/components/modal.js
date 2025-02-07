export function openModal(targetElement){
    targetElement.classList.add('popup_is-opened')
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
  