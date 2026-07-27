import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";

const files = ["index.html", "index.txt", "404.html"];
const directories = ["404", "admin", "_next"];

for (const file of files) {
  cpSync(`out/${file}`, file);
}

for (const directory of directories) {
  if (existsSync(`out/${directory}`)) {
    rmSync(directory, {recursive: true, force: true});
    mkdirSync(directory, {recursive: true});
    for (const entry of readdirSync(`out/${directory}`)) {
      cpSync(`out/${directory}/${entry}`, `${directory}/${entry}`, {recursive: true, force: true});
    }
  }
}

process.stdout.write("GitHub Pages actualizado en la raíz del repositorio.\n");
