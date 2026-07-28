import {readdir, readFile, writeFile} from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dataPath = path.join(root, "data", "products.json");
const productsRoot = path.join(root, "public", "products");
const supported = /\.(avif|jpe?g|png|webp)$/i;
const products = JSON.parse(await readFile(dataPath, "utf8"));

for (const product of products) {
  if (!product.folder) throw new Error(`Falta "folder" en ${product.name}`);

  const files = (await readdir(path.join(productsRoot, product.folder)))
    .filter((file) => supported.test(file))
    .sort((a, b) => a.localeCompare(b, "es", {numeric: true, sensitivity: "base"}));

  if (!files.length) throw new Error(`No hay imágenes en public/products/${product.folder}`);

  const cover = files.find((file) =>
    file.replace(/\.[^.]+$/, "").toLowerCase() === product.folder.toLowerCase()
  );
  const ordered = cover ? [cover, ...files.filter((file) => file !== cover)] : files;

  product.images = ordered.map((file) => `products/${product.folder}/${file}`);
  product.image = product.images[0];
  console.log(`${product.name}: ${product.images.length} fotos`);
}

await writeFile(dataPath, `${JSON.stringify(products, null, 2)}\n`);
