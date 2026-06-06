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

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const inputs = Object.fromEntries(new FormData(form));
  const jsonData = JSON.parse(inputs["deck-name-input"]);
  const color = normalizeColor(inputs.color);
  const name = jsonData.name;
  const cards = jsonData.cards;
  const id = `${slugify(jsonData.name)}-${Date.now()}`;

  const newDeck = {
    id,
    color,
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

export { enableSubmitBtn };
