import { getDeckByID, fetchedDecks } from "./decks.js";
import { hexToString, removeColorClasses } from "./colorMap.js";
import { renderCarouselView } from "./carousel.js";
import { renderCardView } from "./card-view.js";
import { enableSubmitBtn, showError } from "./new-deck-view.js";
import { getDecks } from "./api.js";

const deckTemplateEl = document.querySelector("#deck-template");
const deckListEl = document.querySelector("#deck-view .gallery__list");
const addDeckEl = deckListEl
  .querySelector(".gallery__new-card-btn")
  .closest("li");
const addDeckBtn = addDeckEl.querySelector(".gallery__new-card-btn");
const pageEl = document.querySelector(".page");
const pageMainContentEl = document.querySelector(".page__main-content");
const deckViewSectionEl = document.querySelector("#deck-view");
const cardViewSectionEl = document.querySelector("#card-view");
const carouselSectionEl = document.querySelector("#carousel");
const newDeckViewSectionEl = document.querySelector("#new-deck");
const notFoundSectionEl = document.querySelector("#not-found");
const sections = [
  deckViewSectionEl,
  cardViewSectionEl,
  carouselSectionEl,
  newDeckViewSectionEl,
  notFoundSectionEl,
];

/**
 * Fetch decks from the API and render them on the page.
 * For each fetched deck, check if it already exists in the local `decks` array.
 * If it doesn't exist, add it to the array and render it using `renderDeckEl`.
 *
 * @returns {Promise<void>}
 */
getDecks()
  .then((decks) => {
    decks.forEach((deck) => {
      if (!getDeckByID(deck._id)) {
        fetchedDecks.push(deck);
        renderDeckEl(deck);
      }
    });
  })
  .catch(showError)
  .finally(() => {
    renderCurrentView();
  });

function createDeckEl(deck) {
  const deckEl = deckTemplateEl.content.querySelector("li").cloneNode(true);
  const titleEl = deckEl.querySelector(".card__title");
  const countEl = deckEl.querySelector(".card__count");
  const deleteBtn = deckEl.querySelector(".card__delete-btn");
  const deckLinkEl = deckEl.querySelector(".card__link");

  titleEl.textContent = deck.name;
  countEl.textContent = `${deck.cards.length} cards`;
  if (deckLinkEl) {
    deckLinkEl.href = `#/${deck._id}`;
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

// fetchedDecks.forEach(renderDeckEl);

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
  const deckRoute = hash.startsWith("#deck/") ? hash.slice(6) : null;

  if (hash.startsWith("#/") || deckRoute) {
    const [deckId, action] = (deckRoute || hash.slice(2)).split("/");
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
    case "#new-deck":
      enableSubmitBtn();
      showView(newDeckViewSectionEl, "block");
      break;
    default:
      showView(notFoundSectionEl, "block");
      break;
  }
}

addDeckBtn.addEventListener("click", () => {
  window.location.hash = "#new-deck";
});

window.addEventListener("deck:create", (evt) => {
  renderDeckEl(evt.detail);
});

window.addEventListener("hashchange", renderCurrentView);
renderCurrentView();
