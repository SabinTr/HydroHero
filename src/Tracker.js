import React from "react";

export default function Tracker({ water, setWater, goal }) {
  const addCup = () => setWater((w) => Math.min(w + 1, goal));
  const removeCup = () => setWater((w) => Math.max(w - 1, 0));
  const reset = () => setWater(0);

  return (
    <div className="tracker">
      <p>You drank <strong>{water}</strong> / {goal} cups today</p>
      <div className="buttons">
        <button onClick={addCup}>Add a Cup 💧</button>
        <button onClick={removeCup}>Undo</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
