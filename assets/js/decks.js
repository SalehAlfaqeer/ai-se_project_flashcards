const fetchedDecks = [];

/**
 * Retrieves a deck object by its _id from the decks array.
 *
 * @param {string} deck_id - The unique _identifier of the deck to retrieve
 * @returns {object|undefined} The deck object if found, undefined otherwise
 */
function getDeckByID(deck_id) {
  return fetchedDecks.find((deck) => deck._id === deck_id);
}

export { fetchedDecks, getDeckByID };
