import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Toolbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <footer className="toolbar">
      <button 
        className="tool-btn"
        onClick={() => navigate('/settings')}
      >
        ⚙️ Settings
      </button>
      <button 
        className="tool-btn"
        onClick={() => {
          if (location.pathname === '/history') {
            navigate('/');
          } else {
            navigate('/history');
          }
        }}
      >
        📊 {location.pathname === '/history' ? 'Home' : 'History'}
      </button>
    </footer>
  );
}