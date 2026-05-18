import { decks, getDeckByID } from "./decks.js";
import { hexToString, removeColorClasses } from "./colorMap.js";
import { renderCarouselView } from "./carousel.js";

const deckTemplateEl = document.querySelector("#deck-template");
const deckListEl = document.querySelector(".decks__list");
const pageMainContentEl = document.querySelector(".page__main-content");
const homeSectionEl = document.querySelector("#home");
const carouselSectionEl = document.querySelector("#carousel");
const notFoundSectionEl = document.querySelector("#not-found");

function createDeckEl(deck) {
  const deckEl = deckTemplateEl.content.querySelector("li").cloneNode(true);
  const titleEl = deckEl.querySelector(".deck__title");
  const countEl = deckEl.querySelector(".deck__count");
  const deleteBtn = deckEl.querySelector(".deck__delete-btn");
  const deckLinkEl = deckEl.querySelector(".deck__link");

  titleEl.textContent = deck.name;
  countEl.textContent = `${deck.cards.length} cards`;
  if (deckLinkEl) {
    deckLinkEl.href = `#/${deck.id}`;
  }

  const colorName = hexToString(deck.color) || "green";
  removeColorClasses(deckEl);
  deckEl.classList.add(`deck_color_${colorName}`);

  deleteBtn.addEventListener("click", () => {
    deckEl.remove();
  });

  return deckEl;
}

function renderDeckEl(deck) {
  const deckEl = createDeckEl(deck);
  deckListEl.prepend(deckEl);
}

decks.forEach(renderDeckEl);

function hideViews() {
  pageMainContentEl.classList.remove("page__main-content_type_carousel");
  [homeSectionEl, carouselSectionEl, notFoundSectionEl].forEach((section) => {
    if (section) {
      section.hidden = true;
    }
  });
}

function renderCurrentView() {
  const hash = window.location.hash || "#home";

  hideViews();

  if (hash.startsWith("#/")) {
    const deckId = hash.slice(2);
    const currentDeck = getDeckByID(deckId);

    if (currentDeck) {
      pageMainContentEl.classList.add("page__main-content_type_carousel");
      carouselSectionEl.hidden = false;
      renderCarouselView(currentDeck);
      return;
    }

    notFoundSectionEl.hidden = false;
    return;
  }

  switch (hash) {
    case "#home":
      homeSectionEl.hidden = false;
      break;
    default:
      notFoundSectionEl.hidden = false;
      break;
  }
}

window.addEventListener("hashchange", renderCurrentView);
renderCurrentView();
