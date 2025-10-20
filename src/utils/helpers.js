export const getTodayKey = () => new Date().toISOString().slice(0, 10);

export function getLast7Dates() {
  const arr = [];
  const today = new Date();
  for (let i = 0; i <= 6; i++) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    arr.push(d.toISOString().slice(0, 10));
  }
  return arr;
}

export function dayShortName(dateString) {
  const d = new Date(dateString + "T00:00:00");
  return d.toLocaleDateString(undefined, { weekday: "short" }).slice(0, 3);
}