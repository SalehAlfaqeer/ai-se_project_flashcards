import { fetchedDecks } from "./decks.js";
import { addDeck } from "./api.js";

const HEX_DIGITS = /^[0-9a-fA-F]{6}$/;

/**
 * Converts a string to a URL-safe slug.
 *
 * @param {string} str - The text to convert into a slug.
 * @returns {string} The generated slug.
 */
function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Returns a consistent lowercase hex color string with a leading "#".
 * Accepts values with or without a leading "#". Returns "#64d583" as a
 * fallback if the value is missing or not a valid 6-digit hex.
 *
 * @param {string|undefined} color
 * @returns {string}
 */
function normalizeColor(color) {
  if (!color) return "#64d583";
  const hex = color.startsWith("#") ? color.slice(1) : color;
  if (!HEX_DIGITS.test(hex)) return "#64d583";
  return "#" + hex.toLowerCase();
}
//=====================================================
const form = document.querySelector(".new-deck__form");
const submitBtn = form.querySelector(".new-deck__submit-btn");
const errorModal = document.querySelector("#error-modal");
const errorModalCloseBtn = errorModal.querySelector(".modal__close-btn");
const errorMessageEl = errorModal.querySelector(".modal__error");

/**
 * Validate that a deck name is a non-empty string of acceptable length.
 *
 * @param {string} name - The deck name to validate.
 * @returns {string|null} The validated name or null if invalid.
 */
function validateName(name) {
  if (typeof name !== "string" || name.length < 2 || name.length > 80) {
    return null;
  }
  return name;
}

/**
 * Parse a JSON string without throwing an exception.
 *
 * @param {string} jsonString - The JSON string to parse.
 * @returns {object|null} The parsed object or null if parsing failed.
 */
function parseJSON(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return null;
  }
}

/**
 * Display an error message in the modal dialog.
 *
 * @param {string} message - The error message to show.
 */
function showError(message) {
  errorMessageEl.textContent = message;
  errorModal.classList.add("modal_visible");
}

errorModalCloseBtn.addEventListener("click", () => {
  errorModal.classList.remove("modal_visible");
});

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const inputs = Object.fromEntries(new FormData(form));
  const jsonData = parseJSON(inputs["deck-name-input"]);
  const colorValue = normalizeColor(inputs.color);

  if (!jsonData) {
    showError("The deck JSON is invalid. Check the syntax and try again.");
    return;
  }

  const name = validateName(jsonData.name);
  if (!name) {
    showError("The deck name must be a string between 2 and 80 characters.");
    return;
  }

  const cards = jsonData.cards;
  if (!Array.isArray(cards)) {
    showError("The cards field must be an array.");
    return;
  }

  if (cards.length === 0) {
    showError("The deck must contain at least one card.");
    return;
  }

  const invalidCard = cards.find(
    (card) =>
      typeof card !== "object" ||
      card === null ||
      typeof card.question !== "string" ||
      typeof card.answer !== "string" ||
      !card.question.trim() ||
      !card.answer.trim(),
  );

  if (invalidCard) {
    showError(
      "Each card must be an object with non-empty question and answer fields.",
    );
    return;
  }

  if (
    typeof jsonData.color === "string" &&
    jsonData.color.toLowerCase() !== colorValue
  ) {
    showError("The JSON color field must match the selected deck color.");
    return;
  }

  const newDeck = {
    color: colorValue,
    name,
    cards,
  };

  submitBtn.disabled = true;

  addDeck(newDeck)
    .then((createdDeck) => {
      fetchedDecks.push(createdDeck);
      window.dispatchEvent(
        new CustomEvent("deck:create", { detail: createdDeck }),
      );
      window.location.hash = `#/${createdDeck._id}`;
      evt.target.reset();
    })
    .catch((err) => {
      const message =
        typeof err === "string"
          ? err
          : err && err.error
            ? err.error
            : "Failed to create deck.";
      showError(message);
    })
    .finally(() => {
      submitBtn.disabled = false;
    });
});

/**
 * Enable the new deck submit button.
 */
function enableSubmitBtn() {
  submitBtn.disabled = false;
}

export { enableSubmitBtn, showError };
