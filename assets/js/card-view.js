import { hexToString, removeColorClasses } from "./colorMap.js";
import { addCard, updateCard, deleteCard } from "./api.js";
import { showError } from "./new-deck-view.js";

const cardTemplateEl = document.querySelector("#card-template");
const cardListEl = document.querySelector("#card-view .gallery__list");
const addCardEl = cardListEl
  .querySelector(".gallery__new-card-btn")
  .closest("li");
const addCardBtn = addCardEl.querySelector(".gallery__new-card-btn");
const cardViewSectionEl = document.querySelector("#card-view");
const cardViewTitleEl = cardViewSectionEl.querySelector(".gallery__title");
const practiceLinkEl = cardViewSectionEl.querySelector(
  ".gallery__practice-btn",
);

/**
 * Create a card element for the card view.
 *
 * @param {object} deck - The deck containing the card.
 * @param {object} card - The card data to render.
 * @returns {HTMLElement} The created card DOM element.
 */
function createCardEl(deck, card) {
  const cardEl = cardTemplateEl.content.querySelector("li").cloneNode(true);
  const titleEl = cardEl.querySelector(".card__title");
  const flipBtn = cardEl.querySelector(".card__flip-btn");
  const editBtn = cardEl.querySelector(".card__edit-btn");
  const deleteBtn = cardEl.querySelector(".card__delete-btn");
  const colorName = hexToString(deck.color) || "green";
  let showingQuestion = true;

  /**
   * Update the visible text on a card element when flipping it.
   */
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

  editBtn.addEventListener("click", () => {
    renderCardEditor(deck, card);
  });

  deleteBtn.addEventListener("click", () => {
    deleteCard(card._id)
      .then(() => {
        const cardIndex = deck.cards.findIndex((deckCard) => {
          return deckCard._id === card._id;
        });
        if (cardIndex !== -1) {
          deck.cards.splice(cardIndex, 1);
        }

        cardEl.remove();
      })
      .catch(showError);
  });

  return cardEl;
}

/**
 * Remove any active card editor from the card list.
 */
function clearCardEditor() {
  const editorEl = cardListEl.querySelector(".card-editor");
  if (editorEl) {
    editorEl.remove();
  }
}

/**
 * Create an inline editor for creating or editing a card.
 *
 * @param {object} deck - The current deck.
 * @param {object|null} card - The card to edit, or null to create a new one.
 * @returns {HTMLElement} The card editor element.
 */
function createCardEditorEl(deck, card = null) {
  const editorEl = document.createElement("li");
  editorEl.className = "card card_color_white card-editor";

  editorEl.innerHTML = `
    <form class="card-editor__form">
      <input
        class="card-editor__input card-editor__input_question"
        type="text"
        placeholder="Type the question or term"
      />
      <input
        class="card-editor__input card-editor__input_answer"
        type="text"
        placeholder="Type the answer"
      />
      <div class="card__row">
        <button type="button" class="card__flip-btn" aria-label="Flip input"></button>
        <button type="submit" class="card__check-btn" aria-label="Save card">✔</button>
        <button type="button" class="card__cancel-btn" aria-label="Cancel">✕</button>
      </div>
    </form>
  `;

  const form = editorEl.querySelector(".card-editor__form");
  const questionInput = editorEl.querySelector(".card-editor__input_question");
  const answerInput = editorEl.querySelector(".card-editor__input_answer");
  const flipBtn = editorEl.querySelector(".card__flip-btn");
  const cancelBtn = editorEl.querySelector(".card__cancel-btn");
  let showingQuestion = true;

  if (card) {
    questionInput.value = card.question || "";
    answerInput.value = card.answer || "";
  }

  function updateEditorVisibility() {
    questionInput.style.display = showingQuestion ? "block" : "none";
    answerInput.style.display = showingQuestion ? "none" : "block";
  }

  updateEditorVisibility();

  flipBtn.addEventListener("click", () => {
    showingQuestion = !showingQuestion;
    updateEditorVisibility();
  });

  cancelBtn.addEventListener("click", () => {
    clearCardEditor();
  });

  form.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const question = questionInput.value.trim();
    const answer = answerInput.value.trim();

    if (!question || !answer) {
      showError("Both question and answer are required.");
      return;
    }

    const cardData = { question, answer };

    if (card) {
      updateCard(card._id, cardData)
        .then((updatedCard) => {
          const cardIndex = deck.cards.findIndex(
            (deckCard) => deckCard._id === card._id,
          );
          if (cardIndex !== -1) {
            deck.cards[cardIndex] = updatedCard;
          }
          renderCardView(deck);
        })
        .catch(showError);
    } else {
      addCard(deck._id, cardData)
        .then((createdCard) => {
          deck.cards.push(createdCard);
          renderCardView(deck);
        })
        .catch(showError);
    }
  });

  return editorEl;
}

/**
 * Render the inline card editor for a deck.
 *
 * @param {object} deck - The current deck.
 * @param {object|null} card - The card being edited, or null to create a new card.
 */
function renderCardEditor(deck, card = null) {
  clearCardEditor();
  const editorEl = createCardEditorEl(deck, card);
  cardListEl.insertBefore(editorEl, addCardEl);
}

/**
 * Remove all currently rendered card elements from the card view.
 */
function clearRenderedCards() {
  [...cardListEl.querySelectorAll(".card")].forEach((cardEl) => {
    cardEl.remove();
  });
}

/**
 * Render the card view for a specific deck.
 *
 * @param {object} deck - The deck with cards to render.
 */
function renderCardView(deck) {
  clearRenderedCards();
  clearCardEditor();
  cardViewTitleEl.textContent = deck.name;
  practiceLinkEl.href = `#/${deck._id}/practice`;

  deck.cards.forEach((card) => {
    const cardEl = createCardEl(deck, card);
    cardListEl.insertBefore(cardEl, addCardEl);
  });

  addCardBtn.onclick = () => {
    renderCardEditor(deck);
  };
}

export { renderCardView };
