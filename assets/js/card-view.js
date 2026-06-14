import { hexToString, removeColorClasses } from "./colorMap.js";

const cardTemplateEl = document.querySelector("#card-template");
const cardListEl = document.querySelector("#card-view .gallery__list");
const addCardEl = cardListEl
  .querySelector(".gallery__new-card-btn")
  .closest("li");
const cardViewSectionEl = document.querySelector("#card-view");
const cardViewTitleEl = cardViewSectionEl.querySelector(".gallery__title");
const practiceLinkEl = cardViewSectionEl.querySelector(
  ".gallery__practice-btn",
);

function createCardEl(deck, card) {
  const cardEl = cardTemplateEl.content.querySelector("li").cloneNode(true);
  const titleEl = cardEl.querySelector(".card__title");
  const flipBtn = cardEl.querySelector(".card__flip-btn");
  const deleteBtn = cardEl.querySelector(".card__delete-btn");
  const colorName = hexToString(deck.color) || "green";
  let showingQuestion = true;

  function updateCardText() {
    titleEl.textContent = showingQuestion ? card.question : card.answer;
    removeColorClasses(cardEl);

    if (showingQuestion) {
      cardEl.classList.add(`card_color_${colorName}`);
    } else {
      cardEl.classList.add("card_color_white");
    }
  }

  updateCardText();

  flipBtn.addEventListener("click", () => {
    showingQuestion = !showingQuestion;
    updateCardText();
  });

  deleteBtn.addEventListener("click", () => {
    const cardIndex = deck.cards.findIndex((deckCard) => {
      return deckCard._id === card._id;
    });
    if (cardIndex !== -1) {
      deck.cards.splice(cardIndex, 1);
    }

    cardEl.remove();
  });

  return cardEl;
}

function clearRenderedCards() {
  [...cardListEl.querySelectorAll(".card")].forEach((cardEl) => {
    cardEl.remove();
  });
}

function renderCardView(deck) {
  clearRenderedCards();
  cardViewTitleEl.textContent = deck.name;
  practiceLinkEl.href = `#/${deck._id}/practice`;

  deck.cards.forEach((card) => {
    const cardEl = createCardEl(deck, card);
    cardListEl.insertBefore(cardEl, addCardEl);
  });
}

export { renderCardView };
