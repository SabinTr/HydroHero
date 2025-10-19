import React, { useState, useEffect } from "react";

export default function SettingsModal({ isOpen, settings, onSave, onClose }) {
  const [cupInput, setCupInput] = useState(settings.cupSize);
  const [goalInput, setGoalInput] = useState(settings.goalCups);

  useEffect(() => {
    setCupInput(settings.cupSize);
    setGoalInput(settings.goalCups);
  }, [settings]);

  const handleSave = () => {
    const cup = Math.max(1, Math.floor(Number(cupInput) || 1));
    const goal = Math.max(1, Math.floor(Number(goalInput) || 1));
    onSave({ cupSize: cup, goalCups: goal });
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-card">
        <h2>Set your preferences</h2>
        <label>
          Cup size (ml)
          <input
            type="number"
            min="1"
            value={cupInput}
            onChange={(e) => setCupInput(e.target.value)}
          />
        </label>
        <label>
          Daily goal (cups)
          <input
            type="number"
            min="1"
            value={goalInput}
            onChange={(e) => setGoalInput(e.target.value)}
          />
        </label>
        <div className="modal-actions">
          <button className="save" onClick={handleSave}>Save</button>
          <button className="cancel" onClick={onClose}>Cancel</button>
        </div>
        <p className="hint">Cup size × Goal = total ml per day</p>
      </div>
    </div>
  );
}