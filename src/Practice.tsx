import { useMemo, useState } from "react";
import { WORDS } from "./words";
import type { Store } from "./store";

const shuffle = <T,>(a: T[]) => [...a].sort(() => Math.random() - 0.5);

export default function Practice({ store }: { store: Store }) {
  const [round, setRound] = useState(0);
  const qs = useMemo(
    () => shuffle(WORDS).slice(0, 5).map((w) => ({
      w,
      opts: shuffle([w.uz, ...shuffle(WORDS.filter((x) => x.id !== w.id)).slice(0, 3).map((x) => x.uz)]),
    })),
    [round]
  );
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const restart = () => { setRound(round + 1); setI(0); setPick(null); setScore(0); };

  if (i >= qs.length)
    return (
      <div className="card center">
        <h2>Natija: {score} / {qs.length}</h2>
        <button className="btn primary" onClick={restart}>Qayta boshlash</button>
      </div>
    );

  const q = qs[i];
  const choose = (o: string) => {
    if (pick) return;
    const ok = o === q.w.uz;
    setPick(o);
    if (ok) setScore(score + 1);
    store.review(q.w.id, ok);
  };

  return (
    <div className="narrow card">
      <p className="muted">Savol {i + 1} / {qs.length}</p>
      <h2>“{q.w.en}” nimani anglatadi?</h2>
      <div className="answers">
        {q.opts.map((o) => (
          <button key={o} onClick={() => choose(o)}
            className={"answer " + (pick ? (o === q.w.uz ? "ok" : o === pick ? "no" : "") : "")}>{o}</button>
        ))}
      </div>
      <button className="btn primary" disabled={!pick} onClick={() => { setI(i + 1); setPick(null); }}>
        {i === qs.length - 1 ? "Natijani ko'rish" : "Keyingi →"}
      </button>
    </div>
  );
}
