// constants
const SET_DECKS = 'decks/SET_DECKS';

const load = (decks) => ({
  type: SET_DECKS,
  payload: decks
});

const initialState = [];

export const getAllDecks = () => async (dispatch) => {
  const response = await fetch('/api/decks/public/');

  if (response.ok) {
    const decks = await response.json()
    dispatch(load(decks));
  }
};

export const getOneDeck = (deckId) => async (dispatch) => {
  const response = await fetch(`/api/decks/${deckId}/`);

  if (response.ok) {
    const deck = await response.json()
    console.log(deck, "<---------------------- INSIDE GET ONE DECK")
    dispatch(load(deck));
  }
};

export const createOneDeck = (formData) => async (dispatch) => {
  const response = await fetch(`/api/decks/`,
    {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    });

  if (response.ok) {
    const deck = await response.json()
    dispatch(load(deck));

    console.log(deck.decks.id, "<------------------------- here is the deck id", typeof deck.decks.id)
    return deck
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_DECKS:
      console.log(action.payload, "<------------- inside the reducer")
      return action.payload.decks
    default:
      return state;
  }
}
