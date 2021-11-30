// constants
const SET_DECKLIST = 'decklist/SET_DECKLIST';

const load = (decks) => ({
  type: SET_DECKLIST,
  payload: decks
});

const initialState = [];

export const getOneDecklist = (deckId) => async (dispatch) => {
  const response = await fetch(`/api/cards/${deckId}/`);

  if (response.ok) {
    const deck = await response.json()
    dispatch(load(deck));
  }
};

export const addOneCard = (deckId, cardName) => async (dispatch) => {
  const response = await fetch(`/api/cards/${deckId}/${cardName}/`,
    {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });

  if (response.ok) {
    const deck = await response.json()
    dispatch(load(deck));
  }
};

export const createCard = (cardName) => async (dispatch) => {
  const response = await fetch(`/api/cards/commanders/${cardName}/`,
    {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });

  if (response.ok) {
    const card = await response.json()
    return card
  }
};

export const changeDecksCommander = (deckId, cardName) => async (dispatch) => {
  const response = await fetch(`/api/cards/commanders/${deckId}/${cardName}/`,
    {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });

  if (response.ok) {
    const card = await response.json()
    return card
  }
};

export const removeOneCard = (deckId, cardId) => async (dispatch) => {
  const response = await fetch(`/api/decks/${deckId}/${cardId}/`,
    {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    });

  if (response.ok) {
    const deck = await response.json()
    dispatch(load(deck));
  }
};

export const removeAllOfOneCard = (deckId, cardId) => async (dispatch) => {
  const response = await fetch(`/api/decks/${deckId}/${cardId}/`,
    {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });

  if (response.ok) {
    const deck = await response.json()
    dispatch(load(deck));
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_DECKLIST:
      return action.payload.cards
    default:
      return state;
  }
}
