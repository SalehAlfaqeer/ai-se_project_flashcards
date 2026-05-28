import { decks, getDeckByID } from "./decks.js";
import { hexToString, removeColorClasses } from "./colorMap.js";
import { renderCarouselView } from "./carousel.js";
import { renderCardView } from "./card-view.js";

const deckTemplateEl = document.querySelector("#deck-template");
const deckListEl = document.querySelector("#deck-view .gallery__list");
const addDeckEl = deckListEl
  .querySelector(".gallery__new-card-btn")
  .closest("li");
const pageEl = document.querySelector(".page");
const pageMainContentEl = document.querySelector(".page__main-content");
const deckViewSectionEl = document.querySelector("#deck-view");
const cardViewSectionEl = document.querySelector("#card-view");
const carouselSectionEl = document.querySelector("#carousel");
const notFoundSectionEl = document.querySelector("#not-found");
const sections = [
  deckViewSectionEl,
  cardViewSectionEl,
  carouselSectionEl,
  notFoundSectionEl,
];

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

function showView(sectionToShow, displayValue = "block") {
  pageEl.classList.remove("page_no-mobile-bar");
  pageMainContentEl.classList.remove("page__main-content_type_carousel");

  sections.forEach((section) => {
    if (section) {
      section.hidden = false;
      section.style.display = "none";
    }
  });

  sectionToShow.style.display = displayValue;
}

function renderCurrentView() {
  const hash = window.location.hash || "#deck-view";

  if (hash.startsWith("#/")) {
    const [deckId, action] = hash.slice(2).split("/");
    const currentDeck = getDeckByID(deckId);

    if (currentDeck) {
      if (action === "practice") {
        showView(carouselSectionEl, "block");
        pageEl.classList.add("page_no-mobile-bar");
        pageMainContentEl.classList.add("page__main-content_type_carousel");
        renderCarouselView(currentDeck);
        return;
      }

      if (!action) {
        showView(cardViewSectionEl, "block");
        renderCardView(currentDeck);
        return;
      }

      showView(notFoundSectionEl, "block");
      return;
    }

    showView(notFoundSectionEl, "block");
    return;
  }

  switch (hash) {
    case "#deck-view":
      showView(deckViewSectionEl, "block");
      break;
    default:
      showView(notFoundSectionEl, "block");
      break;
  }
}

window.addEventListener("hashchange", renderCurrentView);
renderCurrentView();
