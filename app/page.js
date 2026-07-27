"use client";

import { useMemo, useState } from "react";
import products from "../data/products.json";

const money = (n) => new Intl.NumberFormat("es-MX", {
  style: "currency", currency: "MXN", maximumFractionDigits: 0
}).format(n);

function Price({ cost, compact = false }) {
  const total = Math.round(cost * 1.12);
  return (
    <div className={compact ? "price compact" : "price"}>
      <span>{money(total)}</span>
      <small>o 6 pagos de {money(Math.ceil(total / 6))}</small>
    </div>
  );
}

export default function Home() {
  const [filter, setFilter] = useState("Todo");
  const [selected, setSelected] = useState(null);
  const [months, setMonths] = useState(6);
  const categories = ["Todo", ...new Set(products.map((p) => p.category))];
  const visible = useMemo(() => filter === "Todo" ? products : products.filter((p) => p.category === filter), [filter]);
  const total = selected ? Math.round(selected.cost * 1.12) : 0;

  return (
    <main>
      <nav>
        <a className="brand" href="#inicio"><span>m.</span> Cosas nuevas y cosas bien cuidadas</a>
        <a className="nav-link" href="#como-funciona">Cómo funciona</a>
      </nav>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">Una venta entre conocidos</p>
          <h1>Cosas nuevas. Otras listas para una <em>segunda historia.</em></h1>
          <p className="intro">Tecnología nueva y bien cuidada, con pagos cómodos entre nosotros.</p>
          <a className="primary" href="#catalogo">Ver lo que hay <span>↓</span></a>
        </div>
        <div className="hero-note">
          <span className="scribble">sin prisas</span>
          <div className="note-card">
            <p>Pagos flexibles</p>
            <strong>3, 4 o 6 meses</strong>
            <small>Dependiendo de cada persona.</small>
          </div>
        </div>
      </section>

      <section className="catalog" id="catalogo">
        <header>
          <div><p className="eyebrow">Disponibles por ahora</p><h2>Encuentra algo para ti</h2></div>
          <p className="count">{visible.length} {visible.length === 1 ? "cosa" : "cosas"}</p>
        </header>
        <div className="filters">
          {categories.map((c) => <button key={c} className={filter === c ? "active" : ""} onClick={() => setFilter(c)}>{c}</button>)}
        </div>
        <div className="grid">
          {visible.map((p, i) => (
            <article className="product" key={p.asin} style={{"--accent": p.accent}}>
              <button className="image-wrap" onClick={() => {setSelected(p); setMonths(6)}} aria-label={`Ver ${p.name}`}>
                <span className={`tag condition-${p.condition === "Nuevo" ? "new" : "used"}`}>{p.condition}</span>
                <img src={p.image} alt={p.name} onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.nextSibling.style.display = "grid"; }} />
                <span className="fallback" aria-hidden="true">{p.name.split(" ")[0]}</span>
                <span className="number">0{i + 1}</span>
              </button>
              <div className="product-copy">
                <p className="category">{p.category}</p>
                <h3>{p.name}</h3>
                <p>{p.line}</p>
                <div className="card-bottom">
                  <Price cost={p.cost} compact />
                  <button className="round" onClick={() => {setSelected(p); setMonths(6)}} aria-label="Ver detalles">↗</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="honest">
        <div><p className="eyebrow">Una nota honesta</p><h2>No es una tienda. Soy yo despejando espacio.</h2></div>
        <p>La mayoría está nueva. Dell y Bose ya tuvieron uso, pero puedes verlos, probarlos y preguntar todo antes de decidir.</p>
      </section>

      <section className="promise" id="como-funciona">
        <p>La idea es sencilla</p>
        <div className="promise-grid">
          <article><b>01</b><h3>Lo ves</h3><p>Fotos, datos y referencia original.</p></article>
          <article><b>02</b><h3>Hablamos</h3><p>Resolvemos condición, entrega y dudas.</p></article>
          <article><b>03</b><h3>Pagas cómodo</h3><p>De 3 a 6 meses, según acordemos.</p></article>
        </div>
      </section>

      <footer><span className="brand"><span>m.</span> Cosas nuevas y cosas bien cuidadas</span><p>Hecho para compartir entre personas de confianza · México</p></footer>

      {selected && (
        <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setSelected(null)}>
          <section className="modal" role="dialog" aria-modal="true" aria-label={selected.name}>
            <button className="close" onClick={() => setSelected(null)}>Cerrar ×</button>
            <div className="modal-image" style={{"--accent": selected.accent}}>
              <img src={selected.image} alt={selected.name} />
              <span className={`tag condition-${selected.condition === "Nuevo" ? "new" : "used"}`}>{selected.condition}</span>
            </div>
            <div className="modal-content">
              <p className="category">{selected.category} · {selected.asin}</p>
              <h2>{selected.name}</h2>
              <p className="modal-story">{selected.story}</p>
              <ul>{selected.specs.map((s) => <li key={s}><span>✓</span>{s}</li>)}</ul>
              <div className="finance">
                <div className="finance-top"><span>Tu plan de pago</span><strong>{months} meses</strong></div>
                <input aria-label="Meses de pago" type="range" min="3" max="6" step="1" value={months} onChange={(e) => setMonths(Number(e.target.value))} />
                <div className="ticks"><span>3</span><span>4</span><span>5</span><span>6 meses</span></div>
                <div className="payment"><small>{months} pagos mensuales de</small><strong>{money(Math.ceil(total / months))}</strong><p>Total: {money(total)} · sin cargos sorpresa</p></div>
              </div>
              <div className="modal-actions">
                <a className="primary" href={`https://wa.me/?text=${encodeURIComponent(`Hola, me interesa ${selected.name}. ¿Me cuentas cómo está y qué incluye?`)}`} target="_blank" rel="noreferrer">Me interesa · WhatsApp</a>
                <a className="secondary" href={`https://www.amazon.com.mx/dp/${selected.asin}`} target="_blank" rel="noreferrer">Ver referencia original ↗</a>
              </div>
              <p className="fineprint">Precio sugerido calculado con costo de referencia + 12%. Confirma precio, condición, accesorios y plazo directamente conmigo.</p>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
