import { WORDS } from "./words";
import type { Store } from "./store";
import type { Page } from "./App";

export default function Home({ store, go }: { store: Store; go: (p: Page) => void }) {
  const w = WORDS[new Date().getDate() % WORDS.length];
  return (
    <section className="hero">
      <div>
        <h1>So'zlarni yodlang.<br /><span className="grad">Unutmang.</span></h1>
        <p className="muted">Har kuni oz-ozdan. Qiyin so'zlar tezroq, oson so'zlar kechroq qaytadi.</p>
        <div className="row">
          <button className="btn primary" onClick={() => go("O'rganish")}>O'rganishni boshlash ↗</button>
          <button className="btn" onClick={() => go("Test")}>Test</button>
        </div>
        <div className="stats">
          <div className="stat"><b>{store.due.length}</b><span>Takrorlash kerak</span></div>
          <div className="stat"><b>{store.studied}</b><span>O'rganilgan</span></div>
          <div className="stat"><b>{store.accuracy === null ? "—" : store.accuracy + "%"}</b><span>Aniqlik</span></div>
        </div>
      </div>
      <div className="card">
        <small className="grad">BUGUNGI SO'Z</small>
        <h2>{w.en}</h2>
        <div className="muted">{w.ph} · {w.pos}</div>
        <p>{w.uz}</p>
        <p className="ex">“{w.ex}”</p>
      </div>
    </section>
  );
}
