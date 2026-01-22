import { useState } from "react";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const [newAnecdote, setNewAnecdote] = useState("");

  return (
    <div>
      <h2>create new</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addAnecdote(newAnecdote));
          setNewAnecdote("");
        }}
      >
        <div>
          <input
            value={newAnecdote}
            onChange={(e) => setNewAnecdote(e.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
