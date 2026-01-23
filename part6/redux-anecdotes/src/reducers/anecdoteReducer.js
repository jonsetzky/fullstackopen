import { createSlice } from "@reduxjs/toolkit";
const assert = console.assert;

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = [];

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    voteAnecdote(state, action) {
      return state.map((anecdote) => {
        if (anecdote.id === action.payload) {
          return { ...anecdote, votes: anecdote.votes + 1 };
        }
        return anecdote;
      });
    },
    addAnecdote(state, action) {
      return state.concat(asObject(action.payload));
    },
    setAnecdotes(state, action) {
      for (const anecdote of action.payload) {
        assert("content" in anecdote);
        assert("id" in anecdote);
        assert("votes" in anecdote);
      }
      return action.payload;
    },
  },
});
export const { voteAnecdote, addAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
