import React from "react";

export default function Toolbar({ onSettingsClick, onHistoryClick }) {
  return (
    <div className="toolbar">
      <button className="toolbar-btn" onClick={onSettingsClick}>
        ⚙️ Settings
      </button>
      <button className="toolbar-btn" onClick={onHistoryClick}>
        📜 History
      </button>
    </div>
  );
}