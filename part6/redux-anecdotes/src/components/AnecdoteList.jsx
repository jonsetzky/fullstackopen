import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeAnecdotes, voteAnecdote } from "../reducers/anecdoteReducer";

import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);

  const filter = useSelector((state) => state.filter);

  const vote = (id) => {
    console.log("vote", id);
    dispatch(voteAnecdote(id));
    dispatch(
      setNotification(
        `you voted '${anecdotes.find((a) => a.id === id).content}'`,
        5,
      ),
    );
  };

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

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
