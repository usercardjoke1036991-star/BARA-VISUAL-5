# BARA-VISUAL-5 — Bara IDE (v0.5.0)

Maqueta visual interactiva de **Bara IDE — AETHER-Ω (v0.5.0)** construida a partir de `BARA-VISUAL-4`. Opera 100 % en local con datos simulados (mock), sin llamadas a APIs externas ni almacenamiento de claves, optimizada para pantallas de **1366×768** (y **1280×720**) en equipos modestos (sin animaciones pesadas, blur costosos ni dependencia de GPU).

---

## Cómo ejecutar la maqueta

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar el servidor de desarrollo (http://localhost:3000)
npm run dev

# 3. Ejecutar pruebas unitarias de la lógica (TokenKind::Diagnostic, modo estricto, versión, URLs)
npx --yes tsx --test bara-logic.test.js
```

### Ruta interactiva `/demo`
Visita **`http://localhost:3000/demo`** (o pulsa el botón **`Demo`** en la barra de título) para mostrar la barra de disparadores rápidos que permite activar con un clic cada estado requerido:
- **Layout normal** (`editorFirst = false`)
- **Layout invertido (`⇄`)** (`editorFirst = true`)
- **Menú `»` abierto** (portal en `document.body` desplegado hacia arriba)
- **Aviso rojo** («Este cambio NO está verificado» con `role="status"`)
- **Verificado** («✓ Verificado por el kernel»)
- **Banner de error** («Sólo se aceptan URL https o ssh de github.com» descartable con `×`)
- **Diagnósticos** (`TokenKind::Diagnostic` en `samples/genesis.bara` + panel `Problemas`)
- **Modo estricto** (en `Ajustes`, bloqueando `Aceptar` en cambios no verificados)

---

## Mapa de los 8 puntos implementados (archivos y funciones)

1. **Layout intercambiable (`⇄` y `Ctrl+Alt+E`)**
   - **Archivos**: `index.html` (`#btn-swap-layout`), `bara.css` (`.workspace-split`, `.workspace-split.editor-first`, `.editor-pane { min-width: 480px }`), `bara.js` (`toggleEditorFirstLayout()`).
   - **Detalle**: Alterna entre «chat a la izquierda + editor a la derecha» y «editor a la izquierda + chat a la derecha», guardando la preferencia en `localStorage` (`editorFirst`) y garantizando un ancho mínimo de `480 px` para el editor a `1366×768`.

2. **Controles de ventana (`▬ □ ×`) y menú `»` ("Más pestañas") en portal**
   - **Archivos**: `index.html` (`.window-controls`: `#win-btn-min`, `#win-btn-max`, `#win-btn-close`), `bara.js` (`openMoreTabsPortal()`, `closeMoreTabsPortal()`), `bara-logic.js` (`MORE_TABS_ITEMS`), `bara.css` (`.more-tabs-portal`).
   - **Detalle**: El botón `»` (`#bp-more-tabs-btn`) del panel inferior renderiza el menú en un portal directo sobre `document.body` con `position: fixed`, abriéndose **hacia arriba** sin recorte con las opciones: **Bilattice**, **Telemetría**, **Topología**, **Ledger**, **Lienzo** y **Núcleo**. Se cierra con `Esc` o clic fuera y devuelve el foco al botón `»`.

3. **Barra de estado (`v0.5.0`)**
   - **Archivos**: `bara-logic.js` (`APP_VERSION = 'v0.5.0'`, `OPEN_FILE_PATH = 'samples/genesis.bara'`), `package.json` (`"version": "0.5.0"`), `index.html` (`footer.status`), `bara.js` (`syncHeaderAndStatusBar()`).
   - **Detalle**: Muestra `listo` a la izquierda, el archivo activo `samples/genesis.bara`, el contador de diagnósticos `⚠ 3`, la pastilla verde `kernel activo` y la versión `v0.5.0` leída desde una única constante centralizada.

4. **Aviso rojo de cambio NO verificado (`role="status"`)**
   - **Archivos**: `bara.js` (`buildPatchReviewCardHtml()`), `bara-logic.js` (`computeAcceptButtonState()`), `bara.css` (`.patch-review-card`, `.patch-notice-red`, `.patch-notice-green`).
   - **Detalle**: Tarjeta de revisión en el chat con diff de ejemplo, toggle para alternar entre estado **No verificado** (rojo: «Este cambio NO está verificado») y **Verificado** (verde), botones `Aceptar` y `Rechazar`, y botón `Deshacer` tras aceptar. Utiliza `role="status"` (el único `role="alert"` de la aplicación se reserva para `#topology-alert` en Topología).

5. **Banner de error descartable (`×`)**
   - **Archivos**: `index.html` (`#github-url-error-banner`), `bara-logic.js` (`ERROR_BANNER_TEXT`, `validateGithubUrl()`), `bara.js` (`setErrorBannerVisible()`).
   - **Detalle**: Muestra el banner rojo «Sólo se aceptan URL https o ssh de github.com» con botón `×` (`#btn-close-error-banner`) que lo oculta al instante.

6. **Diagnósticos del lenguaje BARA (`TokenKind::Diagnostic`)**
   - **Archivos**: `bara-logic.js` (`BARA_DIAGNOSTICS`, `validateBaraRoot()`, `validateBaraNumber()`, `detectUnclosedStringInLine()`), `bara.js` (`buildDiagnosticsEditorHtml()`, `buildProblemsTableHtml()`, `bindProblemRowEvents()`), `bara.css` (`.diag-token`, `.diag-error`, `.diag-warn`, `.diag-inline-tooltip`).
   - **Detalle**: Subrayado ondulado rojo/naranja y tooltip en el editor para los 3 casos:
     - a) `@ktbl` (línea `2:6`): «Raíz inválida: debe tener exactamente 3 consonantes»
     - b) `1.2.3` (línea `4:29`): «Número inválido»
     - c) `"Bienvenido a Bara IDE` (línea `5:24`): «Cadena sin cerrar», cortando en el salto de línea mientras las líneas `6–11` conservan su coloreado sintáctico normal.
     - Panel `Problemas` con icono `⚠`, `línea:columna` y mensaje; al hacer clic salta y resalta la línea correspondiente.

7. **Ajustes (con Modo estricto y sin claves)**
   - **Archivos**: `bara.js` (`buildSettingsScreenHtml()`), `bara-logic.js` (`DEFAULT_TRUSTED_FOLDER`, `computeAcceptButtonState()`).
   - **Detalle**: Incluye nota de tipografía (`Tipografía mínima 14 px en el texto legible · contraste AA · Esc cierra paneles`), toggle de **Autoguardado**, **Carpeta de confianza** (`C:/Users/Vexor/Downloads/bara-ide`), nuevo toggle **Modo estricto** («Bloquea Aceptar en cambios no verificados», apagado por defecto; al encenderse deshabilita `Aceptar` en el aviso rojo con su explicación), selector simulado de **Proveedor de IA** (`DeepSeek` / `Modelo local (GGUF)` con aviso «No hay pesos locales cargados»), aviso de seguridad «La clave se configura de forma segura fuera de esta maqueta» (sin campos de clave), y versión `v0.5.0`.

8. **Accesibilidad, rendimiento y componentes ocultos (`showAdvanced = false`)**
   - **Archivos**: `index.html` (`#adv-hidden-components`, `#adv-rail-kernel`, `#adv-rail-aether-footer`, `#adv-aether-header`), `bara-logic.js` (`SHOW_ADVANCED_DEFAULT = false`, `HIDDEN_ADVANCED_COMPONENTS`), `bara.css` (`:focus-visible`, fuente mínima `14 px`, `13 px` en barra de estado).
   - **Detalle**: Los componentes avanzados de `VISUAL-4` (`Belnap`, `AETHER`, internos del kernel y `Kernel` en el rail) permanecen en la estructura detrás de `showAdvanced = false`.
