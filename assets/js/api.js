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
  return res.text().then((text) => {
    let body = null;

    if (text) {
      try {
        body = JSON.parse(text);
      } catch (error) {
        body = text;
      }
    }

    if (res.ok) {
      return body;
    }

    const errorMessage =
      body && typeof body === "object"
        ? body.error ||
          Object.values(body.details || {})
            .map((item) => item.message)
            .join(" ")
        : `Error: ${res.status}`;

    return Promise.reject(errorMessage);
  });
}

/**
 * Fetch decks from the API and return them as a promise.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of decks.
 */
function getDecks() {
  return fetch(`${baseUrl}/decks`, { headers }).then(processResponse);
}

/**
 * Delete a deck from the API by ID.
 *
 * @param {string} deckId - The ID of the deck to delete.
 * @returns {Promise<void>}
 */
function deleteDeck(deckId) {
  return fetch(`${baseUrl}/decks/${deckId}`, {
    method: "DELETE",
    headers,
  }).then(processResponse);
}

function addDeck(deckData) {
  return fetch(`${baseUrl}/decks`, {
    method: "POST",
    headers,
    body: JSON.stringify(deckData),
  }).then(processResponse);
}

export { getDecks, deleteDeck, addDeck };
