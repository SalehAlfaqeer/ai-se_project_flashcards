const baseUrl = "https://se-flashcards-api.en.tripleten-services.com/v1";
const headers = {
  "Content-Type": "application/json",
  Authorization: "019ec741-c55a-731e-aabf-505a58fb12e5",
};

/**
 * Fetch decks from the API and render them on the page.
 * For each fetched deck, check if it already exists in the local `decks` array.
 * If it doesn't exist, add it to the array and render it using `renderDeckEl`.
 *
 * @returns {Promise<void>}
 */
function processResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

/**
 * Fetch decks from the API and return them as a promise.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of decks.
 */
function getDecks() {
  return fetch(`${baseUrl}/decks`, { headers }).then(processResponse);
}

export { getDecks };
