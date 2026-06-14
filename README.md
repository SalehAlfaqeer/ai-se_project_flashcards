# Flashcards App

A responsive flashcards web app for creating, browsing, and practicing study decks.

## Overview

This project lets users manage flashcard decks with features including:

- browsing existing decks
- viewing cards in a deck
- practicing cards in a carousel-style view
- creating new decks from JSON input
- deleting decks

The app communicates with a remote API for persistent storage and keeps local state in sync with the server.

## New Features

- **New deck creation**: users can create a deck by entering deck JSON and selecting a color.
- **Modal error handling**: API validation errors and client-side form issues are shown via a reusable error modal.
- **Remote database integration**: deck data is fetched, created, and deleted through a remote API endpoint.
- **JSDoc documentation**: all named JavaScript functions have complete JSDoc comments for easier maintenance.

## How it works

1. The app loads existing decks from the remote API.
2. When a user submits the New Deck form, the app validates the JSON and sends the deck to the API.
3. The API returns the created deck, which the app adds to local state and renders immediately.
4. Errors from validation or network requests appear in the modal so users can correct the issue.
5. When a deck is deleted, the app removes it from both the remote API and the local deck list.

## Running the project locally

From the `app` folder, use a simple local server such as:

```bash
cd /home/sal7/workspace/app
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Deployment

Check out the deployed version of the app:

[https://salehalfaqeer.github.io/ai-se_project_flashcards/](https://salehalfaqeer.github.io/ai-se_project_flashcards/)

## Notes

- The new deck form expects valid JSON with a `name` string, a `cards` array, and a selected color.
- The API requires at least one card in the deck.
- Errors returned from the API are displayed in the modal with readable messages.

## Project updates

### UI and navigation

- Added the About view routing and fixed the app's hash-based navigation.
- Improved mobile display for the deck and carousel views.

### API and state

- Added `addDeck()` and `deleteDeck()` API handlers.
- Synced local `fetchedDecks` state with create and delete operations.
- Improved API response parsing so validation errors are surfaced clearly.

### Documentation

- Documented all named functions in the JavaScript modules using JSDoc.
- Updated the project to make the codebase easier to understand and maintain.

## Project Pitch Video

Check out [this video](https://drive.google.com/file/d/1gnVl-43xHpvDjk3OBgo_LpPLVGszHz_G/view?usp=sharing) for a walkthrough of the project.
