import React from "react";
import CircularProgress from "../components/CircularProgress";

export default function HistoryPage({ history }) {
  return (
    <main className="main-card">
      <h2 style={{ marginBottom: '20px' }}>History</h2>
      {history.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          No history yet. Start tracking your water intake!
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[...history].reverse().map((entry) => (
            <div
              key={entry.date}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                background: '#f5f5f5',
                borderRadius: '8px'
              }}
            >
              <div>
                {new Date(entry.date + 'T00:00:00').toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4fc3f7' }}>
                  {entry.percent}%
                </div>
                <CircularProgress size={48} stroke={5} percentage={entry.percent} showLabel={false} />
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}