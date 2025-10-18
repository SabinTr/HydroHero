import React from "react";

/**
 * SVG circular progress component.
 * props:
 *  - size: px (diameter)
 *  - stroke: px (circle stroke width)
 *  - percentage: number (can exceed 100)
 *  - showLabel: bool (default true)
 */
export default function CircularProgress({ size = 160, stroke = 12, percentage = 0, showLabel = true }) {
  const radius = (size - stroke) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  const displayPercentage = Math.max(0, percentage);
  const visualPercentage = Math.min(displayPercentage, 100);

  const offset = circumference - (visualPercentage / 100) * circumference;
  const strokeColor = displayPercentage > 100 ? "#FFD700" : "url(#g1)";

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id="g1" x1="0%" x2="100%">
          <stop offset="0%" stopColor="#00b4d8" />
          <stop offset="100%" stopColor="#0077b6" />
        </linearGradient>
      </defs>

      {/* Background ring */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke="#e6f7ff"
        strokeWidth={stroke}
        fill="none"
      />

      {/* Progress ring */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke={strokeColor}
        strokeWidth={stroke}
        strokeLinecap="round"
        fill="none"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${center} ${center})`}
      />

      {showLabel && (
        <text
          x={center}
          y={center}
          textAnchor="middle"
          dominantBaseline="middle"   // <- vertically center
          className="percent-text"
          style={{ fontSize: size * 0.15, fontWeight: "bold" }}
          fill="#0077b6"

        >
          {displayPercentage}%
        </text>
      )}
    </svg>
  );
}
