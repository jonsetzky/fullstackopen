import { useSelector, useDispatch } from "react-redux";
import { addAnecdote, voteAnecdote } from "./reducers/anecdoteReducer";
import { useState } from "react";

const App = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state);

  const [newAnecdote, setNewAnecdote] = useState("");

  const vote = (id) => {
    console.log("vote", id);
    dispatch(voteAnecdote(id));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
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

export default App;
