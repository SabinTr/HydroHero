import React from "react";

export default function CircularProgress({ size = 200, stroke = 12, percentage = 0, showLabel = true }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  // Yellow when over 100%, otherwise blue
  const circleColor = percentage > 100 ? "#ffd700" : "#4fc3f7";

  return (
    <svg 
      width={size} 
      height={size}
      style={{ overflow: 'visible' }} // ðŸ‘ˆ Add this
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#e0e0e0"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={circleColor}
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
      />
      {showLabel && (
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy="0.3em"
          fontSize="22px"
          fill="#045a7d"
          fontWeight="700"
        >
          {percentage}%
        </text>
      )}
    </svg>
  );
}