import { WORDS } from "./words";
import type { Store } from "./store";

export default function Progress({ store }: { store: Store }) {
  return (
    <div>
      <div className="stats">
        <div className="stat"><b>{store.studied}</b><span>O'rganilgan so'zlar</span></div>
        <div className="stat"><b>{store.mastered}</b><span>O'zlashtirilgan</span></div>
        <div className="stat"><b>{store.accuracy === null ? "—" : store.accuracy + "%"}</b><span>Aniqlik</span></div>
      </div>
      <p className="muted small">O'zlashtirilgan = so'z kamida 3 marta ketma-ket to'g'ri eslab qolingan (takrorlash oralig'i 7 kun va undan ko'p).</p>
      <div className="card">
        {WORDS.map((w) => {
          const r = store.data[w.id];
          return (
            <div className="line" key={w.id}>
              <b>{w.en}</b><span className="muted">{w.uz}</span>
              <span className="tag">{r ? `${r.right}/${r.seen} · daraja ${r.box}` : "yangi"}</span>
            </div>
          );
        })}
      </div>
      <button className="btn bad" onClick={() => confirm("Barcha natijalar o'chiriladi. Davom etasizmi?") && store.reset()}>Natijalarni tozalash</button>
    </div>
  );
}
