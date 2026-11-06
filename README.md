# Bara IDE — Maqueta Visual (BARA-VISUAL-5)

Maqueta visual interactiva de **Bara IDE v0.5.0**, construida sobre la base íntegra de **BARA-VISUAL-4** (`commit 4d2e7bf`) y añadiendo las mejoras visuales e interactivas de **BARA-VISUAL-5** sin llamadas a APIs, modelos externos, claves reales ni CDNs.

**Ancho mínimo recomendado: 1280 px** (optimizado para pantallas de `1366×768` con escalado de Windows del `125 %` y portátiles modestos sin GPU dedicada). Por debajo de `1024 px` (`@media (max-width: 1023px)`), se muestra la franja superior discreta `#narrow-width-notice`: *«Ancho recomendado: 1280 px o más»*.

---

## Arquitectura y Archivos

- **`index.html`**:
  - Contenedor principal `#app-shell` (`.shell`, `.shell.editor-first`).
  - Barra de título (`header.titlebar`) con botón `⇄` `#btn-swap-layout` y controles de ventana `#win-btn-min` (`▬`), `#win-btn-max` (`□`) y `#win-btn-close` (`×`).
  - Franja discreta de ancho reducido `#narrow-width-notice` (`.narrow-width-notice`).
  - Banner de error descartable `#github-url-error-banner` (*«Sólo se aceptan URL https o ssh de github.com»*) con botón `×` `#btn-close-error-banner` y cierre mediante la tecla `Esc` (sin botón «Reintentar»).
  - Rail lateral (`aside.rail`) con las 6 vistas principales de VISUAL-4 (`Archivos`, `Buscar`, `Chat`, `Registros`, `Herramientas`, `Ajustes`).
  - Área dinámica de pantallas `#screen-viewport`.
  - Barra de estado (`footer.status`) con `#status-problemas-trigger`, contador total `#status-diag-counter` (`#status-diag-text` `Σ 3` y tooltip `#status-total-tooltip`), pastilla verde `.status-pill-green` (`kernel activo`) y versión `#status-version-tag` (`v0.5.0`).
  - Contenedor oculto `#hidden-advanced-modules` (`hidden aria-hidden="true"`) y selector de las 15 pantallas `#demo-switcher` (`#demo-switcher-btn`, `#demo-active-label`, `#demo-menu`).
- **`bara.css`**:
  - Estilos en CSS puro sin animaciones pesadas ni `backdrop-filter`.
  - `@media (min-width: 1280px)`: el panel del editor (`#screen-viewport > aside.editor-pane`) garantiza `min-width: 480px`.
  - `@media (max-width: 1120px)`: la barra de estado (`.status`) compacta sus espacios (`gap: 8px; padding: 0 8px`) y aplica `max-width: 175px` con elipsis en `.status-truncate`.
  - `@media (max-width: 1100px)`: oculta `.tabbar-save-hint` y `.bp-tab-kernel-suffix` para que la pestaña *«Terminal kernel»* se abrevie a *«Terminal»* conservando `title="Terminal kernel"`.
  - `@media (max-width: 1023px)`: muestra `#narrow-width-notice`.
- **`bara.js`**:
  - Renderizado e interacción de las 15 pantallas de VISUAL-4 (`SCREENS["01"]` a `SCREENS["15"]`) más los añadidos de VISUAL-5.
  - Mantiene en código los módulos avanzados ocultos tras `showAdvanced = false` (`SHOW_ADVANCED_DEFAULT = false`, `HIDDEN_ADVANCED_COMPONENTS`: `belnapBilattice`, `aetherHeader`, `kernelInternals`, `kernelRailItem`).
- **`bara-logic.js`**:
  - Lógica pura desacoplada y verificada mediante `node:test`:
    - `APP_VERSION`, `DEFAULT_TRUSTED_FOLDER`, `ERROR_BANNER_TEXT`, `SHOW_ADVANCED_DEFAULT`, `HIDDEN_ADVANCED_COMPONENTS`, `MORE_TABS_ITEMS`
    - `getVisibleMoreTabs(showAdvanced)`
    - `INITIAL_PROBLEMS`, `computeProblemsSummary(problemsList)`, `filterProblems(problemsList, severityFilter)`
    - `filterRegistros(registrosList, levelFilter, queryText)`
    - `computeAcceptButtonState({ patchVerified, strictMode })`
    - `computeReviewCardState({ reviewCardVerified, strictMode, unverifiedAccepted, unverifiedRejected })`
    - `applyReviewCardAction(action, state, registros, backupTimestamp)`
    - `getNextProblem(problemsList, currentProblemId, direction)`
    - `SCREENS_WITH_BOTTOM_PANEL`, `UNAVAILABLE_BOTTOM_PANEL_TOAST`
    - `validateGithubUrl(url)`
- **`bara-logic.test.js`**: Pruebas unitarias ejecutables con `node --test`.

---

## Funcionalidades de BARA-VISUAL-5 (sobre VISUAL-4)

1. **Layout intercambiable (`#btn-swap-layout` / `Ctrl+Alt+E` / `toggleEditorFirstLayout()`)**:
   - Alterna la clase `.editor-first` en `#app-shell` entre *Chat a la izquierda + Editor a la derecha* y *Editor a la izquierda + Chat a la derecha*.
   - Persiste la preferencia en `localStorage` bajo la clave `editorFirst`.
2. **Controles de ventana (`▬ □ ×`)**:
   - Botones `#win-btn-min`, `#win-btn-max` y `#win-btn-close` en la barra de título.
3. **Barra de estado y contadores coherentes**:
   - Un único origen de datos (`activeProblems` inicializado desde `INITIAL_PROBLEMS` y calculado con `computeProblemsSummary(activeProblems)`) alimenta simultáneamente `#status-problemas-trigger` (*«3 problemas · ⚠ 1 aviso · ✖ 1 error · ℹ 1 info»*), el contador neutro `#status-diag-counter` (`Σ 3` con `aria-label` y tooltip `#status-total-tooltip` *«3 problemas en total (1 aviso, 1 error, 1 info)»*), la pestaña `#bp-tab-problemas` (*«Problemas (3)»*) y las filas del panel inferior.
   - Al descartar un problema con `.btn-dismiss-problem` (`dismissProblemById(probId)`), todos los contadores se actualizan a la vez.
4. **Tarjeta «Revisión de cambio · HELLO.bara» (`#chat-review-card`, `buildChatReviewCardHtml()`)**:
   - Mostrada en el Chat (`03` y `11`) y en `06` debajo de la respuesta del asistente, con pastilla de estado `#review-card-status-pill` y bloque de aviso `#unverified-patch-notice` con `role="status"` (no `role="alert"`).
   - **Estado `No verificado`**: muestra el aviso rojo *«Este cambio NO está verificado»* y los botones `Aceptar` (`#btn-unverified-accept`) y `Rechazar` (`#btn-unverified-reject`). Si `Modo estricto` está activo, `Aceptar` se deshabilita y muestra `#strict-mode-block-msg`: *«Modo estricto: verifica antes de aceptar»*.
   - **Tras pulsar `Aceptar`**: se ocultan `Aceptar` y `Rechazar`, aparece únicamente el botón `Deshacer` (`#btn-unverified-undo`) y se añade en `Registros` la línea `[INFO] Cambio aceptado en HELLO.bara · respaldo 2026-11-06_1033`.
   - **Tras pulsar `Rechazar`**: la tarjeta pasa al estado `Rechazado` (pastilla gris `.chip.chip-muted`), se ocultan `Aceptar` y `Rechazar`, y se muestra un único botón `Deshacer rechazo` (`#btn-unverified-undo-reject`). Al pulsarlo, la tarjeta vuelve a `No verificado` con `Aceptar` y `Rechazar`, y añade en `Registros` `[INFO] Rechazo deshecho en HELLO.bara` sin borrar ninguna línea previa.
5. **Panel inferior plegable (`#bottom-dock`) y atajo `Ctrl+J` (`toggleBottomPanel()`)**:
   - El panel inferior (`#bottom-dock`) mide `240 px` de alto desplegado y `36 px` plegado (mostrando las pestañas `#bp-tab-problemas`, `#bp-tab-registros`, `#bp-tab-terminal` y `#bp-more-tabs-btn` `»`).
   - Se pliega y despliega con `#bp-btn-minimize` (`▬`) o con `Ctrl+J`.
   - `Ctrl+J` abre y pliega el panel inferior en todas las pantallas donde existe (`03`, `04`, `05`, `06`, `07`, `08`, `09`, `10`, `11`, `12` — definidas en `SCREENS_WITH_BOTTOM_PANEL`). En las pantallas sin panel inferior por diseño de V4 (`01`, `02`, `13`, `14`, `15`), `Ctrl+J` muestra un toast (`UNAVAILABLE_BOTTOM_PANEL_TOAST`: *«Panel inferior no disponible en esta vista»*) sin cambiar de pantalla.
   - Por debajo de `1100 px` de ancho, el panel inferior arranca plegado (`bottomPanelFolded = window.innerWidth < 1100`).
   - El botón `»` (`#bp-more-tabs-btn`) abre el menú en portal `#more-tabs-portal` (`openMoreTabsPortal()`) con las opciones `Problemas`, `Registros`, `Terminal kernel`, `Topología` y `Lienzo` (`getVisibleMoreTabs(false)`), navegables con `↑`/`↓`, `Enter` y `Esc`.
6. **Panel Problemas interactivo y foco tras saltar a una línea**:
   - Chips de filtro `#problems-filter-bar` (`.prob-filter-chip`: `Todos`, `Errores`, `Avisos`, `Info`).
   - Los mensajes (`.problem-msg-text`) llevan elipsis por ancho (`text-overflow: ellipsis; white-space: nowrap`) y muestran el texto completo en `.problem-msg-tooltip`.
   - Al hacer clic o pulsar `Enter` en una fila `.problem-row`, `window.BaraIDE.jumpToLine(file, line, probId)` abre el archivo y resalta la línea durante `1,5 s`; al terminar el resaltado, devuelve el foco a la fila de Problemas desde la que se saltó (`focusProblemRowById(probId)`).
   - `F8` o `Alt+↓` salta al siguiente problema y `Shift+F8` al anterior (`navigateProblemByStep(direction)` + `getNextProblem()`), moviendo también el foco de la fila.
7. **Registros (`12`) con filtro combinado (`getScreen12Html()`, `filterRegistros()`)**:
   - Combina los chips `.reg-filter-chip` (`Todo`, `Errores`, `Avisos`, `Info`) con el cuadro de búsqueda `#registros-filter-input` (*«Filtrar registros…»*). Si no hay coincidencias, muestra `#registros-empty-msg` (*«Sin registros que coincidan»*).
8. **Git (`10`) y banner de error de URL de GitHub**:
   - En `10 · Git`: tarjeta de `Archivos cambiados` (con `.env` marcado como `secreto`), tarjeta de `Mensaje del commit` (el botón `Preparar commit…` abre `#git-commit-modal` con el aviso `.env — Parece un secreto: no se incluirá salvo que lo marques.`) y tarjeta `URL remota (GitHub https / ssh)` con `#git-remote-url-input` y `#btn-verify-remote-url`.
   - Si la URL remota no pertenece a `github.com` (`validateGithubUrl()`), se muestra el banner superior `#github-url-error-banner` que se cierra con `#btn-close-error-banner` (`×`) o con `Esc`.
9. **Ajustes (`13`) y Chat Composer**:
   - En la columna izquierda de `13 · Ajustes` (`getScreen13Html()`): interruptores `#toggle-offline` (`Offline`), `#toggle-gguf` (`GGUF`), `#toggle-strict-mode` (`Modo estricto`, guardado en `localStorage` bajo `strictMode`) y `#toggle-autosave` (`Autoguardado`, guardado en `localStorage` bajo `autosave`), selector `#settings-provider-select` (`DeepSeek` / `Modelo local (GGUF)`), `Modelo`, `Clave conexión` (`20` puntos `••••••••••••••••••••` en `.field.mono`), casilla `#label-remember-key` / `#check-remember-key` (*«Recordar clave en llavero local»*, desmarcada por defecto justo debajo de `Clave conexión`), botones `Listar modelos` / `Probar conexión` y `Raíz de la API`.
   - En la columna derecha de `13 · Ajustes`: tarjetas `Avanzado` (`Temperatura`, `Máximo de tokens`, `Prompt del sistema`), `Carpeta de confianza` (`#trusted-folder-input`, `#btn-change-trusted-folder`) y `Ajustes de interfaz` (`Tamaño de letra`, `Tema`, `Versión`).
   - En la caja de escribir del Chat (`COMPOSER_HTML`): casilla `#auto-apply-checkbox` (`Auto-Apply`), desmarcada por defecto.
10. **Pantalla `15 · Archivos sin guardar` (`SCREENS["15"]`)**:
    - Muestra el modal `Tienes 2 archivos sin guardar` (`HELLO.bara` y `genesis.bara`) con los botones `Cancelar`, `Descartar` y `Guardar` (`data-modal15`).

---

## Ajustes aceptados frente a V4

1. **`Auto-Apply` desmarcado por defecto**: En la caja de escribir del Chat (`COMPOSER_HTML`, `#auto-apply-checkbox`), `Auto-Apply` está desmarcado por defecto.
2. **Colores de severidad en el editor**: En `buildEditorWithDiagnosticsHtml()`, los diagnósticos en el código y en el gutter emplean estilos diferenciados por severidad:
   - Información (`info`): `.diag-info` y `.gutter-info` (azul `#6ca0dc`, línea 2 de `HELLO.bara`).
   - Aviso (`aviso`): `.diag-warn` y `.gutter-warn` (amarillo `#c9a227`, línea 4 de `HELLO.bara`).
   - Error (`error`): `.diag-error` y `.gutter-err` (rojo `#c45c5c`, línea 12 de `genesis.bara`).
3. **Contenido de 14 líneas de `genesis.bara`**: Al seleccionar la pestaña `genesis.bara` o saltar al error `genesis.bara:12:1` desde el panel `Problemas`, el editor muestra el archivo `src/genesis.bara` de 14 líneas con `modulo genesis_engine`, `tipo TipoRuta`, `funcion validar_entorno()`, `funcion conectar_kernel()` y el token con error `ContratoA :: verificar_firma()` en la línea 12.

---

## Capturas en `screenshots/` (1366×768)

- `a_chat_revision_no_verificado.png`: Pantalla `03 · Chat + Editor` con la tarjeta «Revisión de cambio · HELLO.bara» en estado `No verificado`, aviso rojo y botones `Aceptar` y `Rechazar`.
- `b_chat_revision_modo_estricto.png`: Tarjeta «Revisión de cambio · HELLO.bara» con `Modo estricto` activo y `Aceptar` bloqueado con el mensaje *«Modo estricto: verifica antes de aceptar»*.
- `c1_tras_aceptar_deshacer.png`: Tarjeta «Revisión de cambio · HELLO.bara» tras pulsar `Aceptar`, mostrando únicamente el botón `Deshacer`.
- `c2_tras_aceptar_registros.png`: Pestaña `Registros` del panel inferior con la línea `[INFO] Cambio aceptado en HELLO.bara · respaldo 2026-11-06_1033`.
- `d_problemas_contadores.png`: Contadores sincronizados tras pulsar `Descartar` en un problema (`2 problemas · ⚠ 0 avisos · ✖ 1 error · ℹ 1 info`, `Σ 2` y `Problemas (2)`).
- `e_ajustes_completos.png`: Pantalla `13 · Ajustes` completa con márgenes de VISUAL-4, `Clave conexión` de 20 puntos en `mono`, `Recordar clave en llavero local` desmarcado debajo, `Modo estricto`, `Autoguardado`, `Avanzado`, `Carpeta de confianza` y `Ajustes de interfaz`.
- `f_menu_mas_abierto.png`: Menú `»` (`#more-tabs-portal`) abierto mostrando `Problemas`, `Registros`, `Terminal kernel`, `Topología` y `Lienzo`.
- `g_banner_error_git.png`: Pantalla `10 · Git` con el modal `Confirmar commit` cerrado, la tarjeta de URL remota visible con `https://gitlab.com/vexor/genesis_engine.git` y únicamente el banner rojo superior (`#github-url-error-banner`) con `×`.
- `h1_layout_normal.png`: Disposición normal en pantalla `11 · Problemas (panel abierto)` (Chat a la izquierda, Editor a la derecha).
- `h2_layout_invertido.png`: Disposición invertida tras pulsar `#btn-swap-layout` (`⇄`) con el Editor a la izquierda y el Chat a la derecha.
- `i_barra_estado_total_tooltip.png`: Barra de estado con el contador neutro `Σ 3` (`#status-diag-counter`) mostrando el tooltip `#status-total-tooltip` (*«3 problemas en total (1 aviso, 1 error, 1 info)»*).
- `j_ajustes_recordar_clave.png`: Pantalla `13 · Ajustes` con `Recordar clave en llavero local` (`#label-remember-key`) desmarcado por defecto justo debajo de `Clave conexión`.
- `k_chat_panel_abierto_autoscroll.png`: Chat con el panel inferior abierto (`240 px`) y auto-scroll en `#chat-messages-scroll` mostrando la tarjeta «Revisión de cambio · HELLO.bara» y la caja de escribir.
- `l_panel_inferior_plegado.png`: Panel inferior plegado (`36 px`) mediante `▬` / `Ctrl+J`, dejando visibles las pestañas `Problemas (3)`, `Registros`, `Terminal kernel` y `»`.
- `m_problemas_interactivo.png`: Panel `Problemas` interactivo tras saltar al error `genesis.bara:12:1` en el editor de 14 líneas con resaltado y diagnóstico inline.
- `n_registros_filtrados.png`: Pantalla `12 · Registros` con filtrado combinado por chips de nivel y texto en `#registros-filter-input`.
- `o_git_sin_modal.png`: Pantalla `10 · Git` con el modal `Confirmar commit` cerrado mostrando las tarjetas `Archivos cambiados`, `Mensaje del commit` y `URL remota (GitHub https / ssh)`.
- `p_rechazado_deshacer.png`: Tarjeta «Revisión de cambio · HELLO.bara» tras pulsar `Rechazar`, en estado `Rechazado` (pastilla gris `.chip-muted`), sin `Aceptar` ni `Rechazar` y con el único botón `Deshacer rechazo`.
- `q_ctrl_j_otra_pantalla.png`: Panel inferior abierto en la pantalla `10 · Git` mediante el atajo `Ctrl+J`.

---

## Verificación por línea de comandos

```bash
node --check bara.js bara-logic.js
node --test bara-logic.test.js
```
