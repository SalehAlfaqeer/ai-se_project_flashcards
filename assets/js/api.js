const baseUrl = "https://se-flashcards-api.en.tripleten-services.com/v1";
const headers = {
  "Content-Type": "application/json",
  Authorization: "019ec741-c55a-731e-aabf-505a58fb12e5",
};

/**
 * Process a fetch response, parsing JSON and rejecting with a normalized error message.
 *
 * @param {Response} res - The fetch response object.
 * @returns {Promise<any>} A promise that resolves to the parsed body or rejects with an error string.
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

/**
 * Create a new deck through the API.
 *
 * @param {object} deckData - The deck payload to send to the API.
 * @param {string} deckData.name - The deck name.
 * @param {string} deckData.color - The deck color string.
 * @param {Array<object>} deckData.cards - The array of deck cards.
 * @returns {Promise<object>} A promise that resolves with the created deck object.
 */
function addDeck(deckData) {
  return fetch(`${baseUrl}/decks`, {
    method: "POST",
    headers,
    body: JSON.stringify(deckData),
  }).then(processResponse);
}

export { getDecks, deleteDeck, addDeck };
