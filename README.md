# BARA-VISUAL-5 — Maqueta visual de Bara IDE (v0.5.0)

Maqueta visual navegable de **Bara IDE** construida sobre **BARA-VISUAL-4** (`commit 4d2e7bf`), conservando al 100 % su estructura, pantallas (`01` a `15`), código del editor de 6 líneas (`funcion` / `variables` / `si`), paleta, tipografía, iconos, rail, paneles, textos y espaciados, e incorporando únicamente los añadidos y correcciones de **BARA-VISUAL-5**.

## Cómo ejecutar la maqueta

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Iniciar el servidor de desarrollo (puerto `3000`):
   ```bash
   npm run dev
   ```
3. Abrir en el navegador:
   ```text
   http://localhost:3000
   ```
4. Ejecutar las pruebas unitarias de la lógica pura:
   ```bash
   npm test
   ```

---

## Cambios en esta ronda (puntos 1 a 3)

1. **Barra de estado: contador total neutro `Σ 3` con tooltip y `aria-label`** — `bara-logic.js` (`computeProblemsSummary`), `index.html` (`#status-diag-counter`, `#status-total-tooltip`), `bara.css` (`.status-total-counter`, `.status-total-tooltip`), `bara.js` (`syncShellAdditions`):
   - Cambiado el icono del contador total de `⚠ 3` a `Σ 3` para que no parezca contradecir a `⚠ 1 aviso`.
   - Añadido tooltip visible, `title` y `aria-label`: **«3 problemas en total (1 aviso, 2 errores)»**.
   - Sigue calculándose desde `activeProblems` (`computeProblemsSummary`) y se actualiza junto con el resto de contadores al pulsar `Descartar`.

2. **Ajustes: recolocar «Recordar clave en llavero local»** — `bara.js` (`getScreen13Html`):
   - Movida la casilla **«Recordar clave en llavero local»** desde la tarjeta `Avanzado` hasta justo debajo del campo **«Clave conexión»** (columna izquierda).
   - Se mantiene desmarcada por defecto (`rememberKey = false`) y no se ha cambiado ningún otro control de sitio.

3. **Panel inferior plegable + auto-scroll a la tarjeta «Revisión de cambio»** — `bara.js` (`bottomPanelFolded`, `buildBottomDockHtml`, `toggleBottomPanel`, `renderScreen`, `bindScreenInteractions`):
   - El panel inferior se pliega y despliega con el botón `▬` (`#bp-btn-minimize`) y con `Ctrl+J`. Plegado (`36 px`), queda como una franja fina con las pestañas visibles (`Problemas (3) · Registros · Terminal kernel · »`) y controles (`▬ □ ×`).
   - Con el panel inferior abierto, el contenedor de mensajes del Chat (`#chat-messages-scroll`) hace auto-scroll hasta la tarjeta **«Revisión de cambio · HELLO.bara»** (`#chat-review-card`) para que el aviso rojo y los botones `Aceptar` / `Rechazar` se vean sin buscarlos, sin tapar la caja de escribir (`Escribe...`).

