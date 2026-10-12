import { useState } from "react";
import type { Store } from "./store";

export default function Learn({ store }: { store: Store }) {
  const [queue] = useState(() => store.due);
  const [i, setI] = useState(0);
  const [flip, setFlip] = useState(false);
  const w = queue[i];

  if (!w)
    return <div className="card center"><h2>Hozircha hammasi tayyor 🎉</h2><p className="muted">Keyinroq qaytib, yangi takrorlashlarni bajaring.</p></div>;

  const speak = () => {
    if (!("speechSynthesis" in window)) return;
    const u = new SpeechSynthesisUtterance(w.en);
    u.lang = "en-US";
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  };
  const rate = (good: boolean) => { store.review(w.id, good); setFlip(false); setI(i + 1); };

  return (
    <div className="narrow">
      <p className="muted">{i + 1} / {queue.length}</p>
      <div className="card flash" onClick={() => setFlip(!flip)}>
        {!flip ? (
          <><h2>{w.en}</h2><div className="muted">{w.ph}</div><p className="muted small">Ma'nosini ko'rish uchun bosing</p></>
        ) : (
          <><h2>{w.uz}</h2><div className="muted">{w.pos}</div><p className="ex">“{w.ex}”</p></>
        )}
      </div>
      <div className="row">
        <button className="btn" onClick={speak}>🔊 Eshitish</button>
        <button className="btn bad" disabled={!flip} onClick={() => rate(false)}>Bilmayman</button>
        <button className="btn primary" disabled={!flip} onClick={() => rate(true)}>Bilaman</button>
      </div>
    </div>
  );
}
