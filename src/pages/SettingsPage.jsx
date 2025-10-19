import React, { useState } from "react";

export default function SettingsPage({ settings, onSave }) {
  const [cupSize, setCupSize] = useState(settings.cupSize);
  const [goalCups, setGoalCups] = useState(settings.goalCups);

  const handleSave = () => {
    const cup = Math.max(1, Math.floor(Number(cupSize) || 1));
    const goal = Math.max(1, Math.floor(Number(goalCups) || 1));
    onSave({ cupSize: cup, goalCups: goal });
  };

  const totalMl = cupSize * goalCups;

  return (
    <main className="main-card">
      <h3 style={{ margin: '0 0 16px 0', color: '#0d5570' }}>Settings</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ 
            display: 'block', 
            fontWeight: '600', 
            color: '#234a57',
            marginBottom: '8px'
          }}>
            Cup size (ml)
          </label>
          <input
            type="number"
            min="1"
            value={cupSize}
            onChange={(e) => setCupSize(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid #e6f7ff',
              fontSize: '16px'
            }}
          />
        </div>

        <div>
          <label style={{ 
            display: 'block', 
            fontWeight: '600', 
            color: '#234a57',
            marginBottom: '8px'
          }}>
            Daily goal (cups)
          </label>
          <input
            type="number"
            min="1"
            value={goalCups}
            onChange={(e) => setGoalCups(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid #e6f7ff',
              fontSize: '16px'
            }}
          />
        </div>

        <div style={{
          background: '#e6f7ff',
          borderRadius: '12px',
          padding: '12px',
          color: '#0077b6',
          fontWeight: '600'
        }}>
          Daily Total: {totalMl} ml
        </div>

        <button 
          onClick={handleSave}
          className="add-btn"
          style={{ width: '100%', marginTop: '8px' }}
        >
          Save Settings
        </button>
      </div>
    </main>
  );
}