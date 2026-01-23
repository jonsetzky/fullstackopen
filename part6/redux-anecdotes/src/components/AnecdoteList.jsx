import { voteAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch, useSelector } from "react-redux";

import { showNotification } from "../util";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);

  const filter = useSelector((state) => state.filter);

  const vote = (id) => {
    console.log("vote", id);
    dispatch(voteAnecdote(id));
    showNotification(
      dispatch,
      `you voted '${anecdotes.find((a) => a.id === id).content}'`,
    );
  };

  return (
    <div>
      {anecdotes
        .toSorted((a, b) => b.votes - a.votes)
        .filter((anecdote) =>
          anecdote.content.toLowerCase().includes(filter.toLowerCase()),
        )
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
