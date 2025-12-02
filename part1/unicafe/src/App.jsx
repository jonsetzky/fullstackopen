import { useState } from "react";

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good / total) * 100;

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
      <h1>statistics</h1>
      <p>
        total {total} <br />
        average {isNaN(average) ? 0 : average.toFixed(2)} <br />
        positive {isNaN(positive) ? 0 : positive.toFixed(2)} %
      </p>
    </div>
  );
};

export default App;
