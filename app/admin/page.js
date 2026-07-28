"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import initialProducts from "../../data/products.json";

const money = (n) => new Intl.NumberFormat("es-MX", {
  style: "currency", currency: "MXN", maximumFractionDigits: 0
}).format(Number(n) || 0);

export default function AdminPage() {
  const [items, setItems] = useState(initialProducts);
  const [notice, setNotice] = useState("");
  const uploadRef = useRef(null);

  useEffect(() => {
    const draft = localStorage.getItem("catalog-draft");
    if (draft) {
      try { setItems(JSON.parse(draft)); } catch {}
    }
  }, []);

  const catalogValue = useMemo(
    () => items.reduce((sum, item) => sum + Math.round((Number(item.cost) || 0) * 1.12), 0),
    [items]
  );

  const update = (index, field, value) => {
    setItems((current) => current.map((item, i) =>
      i === index ? {...item, [field]: field === "cost" ? Number(value) : value} : item
    ));
  };

  const saveDraft = () => {
    localStorage.setItem("catalog-draft", JSON.stringify(items));
    setNotice("Borrador guardado en este navegador.");
  };

  const download = () => {
    const blob = new Blob([`${JSON.stringify(items, null, 2)}\n`], {type: "application/json"});
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "products.json";
    link.click();
    URL.revokeObjectURL(link.href);
    setNotice("JSON descargado. Reemplaza data/products.json con este archivo.");
  };

  const upload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      if (!Array.isArray(parsed)) throw new Error();
      setItems(parsed);
      setNotice(`${parsed.length} productos cargados. Revisa y descarga cuando termines.`);
    } catch {
      setNotice("No pude leer ese archivo. Debe ser un JSON con una lista de productos.");
    }
    event.target.value = "";
  };

  const reset = () => {
    setItems(initialProducts);
    localStorage.removeItem("catalog-draft");
    setNotice("Restauré los datos publicados.");
  };

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <div>
          <p className="eyebrow">Panel local</p>
          <h1>Precios del catálogo</h1>
          <p>Edita el costo base; el sitio agrega automáticamente 12% y calcula las mensualidades.</p>
        </div>
        <a href="../">Ver catálogo ↗</a>
      </header>

      <section className="admin-summary">
        <div><small>Productos</small><strong>{items.length}</strong></div>
        <div><small>Valor publicado</small><strong>{money(catalogValue)}</strong></div>
        <div><small>Formato</small><strong>JSON</strong></div>
      </section>

      <section className="admin-toolbar">
        <button className="primary" onClick={saveDraft}>Guardar borrador</button>
        <button onClick={download}>Descargar JSON</button>
        <button onClick={() => uploadRef.current?.click()}>Subir JSON</button>
        <button className="quiet" onClick={reset}>Restaurar</button>
        <input ref={uploadRef} type="file" accept="application/json,.json" onChange={upload} hidden />
      </section>

      {notice && <p className="admin-notice">{notice}</p>}

      <section className="admin-list">
        {items.map((item, index) => {
          const total = Math.round((Number(item.cost) || 0) * 1.12);
          return (
            <article className="admin-row" key={item.asin}>
              <div className="admin-product">
                <span style={{background: item.accent}}>{String(index + 1).padStart(2, "0")}</span>
                <div><small>{item.asin} · {item.images?.length ?? 0} fotos</small><strong>{item.name}</strong></div>
              </div>
              <label>
                Costo base
                <span className="money-input"><b>$</b><input type="number" min="0" step="1" value={item.cost} onChange={(e) => update(index, "cost", e.target.value)} /></span>
              </label>
              <label>
                Condición
                <select value={item.condition} onChange={(e) => update(index, "condition", e.target.value)}>
                  <option>Nuevo</option>
                  <option>Seminuevo</option>
                </select>
              </label>
              <div className="admin-result"><small>Publicado</small><strong>{money(total)}</strong><span>6 × {money(Math.ceil(total / 6))}</span></div>
            </article>
          );
        })}
      </section>

      <aside className="admin-help">
        <strong>Para publicar los cambios</strong>
        <p>Descarga el JSON, reemplaza <code>data/products.json</code> y coloca tus screenshots en la carpeta de cada producto dentro de <code>public/products</code>. Después ejecuta <code>npm run pages</code>: detectará automáticamente JPG, PNG, WebP o AVIF y actualizará los archivos publicados en la raíz.</p>
      </aside>
    </main>
  );
}
