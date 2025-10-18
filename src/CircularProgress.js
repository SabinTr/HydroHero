import React from "react";

/**
 * SVG circular progress component.
 * props:
 *  - size: px (diameter)
 *  - stroke: px (circle stroke width)
 *  - percentage: 0..100
 *  - showLabel: bool (default true)
 */
export default function CircularProgress({ size = 160, stroke = 12, percentage = 0, showLabel = true }) {
  const radius = (size - stroke) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(percentage, 100));
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <svg className="circular" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id="g1" x1="0%" x2="100%">
          <stop offset="0%" stopColor="#00b4d8" />
          <stop offset="100%" stopColor="#0077b6" />
        </linearGradient>
      </defs>

      {/* background ring */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke="#e6f7ff"
        strokeWidth={stroke}
        fill="none"
      />

      {/* progress ring */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke="url(#g1)"
        strokeWidth={stroke}
        strokeLinecap="round"
        fill="none"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${center} ${center})`}
      />

      {showLabel && (
        <g className="label" transform={`translate(${center}, ${center})`}>
          <text x="0" y="-6" textAnchor="middle" className="percent-text">{clamped}%</text>
        </g>
      )}
    </svg>
  );
}
