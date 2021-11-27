// constants
const SET_COMMENTS = 'comments/SET_COMMENTS';

const load = (comments) => ({
  type: SET_COMMENTS,
  payload: comments
});

const initialState = [];

export const getAllComments = (deckId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${deckId}/`);

  if (response.ok) {
    const comments = await response.json()
    dispatch(load(comments));
  }
};

export const addOneComment = (formData) => async (dispatch) => {
  const response = await fetch(`/api/comments/`,
    {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    });

  if (response.ok) {
    const comments = await response.json()
    dispatch(load(comments));
  }
};

export const removeOneComment = (commentId, deckId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}/${deckId}/`,
    {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });

  if (response.ok) {
    const comments = await response.json()
    dispatch(load(comments));
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_COMMENTS:
      return action.payload.comments
    default:
      return state;
  }
}
