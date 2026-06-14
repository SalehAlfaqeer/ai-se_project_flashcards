import { getDeckByID, fetchedDecks } from "./decks.js";
import { hexToString, removeColorClasses } from "./colorMap.js";
import { renderCarouselView } from "./carousel.js";
import { renderCardView } from "./card-view.js";
import { enableSubmitBtn, showError } from "./new-deck-view.js";
import { getDecks, deleteDeck, addDeck } from "./api.js";

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
const aboutSectionEl = document.querySelector("#about");
const notFoundSectionEl = document.querySelector("#not-found");
const sections = [
  deckViewSectionEl,
  cardViewSectionEl,
  carouselSectionEl,
  newDeckViewSectionEl,
  aboutSectionEl,
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

/**
 * Create a deck card DOM element from a deck object.
 *
 * @param {object} deck - The deck data to render.
 * @returns {HTMLElement} The created deck element.
 */
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
    deleteDeck(deck._id)
      .then(() => {
        deckEl.remove();
        const deckIndex = fetchedDecks.findIndex((d) => d._id === deck._id);
        if (deckIndex !== -1) {
          fetchedDecks.splice(deckIndex, 1);
        }
      })
      .catch(showError);
  });

  return deckEl;
}

/**
 * Render a single deck into the deck gallery.
 *
 * @param {object} deck - The deck to render.
 */
function renderDeckEl(deck) {
  const deckEl = createDeckEl(deck);
  deckListEl.insertBefore(deckEl, addDeckEl);
}

// fetchedDecks.forEach(renderDeckEl);

/**
 * Show one page section while hiding all others.
 *
 * @param {HTMLElement} sectionToShow - The section to display.
 * @param {string} [displayValue="block"] - The CSS display value.
 */
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

/**
 * Render the current application view based on the URL hash.
 */
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
    case "#about":
      showView(aboutSectionEl, "block");
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
