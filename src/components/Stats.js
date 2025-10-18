import React from "react";

export default function Stats({ water, goal }) {
  const pct = Math.round(Math.min((water / goal) * 100, 100));
  return (
    <div className="stats">
      <div className="bar" aria-hidden>
        <div className="fill" style={{ width: `${pct}%` }} />
      </div>
      <p>{pct}% of daily goal</p>
      <p className="motivation">
        {pct >= 100 ? "Awesome — fully hydrated! 🥳" :
         pct >= 80 ? "Almost there — keep sipping!" :
         pct >= 40 ? "Good start — keep it up!" :
         "Let's get drinking — your HydroHero needs you!"}
      </p>
    </div>
  );
}
