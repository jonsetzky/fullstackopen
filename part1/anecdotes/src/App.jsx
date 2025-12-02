import { useState } from "react";

// button from previous exercise
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const [selected, setSelected] = useState(0);

  const setRandomSelected = () => {
    var newAnecdote = selected;
    while (newAnecdote === selected) {
      newAnecdote = Math.floor(Math.random() * anecdotes.length);
    }
    setSelected(newAnecdote);
  };

  const mostVotesIndex =
    Math.max(...votes) > 0 ? votes.indexOf(Math.max(...votes)) : -1;

  return (
    <div>
      <h1>Anecdote of the day</h1>"{anecdotes[selected]}"
      <br />
      <span>has {votes[anecdotes.indexOf(anecdotes[selected])]} votes</span>
      <br />
      <Button
        onClick={() => {
          const newVotes = [...votes];
          newVotes[anecdotes.indexOf(anecdotes[selected])] += 1;
          setVotes(newVotes);
        }}
        text="vote"
      />
      <Button onClick={setRandomSelected} text="next anecdote" />
      <h1>Anecdote with the most votes</h1>
      {mostVotesIndex !== -1 ? `"${anecdotes[mostVotesIndex]}"` : "No votes"}
    </div>
  );
};

export default App;
