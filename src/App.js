import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Toolbar from "./components/Toolbar";
import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import SettingsPage from "./pages/SettingsPage";
import { getTodayKey } from "./utils/helpers";
import "./App.css";

export default function App() {
  const todayKey = getTodayKey();

  const [settings, setSettings] = useState(() => {
    const s = localStorage.getItem("hydrohero_settings");
    return s ? JSON.parse(s) : { cupSize: 250, goalCups: 8 };
  });

  const [progress, setProgress] = useState(() => {
    const p = localStorage.getItem("hydrohero_progress");
    if (!p) return { date: todayKey, amountMl: 0 };
    try {
      const parsed = JSON.parse(p);
      return parsed;
    } catch {
      return { date: todayKey, amountMl: 0 };
    }
  });

  const [history, setHistory] = useState(() => {
    const h = localStorage.getItem("hydrohero_history");
    return h ? JSON.parse(h) : [];
  });

  // Initialize on load
  useEffect(() => {
    const p = progress;
    if (p.date !== todayKey) {
      const goalMl = (settings.goalCups || 1) * (settings.cupSize || 250);
      const percent = Math.round((p.amountMl / goalMl) * 100);
      const updatedHistory = [...history, { date: p.date, percent }].slice(-7);
      setHistory(updatedHistory);
      const newProgress = { date: todayKey, amountMl: 0 };
      setProgress(newProgress);
      localStorage.setItem("hydrohero_history", JSON.stringify(updatedHistory));
      localStorage.setItem("hydrohero_progress", JSON.stringify(newProgress));
    } else {
      localStorage.setItem("hydrohero_progress", JSON.stringify(p));
      localStorage.setItem("hydrohero_history", JSON.stringify(history));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("hydrohero_progress", JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem("hydrohero_history", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem("hydrohero_settings", JSON.stringify(settings));
  }, [settings]);

  // Auto-check for day change
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
    }, 60000);
    return () => clearInterval(interval);
  }, [progress, history, settings]);

  const goalMl = (settings.goalCups || 0) * (settings.cupSize || 0);
  const percentToday = goalMl > 0 ? Math.round((progress.amountMl / goalMl) * 100) : 0;

  const handleAddWater = () => {
    const addMl = settings.cupSize || 0;
    setProgress((prev) => {
      const newAmount = prev.amountMl + addMl;
      const updated = { ...prev, amountMl: newAmount };
      localStorage.setItem("hydrohero_progress", JSON.stringify(updated));
      return updated;
    });
  };

  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <div className="outer">
          <div className="inner">
            <Layout>
              <Routes>
                <Route
                  path="/"
                  element={
                    <HomePage
                      progress={progress}
                      settings={settings}
                      onAddWater={handleAddWater}
                      percentToday={percentToday}
                      history={history}
                      todayKey={todayKey}
                      goalMl={goalMl}
                    />
                  }
                />
                <Route
                  path="/history"
                  element={<HistoryPage history={history} />}
                />
                <Route
                  path="/settings"
                  element={
                    <SettingsPage
                      settings={settings}
                      onSave={handleSaveSettings}
                    />
                  }
                />
                <Route path="*" element={<div className="error-page">Page Not Found</div>} />
              </Routes>
              <Toolbar />
            </Layout>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}