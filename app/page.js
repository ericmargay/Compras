"use client";

import { useMemo, useState } from "react";

const amazonImage = (asin) =>
  `https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=${asin}&Format=_SL1200_&ID=AsinImage&MarketPlace=MX&ServiceVersion=20070822`;

const products = [
  {
    asin: "B09ZLV2531", category: "Gaming", name: "Razer DeathAdder V3 Pro",
    line: "Ligero, preciso y hecho para jugar en serio.",
    cost: 3499, image: amazonImage("B09ZLV2531"), accent: "#c9ff62",
    specs: ["63 g ultraligero", "Sensor Focus Pro 30K", "Hasta 90 h de batería", "HyperSpeed inalámbrico"],
    story: "Una forma ergonómica muy cómoda, especialmente para manos medianas y grandes. Su peso se nota desde el primer movimiento."
  },
  {
    asin: "B0B11LJ69K", category: "Productividad", name: "Logitech MX Master 3S",
    line: "El mouse de trabajo que hace todo más fluido.",
    cost: 2399, image: "https://m.media-amazon.com/images/I/61ni3t1ryQL._AC_SL1200_.jpg", accent: "#ffb78a",
    specs: ["Sensor de 8,000 DPI", "Clicks 90% más silenciosos", "Hasta 70 días de batería", "Conecta hasta 3 equipos"],
    story: "Ideal para diseño, edición, Excel o programación. El scroll MagSpeed y la rueda lateral cambian mucho el ritmo de trabajo."
  },
  {
    asin: "B08Z6ZJCVH", category: "Setup", name: "Brazo dual WALI MATI002-W",
    line: "Más espacio en el escritorio, menos tensión en el cuello.",
    cost: 2499, image: "https://m.media-amazon.com/images/I/61zm1qcMNEL._AC_SL1200_.jpg", accent: "#8ed8ff",
    specs: ["Para 2 monitores de 13–32″", "Hasta 10 kg por brazo", "VESA 75×75 / 100×100", "Giro, inclinación y rotación"],
    story: "Acabado blanco y brazos ajustables con resorte mecánico. Libera la cubierta del escritorio y ayuda a encontrar una postura cómoda."
  },
  {
    asin: "B09VVV18D9", category: "Hogar", name: "TP-Link Deco X50 · paquete de 3",
    line: "Wi‑Fi estable en toda la casa, sin zonas muertas.",
    cost: 4999, image: amazonImage("B09VVV18D9"), accent: "#ffd768",
    specs: ["Wi‑Fi 6 AX3000", "Sistema mesh de 3 nodos", "Cobertura aprox. 600 m²", "3 puertos Gigabit por unidad"],
    story: "Una sola red que te acompaña por la casa. Se configura desde la app Deco y puede trabajar como router o punto de acceso."
  },
  {
    asin: "B085RMD5TP", category: "Gaming", name: "Logitech G915 TKL",
    line: "Mecánico, inalámbrico y sorprendentemente delgado.",
    cost: 4499, image: "https://m.media-amazon.com/images/I/91dfsjvXgIS._AC_SL1200_.jpg", accent: "#c5b6ff",
    specs: ["Formato TKL compacto", "Switches GL Linear", "LIGHTSPEED de 1 ms", "RGB LIGHTSYNC · hasta 40 h"],
    story: "Construcción de aluminio y teclas de perfil bajo. Cambia entre LIGHTSPEED y Bluetooth con un botón."
  },
  {
    asin: "B0885NTLKJ", category: "Gaming", name: "Razer Gigantus V2 · Large",
    line: "Una superficie amplia, suave y con buen control.",
    cost: 699, image: amazonImage("B0885NTLKJ"), accent: "#93e59b",
    specs: ["450 × 400 mm", "3 mm de grosor", "Tejido microtexturizado", "Base de goma antideslizante"],
    story: "Da espacio para movimientos largos sin ocupar todo el escritorio. El balance está entre velocidad y control."
  },
  {
    asin: "B08FQG96RP", category: "Audio", name: "Razer BlackShark V2 Pro",
    line: "Audio competitivo sin cable y con gran comodidad.",
    cost: 3499, image: amazonImage("B08FQG96RP"), accent: "#ff9eb0",
    specs: ["Drivers TriForce Titanium 50 mm", "THX Spatial Audio", "Micrófono desmontable", "Hasta 24 h de batería"],
    story: "Esta es la generación 2020: ligera, con aislamiento pasivo y conexión inalámbrica 2.4 GHz de baja latencia."
  },
  {
    asin: "B0C54XM58R", category: "Computadoras", name: "Dell G15 5530",
    line: "Potencia real para jugar, crear y trabajar.",
    cost: 23999, image: amazonImage("B0C54XM58R"), accent: "#74dfcf",
    specs: ["Core i5‑13450HX · 10 núcleos", "GeForce RTX 3050 6 GB", "16 GB DDR5 · SSD 512 GB", "Pantalla 15.6″ FHD 120 Hz"],
    story: "Una laptop robusta con refrigeración de doble ventilador. La configuración corresponde al enlace compartido; se confirma físicamente antes de cerrar."
  }
];

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
        <a className="brand" href="#inicio"><span>m.</span> cosas bien cuidadas</a>
        <a className="nav-link" href="#como-funciona">Cómo funciona</a>
      </nav>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">Una pequeña venta entre conocidos</p>
          <h1>Cosas buenas que merecen una <em>segunda historia.</em></h1>
          <p className="intro">Estoy dejando ir algunas cosas que compré con gusto y cuidé bien. Puedes ver los detalles con calma y, si algo te interesa, acordamos pagos cómodos entre nosotros.</p>
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

      <section className="promise" id="como-funciona">
        <p>La idea es sencilla</p>
        <div className="promise-grid">
          <article><b>01</b><h3>Lo ves con calma</h3><p>Fotos, especificaciones y el enlace original para comparar.</p></article>
          <article><b>02</b><h3>Hablamos directo</h3><p>Te cuento su estado real, qué incluye y resolvemos cualquier duda.</p></article>
          <article><b>03</b><h3>Pagas cómodo</h3><p>El precio es mi costo original + 12% por financiarlo hasta 6 meses.</p></article>
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
                <span className="tag">Condición por confirmar</span>
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
        <p>Por eso prefiero contarte tal cual cómo está cada cosa. Los precios mostrados son una propuesta inicial y las condiciones aún están pendientes de confirmar. Antes de acordar, puedes verla, probarla y preguntar todo lo que necesites.</p>
      </section>

      <footer><span className="brand"><span>m.</span> cosas bien cuidadas</span><p>Hecho para compartir entre personas de confianza · México</p></footer>

      {selected && (
        <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setSelected(null)}>
          <section className="modal" role="dialog" aria-modal="true" aria-label={selected.name}>
            <button className="close" onClick={() => setSelected(null)}>Cerrar ×</button>
            <div className="modal-image" style={{"--accent": selected.accent}}>
              <img src={selected.image} alt={selected.name} />
              <span className="tag">Condición por confirmar</span>
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
