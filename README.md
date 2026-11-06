# BARA-VISUAL-5 — Maqueta visual de Bara IDE (v0.5.0)

Maqueta visual navegable de **Bara IDE** construida sobre **BARA-VISUAL-4** (`commit 4d2e7bf`), respetando su estructura, pantallas (`01` a `15`), código del editor de 6 líneas (`funcion` / `variables` / `si`), paleta, tipografía, iconos, rail, paneles, textos y espaciados, e incorporando los **Añadidos** y **Ajustes aceptados** respecto a `VISUAL-4 (4d2e7bf)` detallados más abajo.

## Cómo ejecutar la maqueta

> **Nota sobre servidor local (`type="module"`)**: `index.html` carga `bara.js` mediante `<script type="module" src="bara.js"></script>` (que a su vez importa `bara-logic.js`). Los navegadores bloquean la importación de módulos ES sobre el protocolo `file://` por política CORS, por lo que **es necesario servir la carpeta con el servidor HTTP local incluido (`npm start`)**.

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Iniciar el servidor local (puerto `3000`):
   ```bash
   npm start
   ```
   *(o `npm run dev`)*
3. Abrir en el navegador:
   ```text
   http://localhost:3000
   ```
4. Ejecutar las pruebas unitarias de la lógica pura:
   ```bash
   node --test bara-logic.test.js
   ```
   *(también disponible como `npm test`)*

---

## Lista completa de cambios frente a VISUAL-4 (`4d2e7bf`)

### 1. Añadidos

1. **Barra de título: Layout intercambiable (`⇄` y `Ctrl+Alt+E`) y controles de ventana (`▬ □ ×`)**:
   - Botón `⇄` (`#title-swap-layout-btn`) y atajo `Ctrl+Alt+E` para alternar el editor de lado (`editor ≥ 480 px` a `1366 px`), persistido en `localStorage` (`bara_v5_editor_left`).
   - Botones de ventana `▬ □ ×` en el extremo derecho de la barra de título.
2. **Barra de estado (`v0.5.0`, `kernel activo`, `Σ 3` y truncado en anchos estrechos)**:
   - Pastilla verde `kernel activo`, versión `v0.5.0` y contador total neutro `Σ 3` con tooltip único personalizado (`#status-total-tooltip`) y `aria-label`: `«3 problemas en total (1 aviso, 1 error, 1 info)»`.
   - En anchos estrechos (`≤ 1024 px`), los textos de la barra de estado no parten línea (`white-space: nowrap`, `text-overflow: ellipsis` y texto completo en tooltip); a `1366 px` se leen íntegros.
3. **Tarjeta «Revisión de cambio · HELLO.bara» en el Chat (`03`, `06`, `11`)**:
   - Estado `No verificado` (pastilla roja) / `Verificado` (pastilla verde) / `Rechazado` (pastilla gris).
   - Diff con líneas eliminadas (`-`) en rojo y añadidas (`+`) en verde, resumen de archivo/líneas/funciones afectadas y aviso rojo `«Este cambio NO está verificado»` con `role="status"`.
   - Botones `Aceptar` y `Rechazar` (con `Modo estricto` activo, `Aceptar` se deshabilita con `«Modo estricto: verifica antes de aceptar»`).
   - Registro en `Registros (12)` sin borrar entradas previas:
     - `Aceptar` añade `[INFO] Cambio aceptado en HELLO.bara · respaldo 2026-11-06_1033` y muestra `Deshacer`.
     - `Deshacer` conserva la línea anterior y añade `[INFO] Cambio deshecho en HELLO.bara · restaurado respaldo 2026-11-06_1033`.
     - `Rechazar` añade `[AVISO] Cambio rechazado en HELLO.bara` y marca la tarjeta como `Rechazado` (pastilla gris) sin eliminarla.
4. **Panel inferior plegable (`▬` y `Ctrl+J`) y menú `»` accesible por teclado**:
   - `Ctrl+J` y el botón `▬` pliegan/despliegan únicamente el panel inferior (`240 px` abierto, `36 px` plegado) sin cambiar de pantalla.
   - Con el panel abierto en `11`, el chat hace auto-scroll hasta la tarjeta `Revisión de cambio`.
   - Menú `»` con navegación por teclado (`↑`, `↓`, `Enter`, `Esc` devolviendo el foco a `»`). Mientras `showAdvanced = false`, solo muestra `Salidas` y `Consola de depuración` (`Bilattice`, `Ledger`, `Núcleo` y `Telemetría` permanecen en código condicionados a `showAdvanced`).
5. **Panel Problemas interactivo y contadores coherentes**:
   - Origen único de datos (`activeProblems` + `computeProblemsSummary`).
   - Chips de filtro `Todos · Errores · Avisos · Info` con contadores en vivo.
   - Filas enfocables con `Tab` y navegables con `↑` y `↓`. Al hacer clic o pulsar `Enter` sobre una fila, se abre el archivo correspondiente en el editor (`HELLO.bara` o `genesis.bara`), salta a la línea del diagnóstico, la resalta durante `1.5 s` y coloca el cursor en ella.
   - Mensajes con elipsis a `240 px` de alto y tooltip con el mensaje completo al pasar el ratón o enfocar.
   - Botón `Descartar` por fila que actualiza al mismo tiempo barra de estado, `Σ`, pestaña `Problemas`, chips y subrayados del editor.
6. **Registros (`12`) con filtros combinables**:
   - Chips `Todo` / `Errores` / `Avisos` / `Info` y buscador `«Filtrar registros…»` combinables en tiempo real, con estado vacío `«Sin registros que coincidan»`.
7. **Git (`10`) con aviso de secreto `.env`, tarjeta `URL remota`, modal de confirmación y banner descartable**:
   - Archivo `.env` marcado con pastilla `secreto` y aviso de seguridad.
   - Tarjeta `URL remota` visible y utilizable desde el inicio (el modal `Confirmar commit` solo se abre al pulsar `Preparar commit…` y se cierra con `Cancelar` o `Esc`).
   - Banner superior de error de GitHub descartable (`×`) con acción `Reintentar`.
8. **Ajustes (`13`) ampliados**:
   - Interruptores `Offline` y `GGUF` accesibles con `role="switch"`, `aria-checked`, clic, `Espacio` y `Enter`.
   - Casilla `Recordar clave en llavero local` situada justo debajo de `Clave conexión` (desmarcada por defecto).
   - Controles `Modo estricto: bloquear cambios no verificados`, `Autoguardado` y `Carpeta de confianza` en la tarjeta `Avanzado`.
9. **Asistencia (`15`)**:
   - Tarjeta adicional `Comprobación del entorno` con estado de `Git`, `GGUF local` y `Llavero del sistema`.

### 2. Ajustes aceptados respecto a VISUAL-4 (`4d2e7bf`)

1. **`Auto-Apply` desmarcado por defecto**:
   - En `VISUAL-4`, la casilla `Auto-Apply` en `Ajustes → Avanzado` aparecía marcada por defecto; en `VISUAL-5` se mantiene **desmarcada por defecto** (`autoApply = false`) por seguridad en la revisión de cambios del asistente.
2. **Accesibilidad en Topología (`09`) y campos `.field`**:
   - En `Topología (09)`, el contenedor `#topology-graph-view` usa `role="img"` con `aria-label="Grafo del proyecto: HELLO, main, ContratoA, TipoRuta, src"` en lugar de `role="alert"`.
   - Los controles `.field` muestran foco visible (`outline: 2px solid var(--green-soft)`).


