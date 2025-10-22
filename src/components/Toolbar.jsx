import React from "react";

export default function Toolbar({ currentPage, onSettingsClick, onHistoryClick }) {
  return (
    <footer className="toolbar">
      <button 
      className="toolbar-btn" 
      onClick={onSettingsClick}
      type="button"
      >
        ⚙️ Settings
      </button>
      <button 
      className="toolbar-btn" 
      onClick={onHistoryClick}
      type="button"
      >
        📜 {currentPage === 'history' ? 'Home' : 'History'}
      </button>
    </footer>
  );
}