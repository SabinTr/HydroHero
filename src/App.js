import React, { useState } from "react";
import "./App.css";

function App() {
  const [totalCups, setTotalCups] = useState(0);
  const messages = [
    "You got this!",
    "Keep going!",
    "Hydration hero!",
    "Awesome progress!",
    "Stay refreshed!",
    "Nice work!",
  ];
  const [message, setMessage] = useState(messages[0]);

  const handleAdd = () => {
    const newTotal = totalCups + 1;
    setTotalCups(newTotal);
    setMessage(messages[Math.floor(Math.random() * messages.length)]);
  };

  const handleSubtract = () => {
    if (totalCups > 0) {
      const newTotal = totalCups - 1;
      setTotalCups(newTotal);
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
    }
  };

  return (
    <div className="app">
      <div className="phone-frame">
        <div className="menu-button">
          <div className="menu-line"></div>
          <div className="menu-line"></div>
          <div className="menu-line"></div>
        </div>

        <div className="blue-section"></div>
       <div className="avatar">
  <div
    className="avatar-head"
    style={{
      backgroundColor:
        totalCups < 3 ? "#e0b28d" :
        totalCups < 6 ? "#f1c27d" :
        totalCups < 9 ? "#ffdab9" : "#ffe5b4",
      filter: totalCups > 6 ? "brightness(1.1)" : "brightness(0.9)"
    }}
  ></div>
  <div className="avatar-body"></div>
</div>


        <div className="tracker-card">
          <div className="total-circle">{totalCups}</div>

          <p className="cups-label">Water Intake</p>

          <div className="counter">
            <button className="counter-btn" onClick={handleSubtract}>−</button>
            <div className="cup-box">1</div>
            <button className="counter-btn" onClick={handleAdd}>+</button>
          </div>

          <p className="message">{message}</p>
          <button className="save-btn">save progress</button>
        </div>
      </div>
    </div>
  );
}

export default App;
