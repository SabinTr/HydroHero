import React, { useEffect, useState } from "react";
import CircularProgress from "./CircularProgress";
import "./App.css";

const getTodayKey = () => new Date().toISOString().slice(0, 10); // YYYY-MM-DD

export default function App() {
  const todayKey = getTodayKey();

  // settings: cupSize (ml), goalCups
  const [settings, setSettings] = useState(() => {
    const s = localStorage.getItem("hydrohero_settings");
    return s ? JSON.parse(s) : { cupSize: 250, goalCups: 8 };
  });

  // progress stored as { date: "YYYY-MM-DD", amountMl: 0 }
  const [progress, setProgress] = useState(() => {
    const p = localStorage.getItem("hydrohero_progress");
    if (!p) return { date: todayKey, amountMl: 0 };
    try {
      const parsed = JSON.parse(p);
      // if progress is from another day, keep it (handled in init effect)
      return parsed;
    } catch {
      return { date: todayKey, amountMl: 0 };
    }
  });

  const motivationalPhrases = [
  "Keep going! 💪",
  "You’re doing great! 🌊",
  "Stay hydrated! 💧",
  "Almost there! 🌞",
  "Refreshing progress! 🩵",
  "Your body thanks you! 🫶",
  "One sip at a time! 🚰",
];

const [motivation, setMotivation] = useState("");


  // history: array of { date: "YYYY-MM-DD", percent: 0 }
  const [history, setHistory] = useState(() => {
    const h = localStorage.getItem("hydrohero_history");
    return h ? JSON.parse(h) : [];
  });

  const [settingsOpen, setSettingsOpen] = useState(!localStorage.getItem("hydrohero_settings"));
  const [cupInput, setCupInput] = useState(settings.cupSize);
  const [goalInput, setGoalInput] = useState(settings.goalCups);

  // initialize on load: if stored progress.date !== today, move it to history
  useEffect(() => {
    const p = progress;
    if (p.date !== todayKey) {
      // move the stored progress into history
      const goalMl = (settings.goalCups || 1) * (settings.cupSize || 250);
      const percent = Math.round((p.amountMl / goalMl) * 100);

      const updatedHistory = [...history, { date: p.date, percent }];
      // keep only last 7 days
      const trimmed = updatedHistory.slice(-7);
      setHistory(trimmed);
      // start new progress for today
      const newProgress = { date: todayKey, amountMl: 0 };
      setProgress(newProgress);
      // persist
      localStorage.setItem("hydrohero_history", JSON.stringify(trimmed));
      localStorage.setItem("hydrohero_progress", JSON.stringify(newProgress));
    } else {
      // ensure everything persisted
      localStorage.setItem("hydrohero_progress", JSON.stringify(p));
      localStorage.setItem("hydrohero_history", JSON.stringify(history));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  // persist changes
  useEffect(() => {
    localStorage.setItem("hydrohero_progress", JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem("hydrohero_history", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem("hydrohero_settings", JSON.stringify(settings));
  }, [settings]);

  // Auto-check for day change every minute
useEffect(() => {
  const interval = setInterval(() => {
    const currentKey = getTodayKey();
    if (progress.date !== currentKey) {
      const goalMl = (settings.goalCups || 1) * (settings.cupSize || 250);
      const percent = Math.round((progress.amountMl / goalMl) * 100);


      const updatedHistory = [...history, { date: progress.date, percent }].slice(-7);
      setHistory(updatedHistory);

      const newProgress = { date: currentKey, amountMl: 0 };
      setProgress(newProgress);

      localStorage.setItem("hydrohero_history", JSON.stringify(updatedHistory));
      localStorage.setItem("hydrohero_progress", JSON.stringify(newProgress));
    }
  }, 60000); // check every 60 seconds

  return () => clearInterval(interval);
}, [progress, history, settings]);


  // Derived values
  const goalMl = (settings.goalCups || 0) * (settings.cupSize || 0);
  const percentToday = goalMl > 0 ? Math.round((progress.amountMl / goalMl) * 100) : 0;



  // Handlers
  const handleAdd = (count = 1) => {
    // add `count` cups (multiplying by cupSize)
    const addMl = (settings.cupSize || 0) * count;
    setProgress((prev) => {
  const newAmount = prev.amountMl + addMl;
  const updated = { ...prev, amountMl: newAmount }; // no cap
  localStorage.setItem("hydrohero_progress", JSON.stringify(updated));
  return updated;
});

    const randomPhrase = motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)];
  setMotivation(randomPhrase);
  };

  

  const saveSettings = () => {
    // sanitize inputs
    const cup = Math.max(1, Math.floor(Number(cupInput) || 1));
    const goal = Math.max(1, Math.floor(Number(goalInput) || 1));
    const newSettings = { cupSize: cup, goalCups: goal };
    setSettings(newSettings);
    setSettingsOpen(false);
    // persist handled in useEffect
  };

  const finishDayNow = () => {
    // Manually push today's result to history (useful for demo)
    const percent = percentToday;
    const updatedHistory = [...history, { date: progress.date, percent }].slice(-7);
    setHistory(updatedHistory);
    // reset today's progress
    const newProgress = { date: getTodayKey(), amountMl: 0 };
    setProgress(newProgress);
    localStorage.setItem("hydrohero_history", JSON.stringify(updatedHistory));
    localStorage.setItem("hydrohero_progress", JSON.stringify(newProgress));
    alert("Saved today's result to history and reset progress (demo).");
  };

  return (
    <div className="app">
      <header className="header">
        <h1>💧HydroHero</h1>
        <p className="sub">Daily goal for drinking water</p>
      </header>
    

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
          <button className="add-btn" onClick={() => handleAdd(1)}>
            <span className="plus">＋</span>Add
          </button>

          
        </div>

        <section className="weekly">
          <h3>Weekly statistics</h3>
          <div className="week-list">
            {getLast7Dates().map((d) => {
              const entry = history.find((h) => h.date === d);
              const pct = entry ? entry.percent : (d === todayKey ? percentToday : 0);
              const dayShort = dayShortName(d);
              return (
                <div key={d} className="week-item">
                  <div className="mini-ring">
                    <CircularProgress size={56} stroke={6} percentage={pct} showLabel={false} />
                  </div>
                  <div className="day-label">{dayShort}</div>
                  <div className="pct-label">{pct}%</div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {settingsOpen && (
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
              <button className="save" onClick={saveSettings}>Save</button>
              <button className="cancel" onClick={() => setSettingsOpen(false)}>Cancel</button>
            </div>
            <p className="hint">Cup size × Goal = total ml per day</p>
          </div>
        </div>
      )}
      <div className="toolbar">
        <button className="toolbar-btn">⚙️ Settings</button>
        <button className="toolbar-btn">📜 History</button>
      </div>


    </div>
  );
}

// helpers
function getLast7Dates() {
  const arr = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    arr.push(d.toISOString().slice(0, 10));
  }
  return arr;
}

function dayShortName(dateString) {
  const d = new Date(dateString + "T00:00:00");
  return d.toLocaleDateString(undefined, { weekday: "short" }).slice(0, 3);
}
