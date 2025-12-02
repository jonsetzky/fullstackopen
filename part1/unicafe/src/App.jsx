import { useState } from "react";

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <span> {good}</span>
      <br />
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <span> {neutral}</span>
      <br />
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <span> {bad}</span>
      <br />
    </div>
  );
};

export default App;
