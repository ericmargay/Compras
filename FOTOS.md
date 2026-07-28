# Cómo añadir fotos

Guarda cada screenshot en la carpeta correspondiente. Se aceptan archivos JPG, JPEG, PNG, WebP y AVIF.

| Producto | Carpeta |
| --- | --- |
| Razer DeathAdder V3 Pro | `public/products/deathadder-v3-pro` |
| Logitech MX Master 3S | `public/products/mx-master-3s` |
| Brazo dual WALI | `public/products/wali-dual` |
| TP-Link Deco X50 | `public/products/deco-x50` |
| Logitech G915 TKL | `public/products/g915-tkl` |
| Razer Gigantus V2 | `public/products/gigantus-v2` |
| Razer BlackShark V2 Pro | `public/products/blackshark-v2-pro` |
| Dell G15 5530 | `public/products/dell-g15-5530` |
| Bose SoundLink Flex | `public/products/bose-soundlink-flex` |

Después de añadir o quitar imágenes, ejecuta:

```bash
npm run pages
```

Ese comando vuelve a leer todas las carpetas, actualiza el catálogo y genera el sitio de GitHub Pages en la raíz del repositorio. Para elegir la portada, usa como nombre de archivo el mismo nombre de la carpeta; por ejemplo `dell-g15-5530.jpg`.
