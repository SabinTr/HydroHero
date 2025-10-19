import React from "react";
import CircularProgress from "./CircularProgress";
import { getLast7Dates, dayShortName } from "../utils/helpers";

export default function WeeklyStats({ history, percentToday, todayKey }) {
  return (
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
  );
}