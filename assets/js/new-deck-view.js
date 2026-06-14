import { decks } from "./decks.js";

const HEX_DIGITS = /^[0-9a-fA-F]{6}$/;

/**
 * Converts a string to a URL-safe slug: lowercase with any run of
 * non-alphanumeric characters replaced by a single hyphen, and no leading or
 * trailing hyphens.
 *
 * @param {string} str
 * @returns {string}
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

function validateName(name) {
  if (typeof name !== "string" || name.length < 2 || name.length > 80) {
    return null;
  }
  return name;
}

function parseJSON(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return null;
  }
}

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

  if (
    typeof jsonData.color === "string" &&
    jsonData.color.toLowerCase() !== colorValue
  ) {
    showError("The JSON color field must match the selected deck color.");
    return;
  }

  const id = `${slugify(name)}-${Date.now()}`;

  const newDeck = {
    id,
    color: colorValue,
    name,
    cards,
  };

  decks.push(newDeck);

  window.dispatchEvent(new CustomEvent("deck:create", { detail: newDeck }));
  window.location.hash = `deck/${id}`;
  evt.target.reset();
});

function enableSubmitBtn() {
  submitBtn.disabled = false;
}

export { enableSubmitBtn, showError };
