import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SettingsPage({ settings, onSave }) {
  const navigate = useNavigate();
  const [cupSize, setCupSize] = useState(settings.cupSize);
  const [goalCups, setGoalCups] = useState(settings.goalCups);

  const handleSave = () => {
    onSave({ cupSize: Number(cupSize), goalCups: Number(goalCups) });
    navigate('/'); // Navigate back to home after saving
  };

  return (
    <main className="main-card">
      <h2>Settings</h2>
      <div className="settings-form">
        <label>
          Cup Size (ml):
          <input
            type="number"
            value={cupSize}
            onChange={(e) => setCupSize(e.target.value)}
            min="1"
          />
        </label>
        <label>
          Daily Goal (cups):
          <input
            type="number"
            value={goalCups}
            onChange={(e) => setGoalCups(e.target.value)}
            min="1"
          />
        </label>
        <button className="save-btn" onClick={handleSave}>
          Save Settings
        </button>
      </div>
    </main>
  );
}