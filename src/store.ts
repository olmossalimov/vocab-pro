import { useState } from "react";
import { WORDS } from "./words";

type Rec = { box: number; due: number; seen: number; right: number };
const KEY = "vocabpro:v1";
const DAY = 864e5;
const GAP = [1 / 144, 1, 3, 7, 14, 30]; // kunlarda: 10 daqiqa, 1, 3, 7, 14, 30 kun

const load = (): Record<number, Rec> => {
  try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { return {}; }
};

export function useStore() {
  const [data, setData] = useState(load);

  const review = (id: number, good: boolean) =>
    setData((d) => {
      const r = d[id] ?? { box: 0, due: 0, seen: 0, right: 0 };
      const box = good ? Math.min(5, r.box + 1) : 0;
      const next = { ...d, [id]: { box, due: Date.now() + GAP[box] * DAY, seen: r.seen + 1, right: r.right + (good ? 1 : 0) } };
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });

  const reset = () => {
    try { localStorage.removeItem(KEY); } catch { /* ignore */ }
    setData({});
  };

  const recs = Object.values(data);
  const total = recs.reduce((a, r) => a + r.seen, 0);
  const right = recs.reduce((a, r) => a + r.right, 0);
  return {
    data, review, reset,
    due: WORDS.filter((w) => !data[w.id] || data[w.id].due <= Date.now()),
    studied: recs.length,
    mastered: recs.filter((r) => r.box >= 4).length,
    accuracy: total ? Math.round((100 * right) / total) : null,
  };
}
export type Store = ReturnType<typeof useStore>;
