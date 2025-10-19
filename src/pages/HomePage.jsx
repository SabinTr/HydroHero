import React, { useState } from "react";
import CircularProgress from "../components/CircularProgress";
import WeeklyStats from "../components/WeeklyStats";

export default function HomePage({ progress, settings, onAddWater, percentToday, history, todayKey }) {
  const motivationalPhrases = [
    "Keep going! 💪",
    "You're doing great! 🌊",
    "Stay hydrated! 💧",
    "Almost there! 🌞",
    "Refreshing progress! 🩵",
    "Your body thanks you! 🫶",
    "One sip at a time! 🚰",
  ];

  const [motivation, setMotivation] = useState("");

  const handleAdd = () => {
    onAddWater();
    const randomPhrase = motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)];
    setMotivation(randomPhrase);
  };

  return (
    <main className="main-card">
      <div className="top-stats">
        <div className="cups-container">
          <div className="cups-count">
            <span className="current-cups">
              {Math.floor(progress.amountMl / settings.cupSize)}
            </span>
            <span className="slash">/</span>
            <span className="goal-cups">{settings.goalCups}</span>
            <span className="cups-label">cups</span>
          </div>
          {motivation && <div className="motivation">{motivation}</div>}
        </div>
        <CircularProgress size={200} stroke={12} percentage={percentToday} />
      </div>

      <div className="controls">
        <button className="add-btn" onClick={handleAdd}>
          <span className="plus"></span>+ Add
        </button>
      </div>

      <WeeklyStats history={history} percentToday={percentToday} todayKey={todayKey} />
    </main>
  );
}