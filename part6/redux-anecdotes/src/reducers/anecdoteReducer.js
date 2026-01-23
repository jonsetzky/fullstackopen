import { createSlice } from "@reduxjs/toolkit";
const assert = console.assert;

import anecdoteService from "../services/anecdotes";

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
    _voteAnecdote(state, action) {
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

const { setAnecdotes, addAnecdote, _voteAnecdote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    return anecdoteService
      .getAll()
      .then((anecdotes) => dispatch(setAnecdotes(anecdotes)));
  };
};

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    return anecdoteService
      .create(content)
      .then(() => dispatch(addAnecdote(content)));
  };
};

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const state = getState();
    const anecdote = state.anecdotes.find((a) => a.id === id);
    assert(anecdote !== undefined);
    return anecdoteService
      .update({ ...anecdote, votes: anecdote.votes + 1 })
      .then(() => dispatch(_voteAnecdote(id)));
  };
};

export default anecdoteSlice.reducer;
