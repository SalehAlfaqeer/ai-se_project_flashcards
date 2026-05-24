import { hexToString, removeColorClasses } from "./colorMap.js";

const carouselSectionEl = document.querySelector("#carousel");
const carouselTitleEl = carouselSectionEl.querySelector(".carousel__title");
const cardEl = carouselSectionEl.querySelector(".carousel__card");
const cardTextEl = carouselSectionEl.querySelector(".carousel__card-text");
const leftBtn = carouselSectionEl.querySelector(".carousel__btn_type_left");
const rightBtn = carouselSectionEl.querySelector(".carousel__btn_type_right");
const flipBtn = carouselSectionEl.querySelector(".carousel__btn_type_flip");

let currentDeck = null;
let currentIndex = 0;
let showingQuestion = true;
let initialized = false;

function getCarouselTitleString(deck, index) {
  return `${deck.name} · ${index + 1}/${deck.cards.length}`;
}

function disableButton(buttonEl) {
  buttonEl.classList.add("carousel__btn_disabled");
  buttonEl.disabled = true;
}

function enableButton(buttonEl) {
  buttonEl.classList.remove("carousel__btn_disabled");
  buttonEl.removeAttribute("disabled");
}

function updateArrows() {
  if (currentIndex === 0) {
    disableButton(leftBtn);
  } else {
    enableButton(leftBtn);
  }

  if (currentDeck && currentIndex === currentDeck.cards.length - 1) {
    disableButton(rightBtn);
  } else {
    enableButton(rightBtn);
  }
}

function updateDisplay() {
  if (!currentDeck) {
    return;
  }

  if (currentDeck.cards.length === 0) {
    carouselTitleEl.textContent = `${currentDeck.name} · 0/0`;
    cardTextEl.textContent = "No cards in this deck";
    disableButton(leftBtn);
    disableButton(rightBtn);
    disableButton(flipBtn);
    return;
  }

  const currentCard = currentDeck.cards[currentIndex];
  carouselTitleEl.textContent = getCarouselTitleString(
    currentDeck,
    currentIndex,
  );

  if (showingQuestion) {
    cardTextEl.textContent = currentCard.question;
  } else {
    cardTextEl.textContent = currentCard.answer;
  }

  updateArrows();
}

function initializeCarousel() {
  if (initialized) {
    return;
  }

  rightBtn.addEventListener("click", () => {
    if (!currentDeck || currentIndex >= currentDeck.cards.length - 1) {
      return;
    }

    currentIndex += 1;
    showingQuestion = true;
    updateDisplay();
  });

  leftBtn.addEventListener("click", () => {
    if (!currentDeck || currentIndex <= 0) {
      return;
    }

    currentIndex -= 1;
    showingQuestion = true;
    updateDisplay();
  });

  flipBtn.addEventListener("click", () => {
    showingQuestion = !showingQuestion;
    updateDisplay();
  });

  initialized = true;
}

function renderCarouselView(deck) {
  currentDeck = deck;
  currentIndex = 0;
  showingQuestion = true;
  enableButton(flipBtn);

  removeColorClasses(cardEl);
  const colorName = hexToString(deck.color) || "green";
  cardEl.classList.add(`carousel__card_color_${colorName}`);

  initializeCarousel();
  updateDisplay();
}

export { renderCarouselView };
