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

## Cambios en esta ronda (SOLO añadidos y correcciones)

1. **Tarjeta «Revisión de cambio · HELLO.bara» en el Chat** — `bara.js` (`buildChatReviewCardHtml`, pantallas `03`, `06`, `11`), `bara-logic.js` (`computeAcceptButtonState`):
   - Mostrada debajo de la respuesta del asistente en el Chat con:
     - Estado: pastilla roja **«No verificado»** o pastilla verde **«Verificado»** (alternable).
     - Diff de ejemplo con líneas quitadas en rojo (`-`) y añadidas en verde (`+`).
     - Resumen de alcance: `Archivo: HELLO.bara · Líneas: 3–6 · Funciones: main()`.
     - Aviso rojo **«Este cambio NO está verificado»** con `role="status"` (no `role="alert"`) y botones `Aceptar` y `Rechazar`.
     - Con el **Modo estricto** encendido, `Aceptar` queda deshabilitado y muestra **«Modo estricto: verifica antes de aceptar»**.
     - Tras pulsar `Aceptar`, aparece **«Deshacer»** y se añade en `Registros` (pantalla `12` y pestaña `Registros` del panel inferior) la línea `[INFO] Cambio aceptado en HELLO.bara · respaldo 2026-11-06_1033`.
   - El área de mensajes del chat cuenta con scroll interno propio para que la tarjeta quepa a `1366×768` sin tapar la caja de escribir.

2. **Contadores coherentes desde un único origen de datos** — `bara-logic.js` (`INITIAL_PROBLEMS`, `computeProblemsSummary`), `bara.js` (`activeProblems`, `buildProblemsTableHtml`, `dismissProblemById`, `syncShellAdditions`), `index.html`:
   - La barra de estado (`3 problemas · ⚠ 1 aviso · ✖ 2 errores`), el contador `⚠ 3` y el panel `Problemas (3)` leen exactamente del mismo array `activeProblems`.
   - Al pulsar `Descartar` en un problema del panel `Problemas`, todos los contadores se actualizan juntos al instante.

3. **Ajustes (pantalla `13`): añadidos sin quitar nada de lo existente** — `bara.js` (`getScreen13Html`, `bindScreenInteractions`):
   - Añadida tarjeta **«Carpeta de confianza»** con la ruta `C:/Users/Vexor/Downloads/bara-ide` y botón **«Cambiar…»**.
   - Añadido toggle **«Autoguardado»** (`#toggle-autosave`, encendido por defecto).
   - Cambiada la casilla **«Recordar clave en llavero local»** a **desmarcada por defecto**.

4. **Verificación de URL remota en Git y banner de error descartable** — `bara.js` (`SCREENS["10"]`, `#btn-verify-remote-url`), `index.html` (`#github-url-error-banner`):
   - En `Git` (pantalla `10`) se añade el campo `URL remota` y el botón **«Verificar URL remota»**, que al validar una URL que no sea de GitHub muestra el banner **«Sólo se aceptan URL https o ssh de github.com»**, descartable con `×` o `Esc`.

5. **Código del editor de VISUAL-4 intacto y componentes ocultos conservados** — `bara.js` (`buildEditorWithDiagnosticsHtml`), `index.html` (`#hidden-advanced-modules`):
   - El editor de `HELLO.bara` en `03` y `11` mantiene las 6 líneas exactas de `VISUAL-4` (`funcion` / `variables` / `si`) con subrayado ondulado y tooltip.
   - Los módulos ocultos de `VISUAL-4` (`Belnap`/`Bilattice`, `AETHER`, internos del kernel) permanecen en el código detrás de `showAdvanced = false`.
