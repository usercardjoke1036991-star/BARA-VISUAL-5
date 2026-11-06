/**
 * Bara IDE — AETHER-Ω (v0.5.0)
 * BARA-VISUAL-5 interactive mock (built on BARA-VISUAL-4).
 */

import {
  APP_VERSION,
  OPEN_FILE_PATH,
  DEFAULT_TRUSTED_FOLDER,
  ERROR_BANNER_TEXT,
  SHOW_ADVANCED_DEFAULT,
  MORE_TABS_ITEMS,
  BARA_DIAGNOSTICS,
  computeAcceptButtonState,
  validateGithubUrl
} from './bara-logic.js';

const SVG = {
  folder: (size = 16) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><path d="M3 7V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V9C21 7.9 20.1 7 19 7H12L10 4H5C3.9 4 3 4.9 3 6V7Z"/></svg>`,
  filePlus: (size = 20) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>`,
  clock: (size = 16) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/></svg>`,
  cube: (size = 18) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
  search: (size = 16) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  chat: (size = 16) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`,
  clip: (size = 16) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" style="color:var(--text);flex-shrink:0"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>`,
  puzzle: (size = 20) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>`,
  network: (size = 20) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><line x1="10.5" y1="7.5" x2="6.5" y2="16.5"/><line x1="13.5" y1="7.5" x2="17.5" y2="16.5"/></svg>`,
  git: (size = 20) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>`,
  warn: (size = 18) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  help: (size = 20) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  save: (size = 16) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>`,
  close: (size = 14) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  minimize: (size = 16) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  maximize: (size = 16) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>`
};

// Application State (BARA-VISUAL-5)
const state = {
  showAdvanced: SHOW_ADVANCED_DEFAULT,
  editorFirst: false,
  strictMode: false,
  autoSave: true,
  trustedFolder: DEFAULT_TRUSTED_FOLDER,
  aiProvider: 'DeepSeek', // 'DeepSeek' | 'Modelo local (GGUF)'
  patchVerified: false,   // false = Aviso rojo NO verificado, true = Verificado verde
  patchStatus: 'pending', // 'pending' | 'accepted' | 'rejected'
  errorBannerVisible: false,
  activeDiagnosticLine: 2,
  bottomDockTab: 'problemas',
  moreTabsOpen: false
};

try {
  const savedEditorFirst = localStorage.getItem('editorFirst');
  if (savedEditorFirst !== null) {
    state.editorFirst = savedEditorFirst === 'true';
  }
  const savedStrict = localStorage.getItem('strictMode');
  if (savedStrict !== null) {
    state.strictMode = savedStrict === 'true';
  }
} catch (_) {
  // Ignore storage restrictions
}

const SIDEBAR_HTML = `<aside class="sidebar" aria-label="Explorador de proyectos">
  <div style="padding:10px 12px;border-bottom:1px solid var(--border2)">
    <div style="font-size:14px;font-weight:600;margin-bottom:6px">Proyectos</div>
    <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;color:var(--text)">
      <span style="opacity:.7">▾</span>
      ${SVG.folder(16)}
      <span>genesis_engine</span>
    </div>
    <div style="padding-left:14px;display:flex;flex-direction:column;gap:2px">
      <div style="display:flex;align-items:center;gap:8px;padding:5px 8px;border-radius:6px;background:var(--hover);color:#fff">
        <span style="color:var(--green-soft);display:inline-flex">${SVG.chat(16)}</span><span>saludo_kernel</span>
      </div>
      <div style="display:flex;align-items:center;gap:8px;padding:5px 8px;border-radius:6px;color:var(--muted)">
        <span style="display:inline-flex">${SVG.chat(16)}</span><span>Antinomia guard_01</span>
      </div>
    </div>
    <button type="button" class="btn btn-primary" style="width:100%;margin-top:8px;justify-content:center;padding:5px 10px">Nuevo chat</button>
  </div>
  <div style="flex:1;overflow:hidden;padding:10px 12px">
    <div style="font-size:14px;font-weight:600;margin-bottom:6px">Explorador</div>
    <div class="mono" style="font-size:14px;color:var(--muted)">
      <div style="display:flex;align-items:center;gap:6px;color:var(--text);margin-bottom:4px">
        <span>▾</span>${SVG.folder(16)}<span>samples</span>
      </div>
      <div style="padding-left:14px;display:flex;flex-direction:column;gap:2px">
        <div style="padding:4px 8px;border-radius:5px;background:var(--hover);color:var(--green-soft)">genesis.bara</div>
        <div style="padding:4px 8px;border-radius:5px">HELLO.bara</div>
      </div>
    </div>
  </div>
</aside>`;

const COMPOSER_HTML = `<div style="padding:8px 12px;border-top:1px solid var(--border);background:var(--rail);flex-shrink:0">
  <div style="background:var(--panel);border:1px solid var(--border);border-radius:8px;padding:8px 10px">
    <div style="color:var(--muted);margin-bottom:6px;font-size:14px">Escribe un mensaje o instrucción para Bara…</div>
    <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap">
      <div class="row">
        ${SVG.clip(16)}
        <label class="row" style="color:var(--muted);font-size:14px">
          <span class="check on">✓</span> Auto-Apply
        </label>
      </div>
      <div class="row">
        <button type="button" class="btn btn-primary" style="padding:4px 10px">Enviar</button>
        <button type="button" class="btn btn-ghost" style="padding:4px 10px">Detener</button>
      </div>
    </div>
  </div>
</div>`;

function buildTabbar(unsavedDot = true) {
  return `<div class="tabbar" role="tablist" aria-label="Archivos abiertos">
    <div class="tab active" role="tab" aria-selected="true">
      <span>${OPEN_FILE_PATH}</span>
      ${unsavedDot ? '<span class="dot" title="Sin guardar"></span>' : ''}
      <button type="button" class="x" aria-label="Cerrar pestaña ${OPEN_FILE_PATH}">${SVG.close(14)}</button>
    </div>
    <div class="tab" role="tab" aria-selected="false">
      <span>HELLO.bara</span>
      <button type="button" class="x" aria-label="Cerrar pestaña HELLO.bara">${SVG.close(14)}</button>
    </div>
    <div class="tabbar-save-hint">Guardar (Ctrl+S)</div>
  </div>`;
}

/**
 * Renders the Chat Patch Review Card (Point 4 & Point 7):
 * - Includes toggle for Verificado (verde) / No verificado (rojo)
 * - Uses role="status" (NEVER role="alert")
 * - Respects strictMode ("Bloquea Aceptar en cambios no verificados")
 * - Shows Deshacer after accepting
 */
function buildPatchReviewCardHtml() {
  const acceptState = computeAcceptButtonState({
    patchVerified: state.patchVerified,
    strictMode: state.strictMode
  });

  const toggleBtnHtml = `
    <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap">
      <strong style="font-size:14px;color:#fff">Revisión de cambio · <span class="mono">${OPEN_FILE_PATH}</span></strong>
      <button type="button" id="btn-toggle-verified-demo" class="btn btn-ghost" style="padding:3px 8px;font-size:14px" aria-label="Alternar estado verificado o no verificado">
        Estado: ${state.patchVerified ? '<span style="color:var(--green-soft)">Verificado ✓</span>' : '<span style="color:#f5bcbc">No verificado</span>'}
      </button>
    </div>
  `;

  const diffPreviewHtml = `
    <div class="mono" style="background:#08090a;border:1px solid var(--border);border-radius:6px;padding:6px 8px;font-size:14px;line-height:1.45">
      <div class="diff-del">- mostrar("hola")</div>
      <div class="diff-add">+ mostrar("kernel activo")</div>
      <div class="diff-add">+ mostrar_todo("genesis")</div>
    </div>
  `;

  if (state.patchStatus === 'accepted') {
    return `<div class="patch-review-card" id="chat-patch-card">
      ${toggleBtnHtml}
      <div class="patch-notice-green" role="status">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap">
          <span>✓ Cambio aplicado en <span class="mono">${OPEN_FILE_PATH}</span></span>
          <button type="button" id="btn-patch-undo" class="btn btn-ghost" style="padding:4px 10px">Deshacer</button>
        </div>
      </div>
    </div>`;
  }

  if (state.patchStatus === 'rejected') {
    return `<div class="patch-review-card" id="chat-patch-card">
      ${toggleBtnHtml}
      <div role="status" style="padding:6px 8px;border-radius:6px;background:#161b22;color:var(--muted);display:flex;align-items:center;justify-content:space-between">
        <span>Cambio descartado.</span>
        <button type="button" id="btn-patch-restore" class="btn btn-ghost" style="padding:3px 8px">Reabrir revisión</button>
      </div>
    </div>`;
  }

  if (!state.patchVerified) {
    return `<div class="patch-review-card" id="chat-patch-card">
      ${toggleBtnHtml}
      ${diffPreviewHtml}
      <div id="unverified-patch-notice" class="patch-notice-red" role="status">
        <div style="display:flex;align-items:center;gap:8px;font-weight:600">
          ${SVG.warn(18)}
          <span>Este cambio NO está verificado</span>
        </div>
        ${acceptState.disabled ? `<div id="strict-mode-explanation" style="font-size:14px;color:#ffd0d0;background:rgba(0,0,0,0.28);padding:4px 8px;border-radius:5px">Modo estricto activo: Bloquea Aceptar en cambios no verificados.</div>` : ''}
        <div style="display:flex;align-items:center;gap:8px;margin-top:2px;flex-wrap:wrap">
          <button type="button" id="btn-patch-accept" class="btn btn-danger" style="padding:4px 10px" ${acceptState.disabled ? 'disabled aria-disabled="true" title="Bloquea Aceptar en cambios no verificados"' : ''}>Aceptar</button>
          <button type="button" id="btn-patch-reject" class="btn btn-ghost" style="padding:4px 10px">Rechazar</button>
        </div>
      </div>
    </div>`;
  }

  return `<div class="patch-review-card" id="chat-patch-card">
    ${toggleBtnHtml}
    ${diffPreviewHtml}
    <div id="verified-patch-notice" class="patch-notice-green" role="status">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap">
        <span style="font-weight:600">✓ Verificado por el kernel</span>
        <div class="row" style="gap:6px">
          <button type="button" id="btn-patch-accept" class="btn btn-primary" style="padding:4px 10px">Aceptar</button>
          <button type="button" id="btn-patch-reject" class="btn btn-ghost" style="padding:4px 10px">Rechazar</button>
        </div>
      </div>
    </div>
  </div>`;
}

/**
 * Renders the Editor code for samples/genesis.bara with TokenKind::Diagnostic wavy underlines & tooltips (Point 6):
 * a) @ktbl -> "Raíz inválida: debe tener exactamente 3 consonantes"
 * b) 1.2.3 -> "Número inválido"
 * c) "Bienvenido a Bara IDE -> "Cadena sin cerrar", cutting at newline so lines 6–11 color normally!
 */
function buildDiagnosticsEditorHtml() {
  const activeLine = state.activeDiagnosticLine;
  const lines = [
    { num: 1, gutter: '1', html: `<span class="comment">// samples/genesis.bara — módulo principal ${APP_VERSION}</span>` },
    {
      num: 2,
      gutter: '<span class="gutter-err" title="Error en línea 2">●</span>',
      html: `<span class="kw">raiz</span> <span class="diag-token diag-error" tabindex="0" role="button" data-diag-line="2" title="Raíz inválida: debe tener exactamente 3 consonantes">@ktbl</span> ContratoGenesis {`,
      tooltip: activeLine === 2 ? `<div><span class="diag-inline-tooltip" role="status">⚠ Raíz inválida: debe tener exactamente 3 consonantes</span></div>` : ''
    },
    { num: 3, gutter: '3', html: `  <span class="kw">funcion</span> iniciar() {` },
    {
      num: 4,
      gutter: '<span class="gutter-err" title="Error en línea 4">●</span>',
      html: `    variables version_num = <span class="diag-token diag-error" tabindex="0" role="button" data-diag-line="4" title="Número inválido">1.2.3</span>`,
      tooltip: activeLine === 4 ? `<div><span class="diag-inline-tooltip" role="status">⚠ Número inválido</span></div>` : ''
    },
    {
      num: 5,
      gutter: '<span class="gutter-warn" title="Aviso en línea 5">▲</span>',
      html: `    variables saludo = <span class="diag-token diag-warn" tabindex="0" role="button" data-diag-line="5" title="Cadena sin cerrar">"Bienvenido a Bara IDE</span>`,
      tooltip: activeLine === 5 ? `<div><span class="diag-inline-tooltip warn" role="status">⚠ Cadena sin cerrar</span></div>` : ''
    },
    { num: 6, gutter: '6', html: `    <span class="kw">si</span> version_num &gt; 1 {` },
    { num: 7, gutter: '7', html: `      mostrar(<span class="str">"kernel activo"</span>)` },
    { num: 8, gutter: '8', html: `      registrar(<span class="str">"genesis listo"</span>)` },
    { num: 9, gutter: '9', html: `    }` },
    { num: 10, gutter: '10', html: `  }` },
    { num: 11, gutter: '11', html: `}` }
  ];

  const gutterHtml = lines.map(l => `<div>${l.gutter}</div>${l.tooltip ? '<div>·</div>' : ''}`).join('');
  const bodyHtml = lines.map(l => `<div class="code-line ${activeLine === l.num ? 'highlight-line' : ''}" data-line-num="${l.num}">${l.html}</div>${l.tooltip || ''}`).join('');

  return `<div class="code" id="editor-code-scroll">
    <div class="gutter">${gutterHtml}</div>
    <div class="code-body">${bodyHtml}</div>
  </div>`;
}

function buildProblemsTableHtml() {
  return `
    <div style="display:grid;grid-template-columns:32px 110px 1fr;gap:8px;padding:5px 12px;color:var(--muted);font-size:14px;border-bottom:1px solid var(--border2)">
      <span>Tipo</span><span>Línea:Col</span><span>Mensaje (TokenKind::Diagnostic)</span>
    </div>
    ${BARA_DIAGNOSTICS.map(d => `
      <div class="problem-row" role="button" tabindex="0" data-file="${d.file}" data-line="${d.line}" data-col="${d.column}" style="display:grid;grid-template-columns:32px 110px 1fr;gap:8px;padding:6px 12px;border-bottom:1px solid var(--border2);font-size:14px;cursor:pointer;align-items:center;${state.activeDiagnosticLine === d.line ? 'background:var(--hover);' : ''}">
        <span style="color:${d.severity === 'error' ? 'var(--danger)' : 'var(--warn)'};font-weight:700" aria-hidden="true">⚠</span>
        <span class="mono" style="color:var(--green-soft)">${d.line}:${d.column}</span>
        <span style="min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${d.message} <span class="mono" style="color:var(--muted)">(${d.token})</span></span>
      </div>
    `).join('')}
  `;
}

function buildBottomDockContentHtml() {
  const tab = state.bottomDockTab;
  if (tab === 'problemas') {
    return buildProblemsTableHtml();
  }
  if (tab === 'registros') {
    return `
      <div style="padding:10px 14px;font-family:var(--mono);font-size:14px;line-height:1.6;color:var(--text);">
        <div><span style="color:var(--muted)">10:31:02</span> <span style="color:var(--green-soft);font-weight:600">[INFO]</span> Archivo cargado: ${OPEN_FILE_PATH}</div>
        <div><span style="color:var(--muted)">10:31:04</span> <span style="color:var(--green-soft);font-weight:600">[INFO]</span> Kernel activo · ${APP_VERSION}</div>
        <div><span style="color:var(--muted)">10:31:40</span> <span style="color:var(--warn);font-weight:600">[DIAG]</span> 3 diagnósticos detectados por el lexer</div>
      </div>
    `;
  }
  if (tab === 'terminal') {
    return `
      <div style="padding:10px 14px;font-family:var(--mono);font-size:14px;line-height:1.6;color:var(--text);">
        <span style="color:var(--green-soft)">bara-kernel$</span> bara check ${OPEN_FILE_PATH}<br/>
        Bara IDE ${APP_VERSION} · TokenKind::Diagnostic: 3 avisos/errores<br/>
        <span style="color:var(--green-soft)">bara-kernel$</span> _
      </div>
    `;
  }
  const extraItem = MORE_TABS_ITEMS.find(i => i.id === tab);
  if (extraItem) {
    return `
      <div style="padding:12px 14px;font-size:14px;color:var(--text);display:flex;flex-direction:column;gap:6px">
        <div style="display:flex;align-items:center;gap:8px">
          <span class="chip">${extraItem.label}</span>
          <span style="color:var(--muted)">Vista acoplada del panel inferior (${APP_VERSION})</span>
        </div>
        <div>${extraItem.description}</div>
      </div>
    `;
  }
  return buildProblemsTableHtml();
}

function buildBottomDockHtml() {
  const activeTab = state.bottomDockTab;
  const extraSelected = MORE_TABS_ITEMS.find(i => i.id === activeTab);
  return `<div id="bottom-dock" style="height:175px;border-top:1px solid var(--border);background:#0a0c0d;display:flex;flex-direction:column;flex-shrink:0">
    <div style="height:34px;display:flex;align-items:center;padding:0 6px;border-bottom:1px solid var(--border);gap:4px;min-width:0">
      <button type="button" id="bp-tab-problemas" class="bp-tab" style="padding:4px 8px;border:none;background:${activeTab === 'problemas' ? 'var(--hover)' : 'transparent'};border-radius:4px;color:${activeTab === 'problemas' ? '#fff' : 'var(--muted)'};font-weight:${activeTab === 'problemas' ? '600' : 'normal'};cursor:pointer;font-size:14px;white-space:nowrap;flex-shrink:0">Problemas (3)</button>
      <button type="button" id="bp-tab-registros" class="bp-tab" style="padding:4px 8px;border:none;background:${activeTab === 'registros' ? 'var(--hover)' : 'transparent'};border-radius:4px;color:${activeTab === 'registros' ? '#fff' : 'var(--muted)'};font-weight:${activeTab === 'registros' ? '600' : 'normal'};cursor:pointer;font-size:14px;white-space:nowrap;flex-shrink:0">Registros</button>
      <button type="button" id="bp-tab-terminal" class="bp-tab" style="padding:4px 8px;border:none;background:${activeTab === 'terminal' ? 'var(--hover)' : 'transparent'};border-radius:4px;color:${activeTab === 'terminal' ? '#fff' : 'var(--muted)'};font-weight:${activeTab === 'terminal' ? '600' : 'normal'};cursor:pointer;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0;flex:0 1 auto">Terminal kernel</button>
      ${extraSelected ? `<span class="chip" style="font-size:14px;padding:1px 8px">${extraSelected.label}</span>` : ''}
      <button type="button" id="bp-more-tabs-btn" class="dock-ctrl-btn" aria-label="Más pestañas" aria-haspopup="menu" aria-expanded="${state.moreTabsOpen ? 'true' : 'false'}" title="Más pestañas (»)" style="padding:0 8px;width:auto;font-weight:700;color:var(--green-soft);border:1px solid var(--border)">»</button>
      <div style="margin-left:auto;display:flex;gap:2px;align-items:center;flex-shrink:0">
        <button type="button" id="bp-btn-minimize" class="dock-ctrl-btn" aria-label="Minimizar panel inferior" title="Minimizar panel (Ctrl+J)">▬</button>
        <button type="button" id="bp-btn-maximize" class="dock-ctrl-btn" aria-label="Maximizar panel inferior" title="Maximizar panel">□</button>
        <button type="button" id="bp-btn-close" class="dock-ctrl-btn" aria-label="Cerrar panel inferior" title="Cerrar panel (Ctrl+J)">×</button>
      </div>
    </div>
    <div id="bp-content" style="flex:1;overflow:auto">
      ${buildBottomDockContentHtml()}
    </div>
  </div>`;
}

function buildMainWorkspaceScreenHtml(includeBottomDock = true) {
  return `${SIDEBAR_HTML}
  <div class="workspace-split ${state.editorFirst ? 'editor-first' : ''}" id="workspace-split-container">
    <section class="chat-pane" aria-label="Panel de Chat">
      <div style="height:38px;display:flex;align-items:center;justify-content:space-between;padding:0 12px;border-bottom:1px solid var(--border);background:var(--rail);flex-shrink:0">
        <strong style="font-size:15px">Chat asistente</strong>
        <div class="row" style="gap:6px">
          <button type="button" class="btn btn-ghost" style="padding:3px 9px" id="chat-btn-open-ajustes">Ajustes</button>
        </div>
      </div>
      <div style="flex:1;overflow:auto;padding:10px 12px;display:flex;flex-direction:column;gap:10px">
        <div style="padding:8px 10px;background:rgba(17,24,33,.85);border:1px solid var(--border);border-radius:8px;font-size:14px;color:var(--muted)">
          <div style="color:var(--green-soft)">✓ Archivo activo: <span class="mono">${OPEN_FILE_PATH}</span></div>
          <div style="color:var(--warn)">⚠ 3 diagnósticos léxicos (TokenKind::Diagnostic)</div>
        </div>
        ${buildPatchReviewCardHtml()}
      </div>
      ${COMPOSER_HTML}
    </section>
    <aside class="editor-pane" aria-label="Editor de código">
      ${buildTabbar(true)}
      ${buildDiagnosticsEditorHtml()}
      ${includeBottomDock ? buildBottomDockHtml() : ''}
    </aside>
  </div>`;
}

function buildSettingsScreenHtml() {
  const localSelected = state.aiProvider === 'Modelo local (GGUF)';
  return `<main class="main" style="padding:16px 24px;background:#08090a;overflow:auto">
    <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px;max-width:980px">
      <div style="display:flex;align-items:center;gap:10px">
        <h1 style="margin:0;font-size:20px;color:#fff">Ajustes</h1>
        <span class="chip mono">${APP_VERSION}</span>
        <span class="chip">Tipografía mínima 14 px en el texto legible · contraste AA · Esc cierra paneles</span>
      </div>
      <button type="button" id="btn-close-ajustes" class="btn btn-ghost" aria-label="Cerrar Ajustes (Esc)">Cerrar (Esc)</button>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;max-width:980px">
      <!-- Columna 1: Editor, Carpeta de confianza y Modo estricto -->
      <div class="card" style="display:flex;flex-direction:column;gap:12px">
        <div style="font-weight:600;color:#fff;font-size:15px">Preferencias del entorno</div>

        <div style="padding:8px 10px;background:#0d1218;border:1px solid var(--border);border-radius:8px;font-size:14px;color:var(--text)">
          Tipografía mínima 14 px en el texto legible · contraste AA · Esc cierra paneles
        </div>

        <div class="row" style="justify-content:space-between">
          <div>
            <div style="font-weight:500;color:#fff">Autoguardado</div>
            <div style="color:var(--muted);font-size:14px">Guarda cambios automáticamente en el área local</div>
          </div>
          <button type="button" id="toggle-autosave" role="switch" aria-checked="${state.autoSave ? 'true' : 'false'}" aria-label="Autoguardado" class="toggle ${state.autoSave ? 'on' : ''}"></button>
        </div>

        <div style="border-top:1px solid var(--border2);padding-top:10px">
          <div class="row" style="justify-content:space-between">
            <div>
              <div style="font-weight:600;color:#fff">Modo estricto</div>
              <div style="color:var(--muted);font-size:14px">Bloquea Aceptar en cambios no verificados</div>
            </div>
            <button type="button" id="toggle-strict-mode" role="switch" aria-checked="${state.strictMode ? 'true' : 'false'}" aria-label="Modo estricto: Bloquea Aceptar en cambios no verificados" class="toggle ${state.strictMode ? 'on' : ''}"></button>
          </div>
          ${state.strictMode ? `<div role="status" style="margin-top:8px;padding:6px 10px;border-radius:6px;background:#2d1416;border:1px solid #8a3a3a;color:#f7c6c6;font-size:14px">Activo: El botón Aceptar del aviso rojo queda deshabilitado en cambios no verificados.</div>` : ''}
        </div>

        <div style="border-top:1px solid var(--border2);padding-top:10px">
          <label class="label" for="input-trusted-folder">Carpeta de confianza</label>
          <input id="input-trusted-folder" class="field mono" readonly value="${state.trustedFolder}" />
        </div>
      </div>

      <!-- Columna 2: Proveedor de IA (sin claves) y Versión -->
      <div style="display:flex;flex-direction:column;gap:14px">
        <div class="card" style="display:flex;flex-direction:column;gap:12px">
          <div style="font-weight:600;color:#fff;font-size:15px">Proveedor de IA (simulado)</div>

          <div>
            <label class="label" for="settings-provider-select">Proveedor</label>
            <select id="settings-provider-select" class="field" aria-label="Proveedor de IA">
              <option value="DeepSeek" ${!localSelected ? 'selected' : ''}>DeepSeek</option>
              <option value="Modelo local (GGUF)" ${localSelected ? 'selected' : ''}>Modelo local (GGUF)</option>
            </select>
          </div>

          ${localSelected ? `
            <div id="gguf-weights-status" role="status" class="chip-warn chip" style="align-self:flex-start;padding:6px 10px;border-radius:8px">
              ⚠ No hay pesos locales cargados
            </div>
          ` : `
            <div role="status" class="chip" style="align-self:flex-start;padding:6px 10px;border-radius:8px">
              ✓ Proveedor simulado listo (DeepSeek)
            </div>
          `}

          <div style="padding:10px 12px;background:#0d1218;border:1px solid var(--border);border-radius:8px;color:var(--muted);font-size:14px">
            La clave se configura de forma segura fuera de esta maqueta
          </div>
        </div>

        <div class="card" style="display:flex;flex-direction:column;gap:8px">
          <div style="font-weight:600;color:#fff;font-size:15px">Información de versión</div>
          <div class="row" style="justify-content:space-between">
            <span>Versión del IDE</span>
            <span class="mono" style="color:var(--green-soft);font-weight:600">${APP_VERSION}</span>
          </div>
          <div class="row" style="justify-content:space-between">
            <span>Archivo activo</span>
            <span class="mono">${OPEN_FILE_PATH}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="row" style="margin-top:14px;gap:10px">
      <button type="button" id="btn-save-settings" class="btn btn-primary">${SVG.save(16)} Guardar preferencias</button>
      <button type="button" id="btn-go-unverified-from-settings" class="btn btn-ghost">Ver aviso rojo en el Chat</button>
    </div>
  </main>`;
}

const BLUEPRINT_JSON_LINES = [
  '{',
  ' "module": "lienzo_saludo",',
  ' "label": "pipeline-saludo",',
  ' "blocks": [',
  '  {',
  '   "id": "b1",',
  '   "name": "fuente_in",',
  '   "kind": "source",',
  '   "arity": 0,',
  '   "ret": "number",',
  '   "hazard": 0.0',
  '  },',
  '  {',
  '   "id": "b2",',
  '   "name":',
  '    "transformar_saludo",',
  '   "kind": "transform",',
  '   "arity": 1,',
  '   "ret": "number",',
  '   "hazard": 0.0',
  '  },',
  '  {',
  '   "id": "b3",',
  '   "name": "guardia_firma",',
  '   "kind": "guard",',
  '   "arity": 1,',
  '   "ret": "number",',
  '   "hazard": 0.0',
  '  },',
  '  {',
  '   "id": "b4",',
  '   "name": "sumidero_out",',
  '   "kind": "sink",',
  '   "arity": 1,',
  '   "ret": "void",',
  '   "hazard": 0.0',
  '  }',
  ' ]',
  '}'
];

function renderBlueprintLines(lines) {
  const gutterHtml = lines.map((_, i) => `<div>${i + 1}</div>`).join('');
  const codeHtml = lines.map(l => `<div>${l}</div>`).join('');
  return { gutterHtml, codeHtml };
}

const DEFAULT_BP = renderBlueprintLines(BLUEPRINT_JSON_LINES);

const TOPOLOGY_SETS = {
  proyecto: {
    nodes: [
      { name: 'genesis.bara', kind: 'archivo', path: 'samples/genesis.bara', line: '1', lang: 'Bara', active: true },
      { name: 'iniciar', kind: 'función', path: 'samples/genesis.bara', line: '3', lang: 'Bara', active: false },
      { name: 'ContratoGenesis', kind: 'contrato', path: 'samples/genesis.bara', line: '2', lang: 'Bara', active: false },
      { name: 'HELLO.bara', kind: 'archivo', path: 'src/HELLO.bara', line: '1', lang: 'Bara', active: false }
    ],
    svg: `<svg width="420" height="340" viewBox="0 0 420 340" style="max-width:100%;height:auto">
      <line x1="180" y1="155" x2="120" y2="105" stroke="#3f6d4b" stroke-width="1.5"/>
      <line x1="240" y1="155" x2="300" y2="105" stroke="#3f6d4b" stroke-width="1.5"/>
      <line x1="185" y1="205" x2="130" y2="255" stroke="#3f6d4b" stroke-width="1.5"/>
      <circle cx="210" cy="175" r="38" fill="#183120" stroke="#3f6d4b" stroke-width="2"/>
      <text x="210" y="180" text-anchor="middle" fill="#e2ecf7" font-size="14" font-family="Segoe UI">genesis</text>
      <circle cx="100" cy="85" r="30" fill="#111821" stroke="#3f6d4b" stroke-width="1.5"/>
      <text x="100" y="90" text-anchor="middle" fill="#e2ecf7" font-size="14" font-family="Segoe UI">iniciar</text>
      <circle cx="320" cy="85" r="36" fill="#111821" stroke="#528960" stroke-width="1.5"/>
      <text x="320" y="90" text-anchor="middle" fill="#e2ecf7" font-size="14" font-family="Segoe UI">Contrato</text>
      <circle cx="110" cy="270" r="34" fill="#111821" stroke="#1e2a38" stroke-width="1.5"/>
      <text x="110" y="275" text-anchor="middle" fill="#e2ecf7" font-size="14" font-family="Segoe UI">HELLO</text>
    </svg>`
  },
  bara: {
    nodes: [
      { name: 'kernel.bara', kind: 'módulo', path: 'bara/kernel.bara', line: '1', lang: 'Bara', active: true },
      { name: 'mostrar', kind: 'primitiva', path: 'bara/io.bara', line: '8', lang: 'Bara', active: false },
      { name: 'registrar', kind: 'primitiva', path: 'bara/log.bara', line: '14', lang: 'Bara', active: false },
      { name: 'Firma', kind: 'contrato', path: 'bara/firma.bara', line: '3', lang: 'Bara', active: false }
    ],
    svg: `<svg width="420" height="340" viewBox="0 0 420 340" style="max-width:100%;height:auto">
      <line x1="180" y1="155" x2="115" y2="100" stroke="#528960" stroke-width="1.5"/>
      <line x1="240" y1="155" x2="305" y2="100" stroke="#528960" stroke-width="1.5"/>
      <line x1="210" y1="213" x2="210" y2="265" stroke="#3f6d4b" stroke-width="1.5"/>
      <circle cx="210" cy="175" r="38" fill="#1b3d26" stroke="#528960" stroke-width="2"/>
      <text x="210" y="180" text-anchor="middle" fill="#e2ecf7" font-size="14" font-family="Segoe UI">kernel</text>
      <circle cx="95" cy="85" r="34" fill="#111821" stroke="#3f6d4b" stroke-width="1.5"/>
      <text x="95" y="90" text-anchor="middle" fill="#e2ecf7" font-size="14" font-family="Segoe UI">mostrar</text>
      <circle cx="325" cy="85" r="36" fill="#111821" stroke="#3f6d4b" stroke-width="1.5"/>
      <text x="325" y="90" text-anchor="middle" fill="#e2ecf7" font-size="14" font-family="Segoe UI">registrar</text>
      <circle cx="210" cy="295" r="32" fill="#111821" stroke="#528960" stroke-width="1.5"/>
      <text x="210" y="300" text-anchor="middle" fill="#e2ecf7" font-size="14" font-family="Segoe UI">Firma</text>
    </svg>`
  }
};

function renderTopologyNodesList(scope) {
  const data = TOPOLOGY_SETS[scope] || TOPOLOGY_SETS.proyecto;
  return data.nodes.map((n, idx) => `
    <div class="topology-node-item" role="button" tabindex="0" data-node-idx="${idx}" style="display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:8px;cursor:pointer;${n.active ? 'background:var(--hover)' : ''}">
      <span style="width:8px;height:8px;border-radius:50%;background:var(--green-soft);flex-shrink:0"></span>
      <div style="min-width:0">
        <div style="color:#fff;font-weight:500;font-size:14px">${n.name}</div>
        <div style="font-size:14px;color:var(--muted)">tipo: ${n.kind}</div>
      </div>
    </div>
  `).join('');
}

let currentScreenId = '03';
let previousScreenId = '01';
let bottomPanelOpen = true;
let ephemeralToastTimer = null;

function buildScreenHtml(screenId) {
  switch (screenId) {
    case '01':
      return `<main class="main" style="align-items:center;justify-content:center;background:#08090a">
        <div style="width:700px;max-width:92%">
          <div style="text-align:center;margin-bottom:18px;color:var(--muted);font-size:14px">
            <span class="chip" style="margin-bottom:10px">Bara IDE ${APP_VERSION}</span>
            <div style="margin-top:10px">Atajos: <span class="mono">Ctrl+O</span> abrir · <span class="mono">Ctrl+N</span> nuevo · <span class="mono">Ctrl+Alt+E</span> alternar layout</div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:22px">
            <div class="card welcome-card" role="button" tabindex="0" style="display:flex;align-items:center;gap:14px;border-color:#2a3a2e;cursor:pointer">
              <div style="color:var(--green-soft);display:flex">${SVG.folder(20)}</div>
              <div>
                <div style="font-size:15px;font-weight:600;color:#fff">Abrir carpeta</div>
                <div style="font-size:14px;color:var(--muted);margin-top:2px">Abrir una carpeta o proyecto · Ctrl+O</div>
              </div>
            </div>
            <div class="card welcome-card" role="button" tabindex="0" style="display:flex;align-items:center;gap:14px;cursor:pointer">
              <div style="color:var(--green-soft);display:flex">${SVG.filePlus(20)}</div>
              <div>
                <div style="font-size:15px;font-weight:600;color:#fff">Abrir ${OPEN_FILE_PATH}</div>
                <div style="font-size:14px;color:var(--muted);margin-top:2px">Ir al editor principal · Ctrl+N</div>
              </div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;color:var(--muted);margin-bottom:10px;font-size:14px">
            <span style="display:inline-flex">${SVG.clock(16)}</span><span style="font-weight:600;color:var(--text)">Proyectos recientes</span>
          </div>
          <div class="card" style="padding:8px">
            <div class="recent-project-item" role="button" tabindex="0" style="display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:8px;background:rgba(255,255,255,0.02);cursor:pointer">
              <span style="color:var(--green-soft);display:inline-flex">${SVG.cube(18)}</span>
              <div style="flex:1">
                <div style="font-weight:600;color:#fff;font-size:14px">bara-ide</div>
                <div class="mono" style="font-size:14px;color:var(--muted)">${DEFAULT_TRUSTED_FOLDER}</div>
              </div>
              <span style="color:var(--muted);font-size:14px">Activo</span>
            </div>
          </div>
        </div>
      </main>`;

    case '02':
      return `<main class="main" style="padding:22px 32px;background:#08090a;overflow:auto">
        <h1 style="margin:0 0 14px;font-size:20px;font-weight:650;color:#fff">Buscar</h1>
        <div style="position:relative;margin-bottom:14px;max-width:860px">
          <div class="field" style="display:flex;align-items:center;gap:10px;padding:10px 14px">
            <span style="opacity:.7;display:inline-flex">${SVG.search(16)}</span>
            <span style="flex:1;color:var(--muted)">Buscar función o herramienta</span>
            <span class="chip mono">Ctrl+Shift+P</span>
          </div>
        </div>
        <div style="max-width:860px">
          <div class="search-row" role="button" tabindex="0" data-target="03" style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border:1px solid var(--green-mid);border-radius:10px;margin-bottom:8px;background:var(--hover);cursor:pointer">
            <div>
              <div style="font-weight:600;color:#fff;font-size:15px">Chat y Editor (${OPEN_FILE_PATH})</div>
              <div style="color:var(--muted);font-size:14px;margin-top:2px">Espacio principal con diagnósticos y revisión de parches</div>
            </div>
            <span class="mono" style="color:var(--muted);font-size:14px">Ctrl+L</span>
          </div>
          <div class="search-row" role="button" tabindex="0" data-target="08" style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border:1px solid var(--border2);border-radius:10px;margin-bottom:8px;cursor:pointer">
            <div>
              <div style="font-weight:600;color:#fff;font-size:15px">Constructor visual</div>
              <div style="color:var(--muted);font-size:14px;margin-top:2px">Lienzo de bloques fuente → sumidero</div>
            </div>
            <span class="mono" style="color:var(--muted);font-size:14px">Ctrl+Shift+V</span>
          </div>
          <div class="search-row" role="button" tabindex="0" data-target="09" style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border:1px solid var(--border2);border-radius:10px;margin-bottom:8px;cursor:pointer">
            <div>
              <div style="font-weight:600;color:#fff;font-size:15px">Topología</div>
              <div style="color:var(--muted);font-size:14px;margin-top:2px">Grafo de nodos y contratos</div>
            </div>
            <span class="mono" style="color:var(--muted);font-size:14px">Ctrl+Shift+T</span>
          </div>
          <div class="search-row" role="button" tabindex="0" data-target="13" style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border:1px solid var(--border2);border-radius:10px;margin-bottom:8px;cursor:pointer">
            <div>
              <div style="font-weight:600;color:#fff;font-size:15px">Ajustes</div>
              <div style="color:var(--muted);font-size:14px;margin-top:2px">Modo estricto, carpeta de confianza y proveedor</div>
            </div>
            <span class="mono" style="color:var(--muted);font-size:14px">Ctrl+,</span>
          </div>
        </div>
      </main>`;

    case '03':
    case '04':
    case '05':
    case '06':
    case '11':
    case '14':
      return buildMainWorkspaceScreenHtml(bottomPanelOpen);

    case '07':
      return `<main class="main" style="padding:22px 28px;background:#08090a;overflow:auto">
        <h1 style="margin:0 0 6px;font-size:20px;color:#fff">Herramientas</h1>
        <p style="margin:0 0 16px;color:var(--muted)">Acceso a las funciones del IDE fuera del rail principal.</p>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;max-width:980px">
          <div class="card tool-card" role="button" tabindex="0" data-tool="08" style="min-height:105px;display:flex;flex-direction:column;gap:8px;cursor:pointer">
            <div style="display:flex;align-items:center;gap:10px">
              <span style="color:var(--green-soft);display:inline-flex">${SVG.puzzle(20)}</span>
              <strong style="font-size:15px;color:#fff">Constructor visual</strong>
            </div>
            <div style="color:var(--muted);font-size:14px">Lienzo de bloques fuente → sumidero, traducir y firmar</div>
          </div>
          <div class="card tool-card" role="button" tabindex="0" data-tool="09" style="min-height:105px;display:flex;flex-direction:column;gap:8px;cursor:pointer">
            <div style="display:flex;align-items:center;gap:10px">
              <span style="color:var(--green-soft);display:inline-flex">${SVG.network(20)}</span>
              <strong style="font-size:15px;color:#fff">Topología</strong>
            </div>
            <div style="color:var(--muted);font-size:14px">Grafo de archivos, funciones y contratos del proyecto</div>
          </div>
          <div class="card tool-card" role="button" tabindex="0" data-tool="10" style="min-height:105px;display:flex;flex-direction:column;gap:8px;cursor:pointer">
            <div style="display:flex;align-items:center;gap:10px">
              <span style="color:var(--green-soft);display:inline-flex">${SVG.git(20)}</span>
              <strong style="font-size:15px;color:#fff">Git</strong>
            </div>
            <div style="color:var(--muted);font-size:14px">Control de versiones, validación de URL github.com y commits</div>
          </div>
          <div class="card tool-card" role="button" tabindex="0" data-tool="11" style="min-height:105px;display:flex;flex-direction:column;gap:8px;cursor:pointer">
            <div style="display:flex;align-items:center;gap:10px">
              <span style="color:var(--green-soft);display:inline-flex">${SVG.warn(20)}</span>
              <strong style="font-size:15px;color:#fff">Problemas</strong>
            </div>
            <div style="color:var(--muted);font-size:14px">Diagnósticos TokenKind::Diagnostic del editor</div>
          </div>
        </div>
      </main>`;

    case '08':
      return `${SIDEBAR_HTML}
      <section class="main">
        <div style="height:44px;display:flex;align-items:center;justify-content:space-between;padding:0 14px;border-bottom:1px solid var(--border);background:var(--rail);flex-shrink:0">
          <strong style="font-size:15px">Constructor visual</strong>
          <div class="row">
            <button type="button" class="btn btn-ghost">Traducir y firmar</button>
            <button type="button" class="btn btn-ghost">Ejemplo</button>
            <button type="button" class="btn btn-ghost"><span style="width:8px;height:8px;border-radius:50%;background:var(--green-soft)"></span> Emitir .bara</button>
          </div>
        </div>
        <div style="flex:1;display:flex;min-height:0;min-width:0">
          <div style="flex:1.35;min-width:0;display:flex;flex-direction:column;border-right:1px solid var(--border);background:#070a0e">
            <div style="padding:10px 16px;font-size:14px;color:var(--text)">Lienzo</div>
            <div style="flex:1;display:flex;align-items:center;justify-content:center;position:relative;padding:12px 10px;min-width:0;overflow:auto">
              <div style="display:grid;grid-template-columns:minmax(115px,160px) minmax(158px,185px);gap:10px;justify-content:center;align-items:stretch;width:100%;position:relative;z-index:1;min-width:0">
                <div style="min-width:0;padding:10px 8px;background:#183120;border:2px solid #3f6d4b;border-radius:12px;text-align:center">
                  <div style="font-size:14px;font-weight:600;color:#84a989;letter-spacing:.02em">FUENTE</div>
                  <div class="mono" style="font-size:14px;margin-top:4px;color:#fff">fuente_in</div>
                </div>
                <div style="min-width:0;padding:10px 8px;background:var(--panel);border:1px solid var(--border);border-radius:12px;text-align:center">
                  <div style="font-size:14px;font-weight:600;color:#fff;letter-spacing:.02em">TRANSFORMAR</div>
                  <div class="mono" style="font-size:14px;margin-top:4px;color:var(--green-soft)">transformar_saludo</div>
                </div>
                <div style="min-width:0;padding:10px 8px;background:#1b3d26;border:2px solid #528960;border-radius:12px;text-align:center">
                  <div style="font-size:14px;font-weight:600;color:#fff;letter-spacing:.02em">GUARDIA</div>
                  <div class="mono" style="font-size:14px;margin-top:4px;color:#84a989">guardia_firma</div>
                </div>
                <div style="min-width:0;padding:10px 8px;background:var(--panel);border:1px solid var(--border);border-radius:12px;text-align:center">
                  <div style="font-size:14px;font-weight:600;color:#fff;letter-spacing:.02em">SUMIDERO</div>
                  <div class="mono" style="font-size:14px;margin-top:4px;color:#fff">sumidero_out</div>
                </div>
              </div>
            </div>
            <div style="border-top:1px solid var(--border);padding:10px 16px;background:var(--rail);flex-shrink:0">
              <div style="font-weight:600;margin-bottom:6px">Informe del kernel</div>
              <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:6px 12px;font-size:14px">
                <label class="row" style="color:var(--muted)"><span class="check on">✓</span>bloques</label>
                <label class="row" style="color:var(--muted)"><span class="check on">✓</span>aristas</label>
                <label class="row" style="color:var(--muted)"><span class="check"></span>riesgo</label>
                <label class="row" style="color:var(--muted)"><span class="check on">✓</span>sintaxis</label>
                <label class="row" style="color:var(--muted)"><span class="check on">✓</span>tipos</label>
                <label class="row" style="color:var(--muted)"><span class="check on">✓</span>compatibilidad</label>
                <label class="row" style="color:var(--muted)"><span class="check"></span>latencia</label>
                <label class="row" style="color:var(--muted)"><span class="check on">✓</span>firma válida</label>
              </div>
            </div>
          </div>
          <aside id="constructor-blueprint-aside" style="flex:1.15;min-width:290px;display:flex;flex-direction:column;background:var(--rail);overflow:hidden">
            <div style="height:36px;display:flex;align-items:center;padding:0 12px;border-bottom:1px solid var(--border);font-family:var(--mono);font-size:14px;flex-shrink:0">Blueprint JSON</div>
            <div class="code" style="font-size:14px;line-height:1.5;overflow:auto">
              <div class="gutter" id="constructor-blueprint-gutter" style="font-size:14px">${DEFAULT_BP.gutterHtml}</div>
              <div class="code-body" id="constructor-blueprint-code" style="font-size:14px;padding:10px 8px;overflow:auto;white-space:pre">${DEFAULT_BP.codeHtml}</div>
            </div>
          </aside>
        </div>
      </section>`;

    case '09':
      return `<main class="main" style="flex-direction:row;background:#08090a">
        <div style="width:200px;flex-shrink:0;border-right:1px solid var(--border);padding:12px;display:flex;flex-direction:column;gap:10px">
          <strong style="font-size:16px">Topología</strong>
          <!-- Único role="alert" permitido en toda la maqueta: el de mapa/topología -->
          <div id="topology-alert" role="alert" style="font-size:14px;color:var(--green-soft);background:#132419;border:1px solid #3f6d4b;padding:4px 8px;border-radius:6px">
            Mapa topológico sincronizado
          </div>
          <div id="topology-scope-selector" style="display:flex;background:#0d1218;border:1px solid var(--border);border-radius:999px;overflow:hidden">
            <div id="topology-seg-proyecto" role="button" tabindex="0" data-scope="proyecto" style="flex:1;text-align:center;padding:7px;background:var(--green-dim);color:#fff;font-weight:600;cursor:pointer;font-size:14px">Proyecto</div>
            <div id="topology-seg-bara" role="button" tabindex="0" data-scope="bara" style="flex:1;text-align:center;padding:7px;color:var(--muted);cursor:pointer;font-size:14px">Bara</div>
          </div>
          <div id="topology-node-list" style="display:flex;flex-direction:column;gap:4px">
            ${renderTopologyNodesList('proyecto')}
          </div>
        </div>
        <div id="topology-graph-view" style="flex:1;min-width:0;position:relative;display:flex;align-items:center;justify-content:center;background:#070a0e;padding:12px">
          ${TOPOLOGY_SETS.proyecto.svg}
        </div>
        <div style="width:240px;flex-shrink:0;border-left:1px solid var(--border);padding:12px;display:flex;flex-direction:column;gap:10px;background:var(--rail)">
          <div>
            <strong style="font-size:16px">Propiedades</strong>
            <div style="font-size:14px;color:var(--muted);margin-top:2px">detalle del nodo (solo lectura)</div>
          </div>
          <div>
            <label class="label">ruta</label>
            <input id="topo-prop-ruta" class="field mono" readonly value="samples/genesis.bara"/>
          </div>
          <div>
            <label class="label">línea</label>
            <input id="topo-prop-linea" class="field mono" readonly value="1"/>
          </div>
          <div>
            <label class="label">tipo</label>
            <input id="topo-prop-tipo" class="field" readonly value="archivo"/>
          </div>
          <div>
            <label class="label">lenguaje</label>
            <input id="topo-prop-lenguaje" class="field" readonly value="Bara"/>
          </div>
          <button type="button" class="btn btn-ghost" style="justify-content:center">Abrir en el editor</button>
          <button type="button" class="btn btn-primary" style="justify-content:center">Actualizar grafo</button>
        </div>
      </main>`;

    case '10':
      return `<main class="main" style="padding:18px 26px;background:#08090a;position:relative;overflow:auto">
        <h1 style="margin:0 0 12px;font-size:20px;color:#fff">Git · control de versiones</h1>
        <div class="card" style="max-width:980px;margin-bottom:14px;display:flex;align-items:flex-end;gap:10px">
          <div style="flex:1">
            <label class="label" for="git-remote-url">Remoto del repositorio (sólo https o ssh de github.com)</label>
            <input id="git-remote-url" class="field mono" value="http://gitlab.com/ejemplo/repo" />
          </div>
          <button type="button" id="btn-validate-git-url" class="btn btn-primary">Verificar URL remota</button>
        </div>
        <div style="display:grid;grid-template-columns:1.1fr 0.9fr;gap:16px;max-width:980px">
          <div class="card">
            <div style="font-weight:600;margin-bottom:10px">Archivos cambiados</div>
            <div style="display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:6px;">
              <span class="mono" style="width:18px;color:var(--warn);font-weight:700">M</span>
              <span class="mono" style="flex:1">${OPEN_FILE_PATH}</span>
              <span class="check on">✓</span>
            </div>
            <div style="margin-top:10px;font-size:14px;color:var(--muted)">Se excluyen <span class="mono">.bara-backup/</span> y <span class="mono">.bara-trash/</span></div>
          </div>
          <div class="card">
            <label class="label">Mensaje del commit</label>
            <textarea class="field" style="height:80px;resize:none">Actualiza contrato en ${OPEN_FILE_PATH}</textarea>
            <button type="button" class="btn btn-primary" style="margin-top:10px;width:100%;justify-content:center">Confirmar commit</button>
          </div>
        </div>
      </main>`;

    case '12':
      return `<main class="main" style="padding:20px 28px;background:#08090a;overflow:auto">
        <h1 style="margin:0 0 12px;font-size:20px;color:var(--green-soft)">Registros</h1>
        <div class="card" style="max-width:1000px;font-size:14px;line-height:1.55">
          <div class="mono" style="padding:6px 0;border-bottom:1px solid rgba(30,42,56,.5)">
            <span style="color:var(--muted)">10:31:02</span>
            <span style="color:var(--green-soft);font-weight:600"> [INFO]</span>
            <span> Archivo cargado: ${OPEN_FILE_PATH}</span>
          </div>
          <div class="mono" style="padding:6px 0;border-bottom:1px solid rgba(30,42,56,.5)">
            <span style="color:var(--muted)">10:31:04</span>
            <span style="color:var(--green-soft);font-weight:600"> [INFO]</span>
            <span> Kernel activo · ${APP_VERSION}</span>
          </div>
          <div class="mono" style="padding:6px 0;border-bottom:1px solid rgba(30,42,56,.5)">
            <span style="color:var(--muted)">10:31:40</span>
            <span style="color:var(--warn);font-weight:600"> [AVISO]</span>
            <span> TokenKind::Diagnostic: 3 diagnósticos en ${OPEN_FILE_PATH}</span>
          </div>
        </div>
      </main>`;

    case '13':
      return buildSettingsScreenHtml();

    case '15':
      return `<main class="main" style="align-items:center;justify-content:center;background:#08090a;position:relative">
        <div class="modal-backdrop">
          <div class="modal">
            <h2 style="margin:0 0 8px;font-size:18px">Tienes cambios sin guardar</h2>
            <p style="margin:0 0 12px;color:var(--muted)">Guarda o descarta los cambios en <span class="mono">${OPEN_FILE_PATH}</span>.</p>
            <div class="row" style="justify-content:flex-end">
              <button type="button" class="btn btn-ghost" data-modal15="cancelar">Cancelar</button>
              <button type="button" class="btn btn-danger" data-modal15="descartar">Descartar</button>
              <button type="button" class="btn btn-primary" data-modal15="guardar">Guardar</button>
            </div>
          </div>
        </div>
      </main>`;

    default:
      return buildMainWorkspaceScreenHtml(bottomPanelOpen);
  }
}

function getRailForScreen(screenId) {
  const map = {
    '01': 'Archivos',
    '02': 'Buscar',
    '03': 'Chat',
    '04': 'Chat',
    '05': 'Chat',
    '06': 'Chat',
    '07': 'Herramientas',
    '08': 'Herramientas',
    '09': 'Herramientas',
    '10': 'Herramientas',
    '11': 'Chat',
    '12': 'Registros',
    '13': 'Ajustes',
    '14': 'Chat',
    '15': 'Archivos'
  };
  return map[screenId] || 'Chat';
}

function showEphemeralToast(message) {
  const viewport = document.getElementById('screen-viewport');
  if (!viewport) return;
  const existing = document.getElementById('bara-ephemeral-toast');
  if (existing) existing.remove();
  if (ephemeralToastTimer) clearTimeout(ephemeralToastTimer);

  const toast = document.createElement('div');
  toast.id = 'bara-ephemeral-toast';
  toast.className = 'toast';
  toast.setAttribute('role', 'status');
  toast.innerHTML = `
    <span>${message}</span>
    <button type="button" class="icon-close-btn" aria-label="Cerrar notificación">×</button>
  `;
  const closeBtn = toast.querySelector('button');
  if (closeBtn) {
    closeBtn.onclick = () => toast.remove();
  }
  viewport.appendChild(toast);
  ephemeralToastTimer = setTimeout(() => {
    toast.remove();
  }, 3000);
}

/**
 * Portal Menu for » ("Más pestañas") in document.body (Point 2):
 * Opens UPWARD above the » button, never clipped by any container.
 * Closes on Esc or outside click and restores focus to #bp-more-tabs-btn.
 */
function closeMoreTabsPortal(restoreFocus = false) {
  state.moreTabsOpen = false;
  const existing = document.getElementById('more-tabs-portal');
  if (existing) {
    existing.remove();
  }
  const btn = document.getElementById('bp-more-tabs-btn');
  if (btn) {
    btn.setAttribute('aria-expanded', 'false');
    if (restoreFocus) {
      btn.focus();
    }
  }
}

function openMoreTabsPortal() {
  if (!bottomPanelOpen) {
    bottomPanelOpen = true;
    renderScreen('03');
  }
  const btn = document.getElementById('bp-more-tabs-btn');
  if (!btn) return;

  closeMoreTabsPortal(false);
  state.moreTabsOpen = true;
  btn.setAttribute('aria-expanded', 'true');

  const rect = btn.getBoundingClientRect();
  const portal = document.createElement('div');
  portal.id = 'more-tabs-portal';
  portal.className = 'more-tabs-portal';
  portal.setAttribute('role', 'menu');
  portal.setAttribute('aria-label', 'Más pestañas');

  const leftPos = Math.max(12, Math.min(rect.left, window.innerWidth - 234));
  const bottomPos = Math.max(36, window.innerHeight - rect.top + 6);
  portal.style.left = `${leftPos}px`;
  portal.style.bottom = `${bottomPos}px`;

  portal.innerHTML = MORE_TABS_ITEMS.map(item => `
    <button type="button" class="more-tabs-item" role="menuitem" data-more-tab="${item.id}">
      <span>${item.label}</span>
      <span class="mono" style="font-size:12px;color:var(--muted)">↗</span>
    </button>
  `).join('');

  document.body.appendChild(portal);

  portal.querySelectorAll('.more-tabs-item').forEach(menuBtn => {
    menuBtn.onclick = (e) => {
      e.stopPropagation();
      const tabId = menuBtn.getAttribute('data-more-tab');
      if (tabId) {
        state.bottomDockTab = tabId;
        closeMoreTabsPortal(true);
        renderScreen(currentScreenId);
      }
    };
  });

  const firstItem = portal.querySelector('.more-tabs-item');
  if (firstItem) {
    firstItem.focus();
  }
}

function toggleMoreTabsPortal() {
  if (state.moreTabsOpen) {
    closeMoreTabsPortal(true);
  } else {
    openMoreTabsPortal();
  }
}

function syncHeaderAndStatusBar() {
  const versionEl = document.getElementById('status-version-tag');
  if (versionEl) versionEl.textContent = APP_VERSION;

  const fileEl = document.getElementById('status-file-name');
  if (fileEl) fileEl.textContent = OPEN_FILE_PATH;

  const titleFileEl = document.getElementById('titlebar-file-label');
  if (titleFileEl) titleFileEl.textContent = OPEN_FILE_PATH;

  const diagCountEl = document.getElementById('status-diag-number');
  if (diagCountEl) diagCountEl.textContent = String(BARA_DIAGNOSTICS.length);

  const swapBtn = document.getElementById('btn-swap-layout');
  const swapLabel = document.getElementById('swap-layout-label');
  if (swapBtn && swapLabel) {
    swapBtn.classList.toggle('active', state.editorFirst);
    swapLabel.textContent = state.editorFirst ? 'Editor izq. ⇄' : 'Chat izq. ⇄';
  }

  const bannerEl = document.getElementById('github-url-error-banner');
  if (bannerEl) {
    bannerEl.hidden = !state.errorBannerVisible;
    const textEl = bannerEl.querySelector('.banner-error-text');
    if (textEl) textEl.textContent = ERROR_BANNER_TEXT;
  }

  // Sync hidden advanced components visibility if flag changes
  const advContainers = document.querySelectorAll('[data-advanced], #adv-hidden-components');
  advContainers.forEach(el => {
    el.hidden = !state.showAdvanced;
  });
}

function toggleEditorFirstLayout() {
  state.editorFirst = !state.editorFirst;
  try {
    localStorage.setItem('editorFirst', String(state.editorFirst));
  } catch (_) {}
  syncHeaderAndStatusBar();
  const split = document.getElementById('workspace-split-container');
  if (split) {
    split.classList.toggle('editor-first', state.editorFirst);
  } else {
    renderScreen('03');
  }
}

function setErrorBannerVisible(visible) {
  state.errorBannerVisible = Boolean(visible);
  syncHeaderAndStatusBar();
}

function bindKeyboardRoleButton(el, handler) {
  if (!el) return;
  el.onclick = handler;
  el.onkeydown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handler(e);
    }
  };
}

function updateTopologyScope(scope) {
  window.BaraIDE.topologyScope = scope;
  const segProy = document.getElementById('topology-seg-proyecto');
  const segBara = document.getElementById('topology-seg-bara');
  if (segProy && segBara) {
    if (scope === 'proyecto') {
      segProy.style.background = 'var(--green-dim)';
      segProy.style.color = '#fff';
      segProy.style.fontWeight = '600';
      segBara.style.background = 'transparent';
      segBara.style.color = 'var(--muted)';
      segBara.style.fontWeight = 'normal';
    } else {
      segBara.style.background = 'var(--green-dim)';
      segBara.style.color = '#fff';
      segBara.style.fontWeight = '600';
      segProy.style.background = 'transparent';
      segProy.style.color = 'var(--muted)';
      segProy.style.fontWeight = 'normal';
    }
  }
  const listEl = document.getElementById('topology-node-list');
  const graphEl = document.getElementById('topology-graph-view');
  const data = TOPOLOGY_SETS[scope] || TOPOLOGY_SETS.proyecto;
  if (listEl) {
    listEl.innerHTML = renderTopologyNodesList(scope);
    bindTopologyNodeClicks(scope);
  }
  if (graphEl) {
    graphEl.innerHTML = data.svg;
  }
}

function bindTopologyNodeClicks(scope) {
  const data = TOPOLOGY_SETS[scope] || TOPOLOGY_SETS.proyecto;
  document.querySelectorAll('.topology-node-item').forEach(item => {
    bindKeyboardRoleButton(item, () => {
      const idx = parseInt(item.getAttribute('data-node-idx') || '0', 10);
      const node = data.nodes[idx];
      if (!node) return;
      document.querySelectorAll('.topology-node-item').forEach(el => {
        el.style.background = 'transparent';
      });
      item.style.background = 'var(--hover)';
      const r = document.getElementById('topo-prop-ruta');
      const l = document.getElementById('topo-prop-linea');
      const t = document.getElementById('topo-prop-tipo');
      const g = document.getElementById('topo-prop-lenguaje');
      if (r) r.value = node.path;
      if (l) l.value = node.line;
      if (t) t.value = node.kind;
      if (g) g.value = node.lang;
    });
  });
}

function renderScreen(screenId) {
  closeMoreTabsPortal(false);
  if (screenId !== currentScreenId) {
    previousScreenId = currentScreenId;
  }
  currentScreenId = screenId;

  if (screenId === '04') {
    state.patchVerified = true;
    state.patchStatus = 'pending';
  } else if (screenId === '05') {
    state.patchStatus = 'accepted';
  } else if (screenId === '06') {
    state.patchVerified = false;
    state.patchStatus = 'pending';
  } else if (screenId === '11') {
    bottomPanelOpen = true;
    state.bottomDockTab = 'problemas';
  }

  const railName = getRailForScreen(screenId);
  document.querySelectorAll('.rail a').forEach(a => {
    if (a.getAttribute('data-rail') === railName) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });

  syncHeaderAndStatusBar();

  const viewport = document.getElementById('screen-viewport');
  if (viewport) {
    viewport.innerHTML = buildScreenHtml(screenId);
    bindScreenInteractions();
  }
}

function toggleBottomPanel() {
  closeMoreTabsPortal(false);
  bottomPanelOpen = !bottomPanelOpen;
  if (currentScreenId !== '03' && currentScreenId !== '11') {
    renderScreen('03');
  } else {
    renderScreen(currentScreenId);
  }
}

function bindProblemRowEvents() {
  document.querySelectorAll('.problem-row').forEach(row => {
    const line = parseInt(row.getAttribute('data-line') || '2', 10);
    bindKeyboardRoleButton(row, () => {
      state.activeDiagnosticLine = line;
      renderScreen('03');
      const lineEl = document.querySelector(`.code-line[data-line-num="${line}"]`);
      if (lineEl && typeof lineEl.scrollIntoView === 'function') {
        lineEl.scrollIntoView({ block: 'nearest' });
      }
    });
  });

  document.querySelectorAll('.diag-token').forEach(tok => {
    const line = parseInt(tok.getAttribute('data-diag-line') || '2', 10);
    bindKeyboardRoleButton(tok, () => {
      state.activeDiagnosticLine = line;
      renderScreen('03');
    });
  });
}

function bindScreenInteractions() {
  // Patch Review Card controls (Point 4)
  const toggleVerBtn = document.getElementById('btn-toggle-verified-demo');
  if (toggleVerBtn) {
    toggleVerBtn.onclick = () => {
      state.patchVerified = !state.patchVerified;
      state.patchStatus = 'pending';
      renderScreen(currentScreenId);
    };
  }
  const acceptBtn = document.getElementById('btn-patch-accept');
  if (acceptBtn) {
    acceptBtn.onclick = () => {
      const check = computeAcceptButtonState({
        patchVerified: state.patchVerified,
        strictMode: state.strictMode
      });
      if (check.disabled) return;
      state.patchStatus = 'accepted';
      renderScreen(currentScreenId);
    };
  }
  const rejectBtn = document.getElementById('btn-patch-reject');
  if (rejectBtn) {
    rejectBtn.onclick = () => {
      state.patchStatus = 'rejected';
      renderScreen(currentScreenId);
    };
  }
  const undoBtn = document.getElementById('btn-patch-undo');
  if (undoBtn) {
    undoBtn.onclick = () => {
      state.patchStatus = 'pending';
      renderScreen(currentScreenId);
    };
  }
  const restoreBtn = document.getElementById('btn-patch-restore');
  if (restoreBtn) {
    restoreBtn.onclick = () => {
      state.patchStatus = 'pending';
      renderScreen(currentScreenId);
    };
  }

  // Bottom dock controls & » portal trigger (Point 2 & Point 6)
  const moreTabsBtn = document.getElementById('bp-more-tabs-btn');
  if (moreTabsBtn) {
    moreTabsBtn.onclick = (e) => {
      e.stopPropagation();
      toggleMoreTabsPortal();
    };
  }
  const bpMin = document.getElementById('bp-btn-minimize');
  if (bpMin) bpMin.onclick = () => toggleBottomPanel();
  const bpClose = document.getElementById('bp-btn-close');
  if (bpClose) bpClose.onclick = () => toggleBottomPanel();
  const bpMax = document.getElementById('bp-btn-maximize');
  if (bpMax) {
    bpMax.onclick = () => {
      const dock = document.getElementById('bottom-dock');
      if (dock) {
        dock.style.height = dock.style.height === '260px' ? '175px' : '260px';
      }
    };
  }

  ['problemas', 'registros', 'terminal'].forEach(tabName => {
    const tabEl = document.getElementById(`bp-tab-${tabName}`);
    if (tabEl) {
      tabEl.onclick = () => {
        state.bottomDockTab = tabName;
        renderScreen(currentScreenId);
      };
    }
  });

  bindProblemRowEvents();

  // Welcome cards
  document.querySelectorAll('.welcome-card, .recent-project-item').forEach(el => {
    bindKeyboardRoleButton(el, () => renderScreen('03'));
  });

  // Herramientas cards
  document.querySelectorAll('.tool-card').forEach(card => {
    const target = card.getAttribute('data-tool');
    if (target) {
      bindKeyboardRoleButton(card, () => renderScreen(target));
    }
  });

  // Search rows
  document.querySelectorAll('.search-row').forEach(row => {
    const target = row.getAttribute('data-target');
    if (target) {
      bindKeyboardRoleButton(row, () => renderScreen(target));
    }
  });

  // Ajustes controls (Point 7)
  const strictToggle = document.getElementById('toggle-strict-mode');
  if (strictToggle) {
    strictToggle.onclick = () => {
      state.strictMode = !state.strictMode;
      try {
        localStorage.setItem('strictMode', String(state.strictMode));
      } catch (_) {}
      renderScreen('13');
    };
  }
  const autosaveToggle = document.getElementById('toggle-autosave');
  if (autosaveToggle) {
    autosaveToggle.onclick = () => {
      state.autoSave = !state.autoSave;
      renderScreen('13');
    };
  }
  const providerSelect = document.getElementById('settings-provider-select');
  if (providerSelect) {
    providerSelect.onchange = (e) => {
      state.aiProvider = e.target.value;
      renderScreen('13');
    };
  }
  const closeAjustesBtn = document.getElementById('btn-close-ajustes');
  if (closeAjustesBtn) {
    closeAjustesBtn.onclick = () => renderScreen('03');
  }
  const saveSettingsBtn = document.getElementById('btn-save-settings');
  if (saveSettingsBtn) {
    saveSettingsBtn.onclick = () => showEphemeralToast('Preferencias guardadas');
  }
  const goUnverifiedBtn = document.getElementById('btn-go-unverified-from-settings');
  if (goUnverifiedBtn) {
    goUnverifiedBtn.onclick = () => {
      state.patchVerified = false;
      state.patchStatus = 'pending';
      renderScreen('03');
    };
  }
  const openAjustesChatBtn = document.getElementById('chat-btn-open-ajustes');
  if (openAjustesChatBtn) {
    openAjustesChatBtn.onclick = () => renderScreen('13');
  }

  // Git URL validation trigger (Point 5)
  const validateGitBtn = document.getElementById('btn-validate-git-url');
  if (validateGitBtn) {
    validateGitBtn.onclick = () => {
      const input = document.getElementById('git-remote-url');
      const res = validateGithubUrl(input ? input.value : '');
      setErrorBannerVisible(!res.valid);
    };
  }

  // Topología scope selector
  const segProy = document.getElementById('topology-seg-proyecto');
  const segBara = document.getElementById('topology-seg-bara');
  if (segProy && segBara) {
    bindKeyboardRoleButton(segProy, () => updateTopologyScope('proyecto'));
    bindKeyboardRoleButton(segBara, () => updateTopologyScope('bara'));
    bindTopologyNodeClicks(window.BaraIDE.topologyScope || 'proyecto');
  }

  // Constructor 08 buttons
  document.querySelectorAll('button').forEach(btn => {
    if (btn.hasAttribute('data-modal15')) {
      btn.onclick = () => renderScreen('01');
      return;
    }
    const t = (btn.textContent || '').trim();
    if (t === 'Nuevo chat') btn.onclick = () => renderScreen('03');
    if (t === 'Abrir en el editor') btn.onclick = () => renderScreen('03');
    if (t === 'Traducir y firmar') {
      btn.onclick = () => {
        document.querySelectorAll('label.row .check').forEach(c => {
          c.classList.add('on');
          c.textContent = '✓';
        });
      };
    }
    if (t === 'Ejemplo') {
      btn.onclick = () => {
        const g = document.getElementById('constructor-blueprint-gutter');
        const b = document.getElementById('constructor-blueprint-code');
        if (g && b) {
          g.innerHTML = DEFAULT_BP.gutterHtml;
          b.innerHTML = DEFAULT_BP.codeHtml;
        }
      };
    }
    if (t.includes('Emitir .bara')) {
      btn.onclick = () => {
        const asideTitle = document.querySelector('#constructor-blueprint-aside > div');
        if (asideTitle) asideTitle.textContent = `Código ${OPEN_FILE_PATH}`;
        const g = document.getElementById('constructor-blueprint-gutter');
        const b = document.getElementById('constructor-blueprint-code');
        const baraLines = [
          `<span class="kw">raiz</span> @ktb ContratoGenesis {`,
          `  <span class="kw">funcion</span> iniciar() {`,
          `    mostrar(<span class="str">"kernel activo"</span>)`,
          `  }`,
          `}`
        ];
        if (g && b) {
          const rendered = renderBlueprintLines(baraLines);
          g.innerHTML = rendered.gutterHtml;
          b.innerHTML = rendered.codeHtml;
        }
      };
    }
  });

  document.querySelectorAll('.tab .x').forEach(x => {
    x.onclick = (e) => {
      e.stopPropagation();
      renderScreen('15');
    };
  });
}

/**
 * Triggers a specific BARA-VISUAL-5 state for /demo and automated verification.
 */
function triggerDemoState(action) {
  closeMoreTabsPortal(false);
  state.errorBannerVisible = (action === 'banner-error');
  document.querySelectorAll('.demo-trigger-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-demo-action') === action);
  });

  switch (action) {
    case 'layout-normal':
      state.editorFirst = false;
      try { localStorage.setItem('editorFirst', 'false'); } catch (_) {}
      bottomPanelOpen = true;
      renderScreen('03');
      break;

    case 'layout-invertido':
      state.editorFirst = true;
      try { localStorage.setItem('editorFirst', 'true'); } catch (_) {}
      bottomPanelOpen = true;
      renderScreen('03');
      break;

    case 'menu-mas-abierto':
      bottomPanelOpen = true;
      renderScreen('03');
      openMoreTabsPortal();
      break;

    case 'aviso-rojo':
      state.editorFirst = false;
      try { localStorage.setItem('editorFirst', 'false'); } catch (_) {}
      state.patchVerified = false;
      state.patchStatus = 'pending';
      bottomPanelOpen = true;
      renderScreen('03');
      break;

    case 'verificado':
      state.patchVerified = true;
      state.patchStatus = 'pending';
      bottomPanelOpen = true;
      renderScreen('03');
      break;

    case 'banner-error':
      state.errorBannerVisible = true;
      bottomPanelOpen = true;
      renderScreen('03');
      break;

    case 'diagnosticos':
      state.activeDiagnosticLine = 2;
      state.bottomDockTab = 'problemas';
      bottomPanelOpen = true;
      renderScreen('03');
      break;

    case 'modo-estricto':
      state.strictMode = true;
      state.patchVerified = false;
      state.patchStatus = 'pending';
      try { localStorage.setItem('strictMode', 'true'); } catch (_) {}
      renderScreen('13');
      break;

    default:
      renderScreen('03');
  }
}

window.BaraIDE = {
  version: APP_VERSION,
  openFile: OPEN_FILE_PATH,
  state,
  topologyScope: 'proyecto',
  renderScreen,
  triggerDemoState,
  toggleEditorFirstLayout,
  openMoreTabsPortal,
  closeMoreTabsPortal,
  setErrorBannerVisible,
  jumpToLine(file, line) {
    state.activeDiagnosticLine = line;
    renderScreen('03');
  },
  showToast: showEphemeralToast
};

window.renderScreen = renderScreen;
window.triggerDemoState = triggerDemoState;
window.setErrorBannerVisible = setErrorBannerVisible;
window.updateTopologyScope = updateTopologyScope;

document.addEventListener('DOMContentLoaded', () => {
  syncHeaderAndStatusBar();

  // Titlebar buttons
  const swapBtn = document.getElementById('btn-swap-layout');
  if (swapBtn) {
    swapBtn.onclick = () => toggleEditorFirstLayout();
  }

  const demoBar = document.getElementById('demo-state-bar');
  const toggleDemoBtn = document.getElementById('btn-toggle-demo-bar');
  if (toggleDemoBtn && demoBar) {
    toggleDemoBtn.onclick = () => {
      demoBar.hidden = !demoBar.hidden;
      toggleDemoBtn.classList.toggle('active', !demoBar.hidden);
    };
  }

  // Window controls feedback
  ['win-btn-min', 'win-btn-max', 'win-btn-close'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.onclick = () => {
        const actionLabel = id === 'win-btn-min' ? 'Ventana minimizada (mock)' : id === 'win-btn-max' ? 'Ventana maximizada (mock)' : 'Cerrar ventana (mock)';
        showEphemeralToast(actionLabel);
      };
    }
  });

  // Error banner × button (Point 5)
  const closeBannerBtn = document.getElementById('btn-close-error-banner');
  if (closeBannerBtn) {
    closeBannerBtn.onclick = () => setErrorBannerVisible(false);
  }

  // /demo bar action buttons
  document.querySelectorAll('.demo-trigger-btn').forEach(btn => {
    btn.onclick = () => {
      const action = btn.getAttribute('data-demo-action');
      if (action) triggerDemoState(action);
    };
  });

  // Rail navigation
  document.querySelectorAll('.rail a').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const targetScreen = a.getAttribute('data-screen');
      if (targetScreen) renderScreen(targetScreen);
    });
  });

  // Status bar diagnostics trigger
  const probTrigger = document.getElementById('status-problemas-trigger');
  if (probTrigger) {
    probTrigger.onclick = () => {
      state.bottomDockTab = 'problemas';
      toggleBottomPanel();
    };
  }

  // Close » portal on outside click
  document.addEventListener('click', (e) => {
    if (!state.moreTabsOpen) return;
    const portal = document.getElementById('more-tabs-portal');
    const btn = document.getElementById('bp-more-tabs-btn');
    if (portal && !portal.contains(e.target) && (!btn || !btn.contains(e.target))) {
      closeMoreTabsPortal(true);
    }
  });

  // Keyboard shortcuts: Ctrl+Alt+E (swap layout), Ctrl+J (bottom panel), Esc (close menus/panels)
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.altKey && (e.key === 'e' || e.key === 'E')) {
      e.preventDefault();
      toggleEditorFirstLayout();
      return;
    }
    if (e.ctrlKey && e.shiftKey && (e.key === 'P' || e.key === 'p')) {
      e.preventDefault();
      renderScreen('02');
      return;
    }
    if (e.ctrlKey && (e.key === 'O' || e.key === 'o') && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      renderScreen('01');
      return;
    }
    if (e.ctrlKey && (e.key === 'N' || e.key === 'n') && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      renderScreen('03');
      return;
    }
    if (e.ctrlKey && (e.key === 'J' || e.key === 'j')) {
      e.preventDefault();
      toggleBottomPanel();
      return;
    }
    if (e.ctrlKey && (e.key === 'S' || e.key === 's') && !e.shiftKey) {
      e.preventDefault();
      showEphemeralToast('Guardado');
      return;
    }
    if (e.key === 'Escape') {
      if (state.moreTabsOpen) {
        e.preventDefault();
        closeMoreTabsPortal(true);
        return;
      }
      if (state.errorBannerVisible) {
        e.preventDefault();
        setErrorBannerVisible(false);
        return;
      }
      const ephToast = document.getElementById('bara-ephemeral-toast');
      if (ephToast) {
        ephToast.remove();
        return;
      }
      if (currentScreenId === '13' || currentScreenId === '02') {
        renderScreen('03');
        return;
      }
      document.querySelectorAll('.modal-backdrop').forEach(m => m.style.display = 'none');
    }
  });

  const path = window.location.pathname;
  const urlParams = new URLSearchParams(window.location.search);
  if (path.includes('demo') || urlParams.get('demo') === '1') {
    if (demoBar) demoBar.hidden = false;
    if (toggleDemoBtn) toggleDemoBtn.classList.add('active');
    renderScreen('03');
  } else if (path.includes('buscar')) {
    renderScreen('02');
  } else if (path.includes('constructor')) {
    renderScreen('08');
  } else if (path.includes('topologia')) {
    renderScreen('09');
  } else if (path.includes('git')) {
    renderScreen('10');
  } else if (path.includes('registros') || path.includes('logs')) {
    renderScreen('12');
  } else if (path.includes('ajustes')) {
    renderScreen('13');
  } else if (path.includes('herramientas')) {
    renderScreen('07');
  } else if (path.includes('bienvenida')) {
    renderScreen('01');
  } else {
    renderScreen('03');
  }
});
