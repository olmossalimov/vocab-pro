import { useState } from "react";
import { useStore } from "./store";
import Home from "./Home";
import Learn from "./Learn";
import Practice from "./Practice";
import Progress from "./Progress";

const PAGES = ["Bosh sahifa", "O'rganish", "Test", "Natijalar"] as const;
export type Page = (typeof PAGES)[number];

export default function App() {
  const [page, setPage] = useState<Page>("Bosh sahifa");
  const store = useStore();
  return (
    <>
      <header className="wrap nav">
        <b className="brand"><span>VOCAB</span> PRO</b>
        <nav>
          {PAGES.map((p) => (
            <button key={p} className={p === page ? "on" : ""} onClick={() => setPage(p)}>{p}</button>
          ))}
        </nav>
      </header>
      <main className="wrap">
        {page === "Bosh sahifa" && <Home store={store} go={setPage} />}
        {page === "O'rganish" && <Learn store={store} />}
        {page === "Test" && <Practice store={store} />}
        {page === "Natijalar" && <Progress store={store} />}
      </main>
      <footer className="wrap foot">© 2026 VOCAB PRO · Natijalar shu brauzerda saqlanadi</footer>
    </>
  );
}
