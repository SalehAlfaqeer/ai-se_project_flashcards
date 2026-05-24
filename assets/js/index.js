import { decks, getDeckByID } from "./decks.js";
import { hexToString, removeColorClasses } from "./colorMap.js";
import { renderCarouselView } from "./carousel.js";
import { renderCardView } from "./card-view.js";

const deckTemplateEl = document.querySelector("#deck-template");
const deckListEl = document.querySelector("#deck-view .gallery__list");
const addDeckEl = deckListEl
  .querySelector(".gallery__new-card-btn")
  .closest("li");
const pageMainContentEl = document.querySelector(".page__main-content");
const deckViewSectionEl = document.querySelector("#deck-view");
const cardViewSectionEl = document.querySelector("#card-view");
const carouselSectionEl = document.querySelector("#carousel");
const notFoundSectionEl = document.querySelector("#not-found");

function createDeckEl(deck) {
  const deckEl = deckTemplateEl.content.querySelector("li").cloneNode(true);
  const titleEl = deckEl.querySelector(".card__title");
  const countEl = deckEl.querySelector(".card__count");
  const deleteBtn = deckEl.querySelector(".card__delete-btn");
  const deckLinkEl = deckEl.querySelector(".card__link");

  titleEl.textContent = deck.name;
  countEl.textContent = `${deck.cards.length} cards`;
  if (deckLinkEl) {
    deckLinkEl.href = `#/${deck.id}`;
    deckLinkEl.setAttribute("aria-label", `View ${deck.name}`);
  }

  const colorName = hexToString(deck.color) || "green";
  removeColorClasses(deckEl);
  deckEl.classList.add(`card_color_${colorName}`);

  deleteBtn.addEventListener("click", () => {
    deckEl.remove();
  });

  return deckEl;
}

function renderDeckEl(deck) {
  const deckEl = createDeckEl(deck);
  deckListEl.insertBefore(deckEl, addDeckEl);
}

decks.forEach(renderDeckEl);

function hideViews() {
  pageMainContentEl.classList.remove("page__main-content_type_carousel");
  [
    deckViewSectionEl,
    cardViewSectionEl,
    carouselSectionEl,
    notFoundSectionEl,
  ].forEach((section) => {
    if (section) {
      section.hidden = true;
    }
  });
}

function renderCurrentView() {
  const hash = window.location.hash || "#deck-view";

  hideViews();

  if (hash.startsWith("#/")) {
    const [deckId, action] = hash.slice(2).split("/");
    const currentDeck = getDeckByID(deckId);

    if (currentDeck) {
      if (action === "practice") {
        pageMainContentEl.classList.add("page__main-content_type_carousel");
        carouselSectionEl.hidden = false;
        renderCarouselView(currentDeck);
        return;
      }

      if (!action) {
        cardViewSectionEl.hidden = false;
        renderCardView(currentDeck);
        return;
      }

      notFoundSectionEl.hidden = false;
      return;
    }

    notFoundSectionEl.hidden = false;
    return;
  }

  switch (hash) {
    case "#deck-view":
      deckViewSectionEl.hidden = false;
      break;
    default:
      notFoundSectionEl.hidden = false;
      break;
  }
}

window.addEventListener("hashchange", renderCurrentView);
renderCurrentView();
