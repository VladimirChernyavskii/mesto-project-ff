export function enableValidation (config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));

    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });

      setEventListeners (formElement, config);
    });
  };

function setEventListeners (formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, config);

    formElement.addEventListener('reset', () => {
        disableButton(buttonElement, config);
    });

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, config);
        toggleButtonState(inputList, buttonElement, config);
      });
    });
  };

function toggleButtonState(inputList,buttonElement, config){
    if (hasInvalidInput(inputList)) {
        disableButton(buttonElement, config);
    }
    else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(config.inactiveButtonClass);
    }
  }

function hasInvalidInput (inputList){
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
}

function disableButton(buttonElement, config){
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
}

function checkInputValidity (formElement, inputElement,config) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }
    
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
        hideInputError(formElement, inputElement, config);
    }
};

function showInputError(formElement, inputElement, errorMessage, config){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
}

function hideInputError (formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
  };

export function clearValidation (formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const submitButton = formElement.querySelector(config.submitButtonSelector);
  
    inputList.forEach(inputElement => {
        checkInputValidity(formElement, inputElement, config);
    });

    toggleButtonState(inputList, submitButton, config);
}
