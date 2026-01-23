import { useState } from "react";
import { appendAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const [newAnecdote, setNewAnecdote] = useState("");

  const create = async (anecdote) => {
    dispatch(appendAnecdote(anecdote));
    dispatch(setNotification(`you created '${anecdote}'`, 5));
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
