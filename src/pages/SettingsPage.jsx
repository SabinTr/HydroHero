import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SettingsPage({ settings, onSave }) {
  const navigate = useNavigate();
  const [cupSize, setCupSize] = useState(settings.cupSize);
  const [goalCups, setGoalCups] = useState(settings.goalCups);
  const totalMl = cupSize * goalCups;
  const handleSave = () => {
    onSave({ cupSize: Number(cupSize), goalCups: Number(goalCups) });
    navigate('/'); // Navigate back to home after saving
  };

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
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setCupSize(Math.max(50, cupSize - 50))}
              style={{
                background: 'linear-gradient(90deg, #00b4d8, #0077b6)',
                color: 'white',
                border: 'none',
                width: '45px',
                height: '45px',
                borderRadius: '10px',
                fontSize: '24px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              −
            </button>
            <input
              type="number"
              min="50"
              step="50"
              value={cupSize}
              onChange={(e) => setCupSize(Math.max(50, Number(e.target.value) || 50))}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '10px',
                border: '1px solid #e6f7ff',
                fontSize: '18px',
                textAlign: 'center',
                fontWeight: '600'
              }}
            />
            <button
              onClick={() => setCupSize(cupSize + 50)}
              style={{
                background: 'linear-gradient(90deg, #00b4d8, #0077b6)',
                color: 'white',
                border: 'none',
                width: '45px',
                height: '45px',
                borderRadius: '10px',
                fontSize: '24px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              +
            </button>
          </div>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setGoalCups(Math.max(1, goalCups - 1))}
              style={{
                background: 'linear-gradient(90deg, #00b4d8, #0077b6)',
                color: 'white',
                border: 'none',
                width: '45px',
                height: '45px',
                borderRadius: '10px',
                fontSize: '24px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              −
            </button>
            <input
              type="number"
              min="1"
              value={goalCups}
              onChange={(e) => setGoalCups(Math.max(1, Number(e.target.value) || 1))}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '10px',
                border: '1px solid #e6f7ff',
                fontSize: '18px',
                textAlign: 'center',
                fontWeight: '600'
              }}
            />
            <button
              onClick={() => setGoalCups(goalCups + 1)}
              style={{
                background: 'linear-gradient(90deg, #00b4d8, #0077b6)',
                color: 'white',
                border: 'none',
                width: '45px',
                height: '45px',
                borderRadius: '10px',
                fontSize: '24px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              +
            </button>
          </div>
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