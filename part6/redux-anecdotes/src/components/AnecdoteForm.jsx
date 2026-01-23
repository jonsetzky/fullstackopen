import { useState } from "react";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import { showNotification } from "../util";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const [newAnecdote, setNewAnecdote] = useState("");

  const create = (anecdote) => {
    dispatch(addAnecdote(anecdote));
    showNotification(dispatch, `you created '${anecdote}'`);
  };

  return (
    <div>
      <h2>create new</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          create(newAnecdote);
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
