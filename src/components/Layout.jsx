import React from "react";

export default function Layout({ children }) {
  return (
    <div className="app">
      <header className="header">
        <h1>💧HydroHero</h1>
        <p className="sub">Daily goal for drinking water</p>
      </header>
      {children}
    </div>
  );
}