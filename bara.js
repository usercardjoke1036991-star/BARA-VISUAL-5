/**
 * Bara IDE
 * Self-contained desktop-class IDE mock for screens 01 to 15 (BARA-VISUAL-4 + BARA-VISUAL-5 additions).
 */

import {
  APP_VERSION,
  DEFAULT_TRUSTED_FOLDER,
  SHOW_ADVANCED_DEFAULT,
  HIDDEN_ADVANCED_COMPONENTS,
  ERROR_BANNER_TEXT,
  MORE_TABS_ITEMS,
  INITIAL_PROBLEMS,
  computeProblemsSummary,
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

// BARA-VISUAL-5 Additive State
let showAdvanced = SHOW_ADVANCED_DEFAULT;
let editorFirst = false;
let strictMode = false;
let autosave = true;
let rememberKey = false; // DESMARCADO por defecto
let trustedFolder = DEFAULT_TRUSTED_FOLDER;
let aiProvider = 'DeepSeek';
let errorBannerVisible = false;
let activeDiagLine = null;
let moreTabsOpen = false;
let unverifiedAccepted = false;
let unverifiedAcceptedTimestamp = '2026-11-06_1033';
let reviewCardVerified = false;
let gitRemoteUrl = 'https://gitlab.com/vexor/genesis_engine.git';

// Un solo origen de datos para los problemas (barra de estado, contador ⚠ N y panel Problemas)
let activeProblems = INITIAL_PROBLEMS.map(p => ({ ...p }));

// Registros dinámicos: conserva todos los de VISUAL-4 y añade la nueva línea tras aceptar el cambio
const BASE_REGISTROS = [
  { time: '10:31:02', level: 'INFO', color: 'var(--green-soft)', text: 'Carpeta abierta: genesis_engine' },
  { time: '10:31:04', level: 'INFO', color: 'var(--green-soft)', text: 'Kernel conectado · fa3d308' },
  { time: '10:31:18', level: 'INFO', color: 'var(--green-soft)', text: 'Cambio aceptado en HELLO.bara · respaldo 2026-11-05_1031' },
  { time: '10:31:40', level: 'AVISO', color: '#c9a227', text: 'Parche no verificado rechazado' },
  { time: '10:32:05', level: 'ERROR', color: '#c45c5c', text: 'Sin conexión con el proveedor (tiempo agotado)' },
  { time: '10:32:11', level: 'INFO', color: 'var(--green-soft)', text: 'Reintento de conexión · DeepSeek' },
  { time: '10:32:14', level: 'INFO', color: 'var(--green-soft)', text: 'Conexión OK · deepseek-chat' },
  { time: '10:32:30', level: 'AVISO', color: '#c9a227', text: 'Archivo .env detectado · excluido del commit' }
];

function getActiveRegistros() {
  const list = [...BASE_REGISTROS];
  if (unverifiedAccepted) {
    list.push({
      time: '10:33:00',
      level: 'INFO',
      color: 'var(--green-soft)',
      text: `Cambio aceptado en HELLO.bara · respaldo ${unverifiedAcceptedTimestamp}`
    });
  }
  return list;
}

try {
  if (localStorage.getItem('editorFirst') !== null) {
    editorFirst = localStorage.getItem('editorFirst') === 'true';
  }
  if (localStorage.getItem('strictMode') !== null) {
    strictMode = localStorage.getItem('strictMode') === 'true';
  }
  if (localStorage.getItem('autosave') !== null) {
    autosave = localStorage.getItem('autosave') === 'true';
  }
} catch (_) {}

const SIDEBAR_HTML = `<aside class="sidebar">
  <div style="padding:12px;border-bottom:1px solid var(--border2)">
    <div style="font-size:14px;font-weight:600;margin-bottom:8px">Proyectos</div>
    <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;color:var(--text)">
      <span style="opacity:.6">▾</span>
      ${SVG.folder(16)}
      <span>genesis_engine</span>
    </div>
    <div style="padding-left:18px;display:flex;flex-direction:column;gap:2px">
      <div style="display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:6px;background:var(--hover);color:#fff">
        <span style="color:var(--green-soft);display:inline-flex">${SVG.chat(16)}</span><span>saludo_kernel</span>
      </div>
      <div style="display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:6px;color:var(--muted)">
        <span style="display:inline-flex">${SVG.chat(16)}</span><span>Antinomia guard_01</span>
      </div>
    </div>
    <button class="btn btn-primary" style="width:100%;margin-top:10px;justify-content:center">Nuevo chat</button>
  </div>
  <div style="flex:1;overflow:hidden;padding:12px">
    <div style="font-size:14px;font-weight:600;margin-bottom:8px">Explorador</div>
    <div class="mono" style="font-size:14px;color:var(--muted)">
      <div style="display:flex;align-items:center;gap:6px;color:var(--text);margin-bottom:4px">
        <span>▾</span>${SVG.folder(16)}<span>genesis_engine</span>
      </div>
      <div style="padding-left:16px">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:2px"><span>▸</span>${SVG.folder(16)}<span>src</span></div>
        <div style="padding-left:14px;display:flex;flex-direction:column;gap:2px">
          <div style="padding:4px 8px;border-radius:5px;background:var(--hover);color:var(--green-soft)">HELLO.bara</div>
          <div style="padding:4px 8px;border-radius:5px">genesis.bara</div>
        </div>
      </div>
    </div>
  </div>
</aside>`;

// Auto-Apply desmarcado por defecto
const COMPOSER_HTML = `<div style="padding:10px 12px;border-top:1px solid var(--border);background:var(--rail);flex-shrink:0">
  <div style="background:var(--panel);border:1px solid var(--border);border-radius:10px;padding:10px">
    <div style="color:var(--muted);margin-bottom:8px">Escribe...</div>
    <div style="display:flex;align-items:center;justify-content:space-between">
      <div class="row">
        ${SVG.clip(16)}
        <label class="row" style="color:var(--muted);font-size:14px;cursor:pointer">
          <span class="check" id="auto-apply-checkbox"></span> Auto-Apply
        </label>
      </div>
      <div class="row">
        <button class="btn btn-primary">Enviar</button>
        <button class="btn btn-ghost">Detener</button>
      </div>
    </div>
  </div>
</div>`;

function buildTabbar(unsavedDot = true) {
  return `<div class="tabbar">
    <div class="tab active">
      <span>HELLO.bara</span>
      ${unsavedDot ? '<span class="dot" title="Sin guardar"></span>' : ''}
      <button type="button" class="x" aria-label="Cerrar pestaña HELLO.bara">${SVG.close(14)}</button>
    </div>
    <div class="tab">
      <span>genesis.bara</span>
      <button type="button" class="x" aria-label="Cerrar pestaña genesis.bara">${SVG.close(14)}</button>
    </div>
    <div class="tabbar-save-hint">Guardar (Ctrl+S)</div>
  </div>`;
}

// 5. NO CAMBIAR: El código del editor de VISUAL-4 (funcion / variables / si) se queda igual (6 líneas), con subrayado ondulado + tooltip
function buildEditorWithDiagnosticsHtml() {
  const hasLine2Prob = activeProblems.some(p => p.file === 'HELLO.bara' && p.line === 2);
  const hasLine4Prob = activeProblems.some(p => p.file === 'HELLO.bara' && p.line === 4);

  const gutterRows = [
    '<div>1</div>',
    hasLine2Prob ? '<div class="gutter-err" title="Variable x sin anotación de tipo">●</div>' : '<div>2</div>',
    activeDiagLine === 2 ? '<div>·</div>' : '',
    '<div>3</div>',
    hasLine4Prob ? '<div class="gutter-err" title="Identificador \'mostrar\' — aviso de firma">●</div>' : '<div>4</div>',
    activeDiagLine === 4 ? '<div>·</div>' : '',
    '<div>5</div>',
    '<div>6</div>'
  ].join('');

  const diagTooltip = (lineNum, text) => activeDiagLine === lineNum
    ? `<div><span class="diag-tooltip-row" role="status">⚠ ${text}</span></div>`
    : '';

  const bodyRows = [
    `<div class="${activeDiagLine === 1 ? 'code-line-active' : ''}" data-line="1">funcion main() {</div>`,
    `<div class="${activeDiagLine === 2 ? 'code-line-active' : ''}" data-line="2">  <span class="${hasLine2Prob ? 'diag-token diag-error' : ''}" tabindex="0" role="button" data-diag-line="2" title="Variable x sin anotación de tipo">variables x = 10</span></div>`,
    diagTooltip(2, 'Variable x sin anotación de tipo (HELLO.bara:2:3)'),
    `<div class="${activeDiagLine === 3 ? 'code-line-active' : ''}" data-line="3">  si x &gt; 5 {</div>`,
    `<div class="${activeDiagLine === 4 ? 'code-line-active' : ''}" data-line="4">    <span class="${hasLine4Prob ? 'err-line diag-token' : ''}" tabindex="0" role="button" data-diag-line="4" title="Identificador 'mostrar' — aviso de firma">mostrar("Bara IDE")</span></div>`,
    diagTooltip(4, "Identificador 'mostrar' — aviso de firma (HELLO.bara:4:5)"),
    `<div class="${activeDiagLine === 5 ? 'code-line-active' : ''}" data-line="5">  }</div>`,
    `<div class="${activeDiagLine === 6 ? 'code-line-active' : ''}" data-line="6">}</div>`
  ].join('');

  return `<div class="code"><div class="gutter">${gutterRows}</div><div class="code-body">${bodyRows}</div></div>`;
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
      { name: 'HELLO.bara', kind: 'archivo', path: 'src/HELLO.bara', line: '1', lang: 'Bara', active: true },
      { name: 'main', kind: 'función', path: 'src/HELLO.bara', line: '1', lang: 'Bara', active: false },
      { name: 'ContratoA', kind: 'contrato', path: 'src/genesis.bara', line: '12', lang: 'Bara', active: false },
      { name: 'TipoRuta', kind: 'tipo', path: 'src/genesis.bara', line: '4', lang: 'Bara', active: false }
    ],
    svg: `<svg width="420" height="360" viewBox="0 0 420 360" style="max-width:100%;height:auto">
      <line x1="180" y1="155" x2="120" y2="110" stroke="#3f6d4b" stroke-width="1.5"/>
      <line x1="240" y1="155" x2="300" y2="110" stroke="#3f6d4b" stroke-width="1.5"/>
      <line x1="185" y1="210" x2="130" y2="260" stroke="#3f6d4b" stroke-width="1.5"/>
      <line x1="240" y1="210" x2="290" y2="250" stroke="#3f6d4b" stroke-width="1.5"/>
      <circle cx="210" cy="180" r="38" fill="#183120" stroke="#3f6d4b" stroke-width="2"/>
      <text x="210" y="185" text-anchor="middle" fill="#d7e3f0" font-size="14" font-family="Segoe UI">HELLO</text>
      <circle cx="100" cy="90" r="30" fill="#111821" stroke="#3f6d4b" stroke-width="1.5"/>
      <text x="100" y="95" text-anchor="middle" fill="#d7e3f0" font-size="14" font-family="Segoe UI">main</text>
      <circle cx="320" cy="90" r="36" fill="#111821" stroke="#528960" stroke-width="1.5"/>
      <text x="320" y="95" text-anchor="middle" fill="#d7e3f0" font-size="14" font-family="Segoe UI">ContratoA</text>
      <circle cx="110" cy="280" r="34" fill="#111821" stroke="#1e2a38" stroke-width="1.5"/>
      <text x="110" y="285" text-anchor="middle" fill="#d7e3f0" font-size="14" font-family="Segoe UI">TipoRuta</text>
      <circle cx="310" cy="270" r="28" fill="#111821" stroke="#1e2a38" stroke-width="1.5"/>
      <text x="310" y="275" text-anchor="middle" fill="#8a97a8" font-size="14" font-family="Segoe UI">src</text>
    </svg>`
  },
  bara: {
    nodes: [
      { name: 'kernel.bara', kind: 'módulo', path: 'bara/kernel.bara', line: '1', lang: 'Bara', active: true },
      { name: 'mostrar', kind: 'primitiva', path: 'bara/io.bara', line: '8', lang: 'Bara', active: false },
      { name: 'registrar', kind: 'primitiva', path: 'bara/log.bara', line: '14', lang: 'Bara', active: false },
      { name: 'Firma', kind: 'contrato', path: 'bara/firma.bara', line: '3', lang: 'Bara', active: false }
    ],
    svg: `<svg width="420" height="360" viewBox="0 0 420 360" style="max-width:100%;height:auto">
      <line x1="180" y1="160" x2="115" y2="105" stroke="#528960" stroke-width="1.5"/>
      <line x1="240" y1="160" x2="305" y2="105" stroke="#528960" stroke-width="1.5"/>
      <line x1="210" y1="218" x2="210" y2="275" stroke="#3f6d4b" stroke-width="1.5"/>
      <circle cx="210" cy="180" r="38" fill="#1b3d26" stroke="#528960" stroke-width="2"/>
      <text x="210" y="185" text-anchor="middle" fill="#d7e3f0" font-size="14" font-family="Segoe UI">kernel</text>
      <circle cx="95" cy="90" r="34" fill="#111821" stroke="#3f6d4b" stroke-width="1.5"/>
      <text x="95" y="95" text-anchor="middle" fill="#d7e3f0" font-size="14" font-family="Segoe UI">mostrar</text>
      <circle cx="325" cy="90" r="36" fill="#111821" stroke="#3f6d4b" stroke-width="1.5"/>
      <text x="325" y="95" text-anchor="middle" fill="#d7e3f0" font-size="14" font-family="Segoe UI">registrar</text>
      <circle cx="210" cy="305" r="32" fill="#111821" stroke="#528960" stroke-width="1.5"/>
      <text x="210" y="310" text-anchor="middle" fill="#d7e3f0" font-size="14" font-family="Segoe UI">Firma</text>
    </svg>`
  }
};

function renderTopologyNodesList(scope) {
  const data = TOPOLOGY_SETS[scope] || TOPOLOGY_SETS.proyecto;
  return data.nodes.map((n, idx) => `
    <div class="topology-node-item" data-node-idx="${idx}" style="display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:8px;cursor:pointer;${n.active ? 'background:var(--hover)' : ''}">
      <span style="width:8px;height:8px;border-radius:50%;background:var(--green-soft);flex-shrink:0"></span>
      <div style="min-width:0">
        <div style="color:#fff;font-weight:500;font-size:14px">${n.name}</div>
        <div style="font-size:14px;color:var(--muted)">tipo: ${n.kind}</div>
      </div>
    </div>
  `).join('');
}

// 2. CONTADORES COHERENTES: Tabla de Problemas generada desde el único origen de datos (activeProblems)
function buildProblemsTableHtml() {
  const rowsHtml = activeProblems.map(p => `
    <div class="problem-row" role="button" tabindex="0" data-file="${p.file}" data-line="${p.line}" style="display:grid;grid-template-columns:minmax(130px,auto) 1fr auto auto;gap:10px;align-items:center;padding:6px 12px;border-bottom:1px solid var(--border2);font-size:14px;cursor:pointer;">
      <span class="mono" style="color:var(--green-soft)">${p.location}</span>
      <span style="min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${p.message}</span>
      <span style="color:${p.severity === 'error' ? '#c45c5c' : '#c9a227'}">${p.severity === 'error' ? '✖ error' : '⚠ aviso'}</span>
      <button type="button" class="btn btn-ghost btn-dismiss-problem" data-dismiss-problem="${p.id}" title="Descartar problema" style="padding:2px 8px;font-size:14px">Descartar</button>
    </div>
  `).join('');

  return `
    <div style="display:grid;grid-template-columns:minmax(130px,auto) 1fr auto auto;gap:10px;padding:6px 12px;color:var(--muted);font-size:14px;border-bottom:1px solid var(--border2)">
      <span>archivo:línea:col</span><span>mensaje</span><span>tipo</span><span>acción</span>
    </div>
    ${rowsHtml || '<div style="padding:12px;color:var(--muted);font-size:14px">Sin problemas activos.</div>'}
  `;
}

function buildBottomDockHtml() {
  const summary = computeProblemsSummary(activeProblems);
  return `<div id="bottom-dock" style="height:210px;border-top:1px solid var(--border);background:#0a0c0d;display:flex;flex-direction:column;flex-shrink:0">
    <div style="height:36px;display:flex;align-items:center;padding:0 6px;border-bottom:1px solid var(--border);gap:2px;min-width:0">
      <div id="bp-tab-problemas" class="bp-tab" role="button" tabindex="0" style="padding:4px 6px;background:var(--hover);border-radius:4px;color:#fff;font-weight:600;cursor:pointer;font-size:14px;white-space:nowrap;flex-shrink:0">Problemas (${summary.total})</div>
      <div id="bp-tab-registros" class="bp-tab" role="button" tabindex="0" style="padding:4px 6px;color:var(--muted);cursor:pointer;font-size:14px;white-space:nowrap;flex-shrink:0">Registros</div>
      <div id="bp-tab-terminal" class="bp-tab" role="button" tabindex="0" style="padding:4px 6px;color:var(--muted);cursor:pointer;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0;flex:0 1 auto">Terminal kernel</div>
      <button type="button" id="bp-more-tabs-btn" class="dock-ctrl-btn" aria-label="Más pestañas" aria-haspopup="menu" aria-expanded="false" title="Más pestañas (»)" style="padding:0 7px;width:auto;font-weight:700;color:var(--green-soft)">»</button>
      <div style="margin-left:auto;display:flex;gap:2px;align-items:center;flex-shrink:0">
        <button type="button" id="bp-btn-minimize" class="dock-ctrl-btn" aria-label="Minimizar panel" title="Minimizar panel (Ctrl+J)">${SVG.minimize(16)}</button>
        <button type="button" id="bp-btn-maximize" class="dock-ctrl-btn" aria-label="Maximizar panel" title="Maximizar panel">${SVG.maximize(16)}</button>
        <button type="button" id="bp-btn-close" class="dock-ctrl-btn" aria-label="Cerrar panel" title="Cerrar panel (Ctrl+J)">${SVG.close(16)}</button>
      </div>
    </div>
    <div id="bp-content" style="flex:1;overflow:auto">
      ${buildProblemsTableHtml()}
    </div>
  </div>`;
}

// 1. RECUPERAR la tarjeta de revisión de cambio en el Chat («Revisión de cambio · HELLO.bara»)
function buildChatReviewCardHtml() {
  const acceptState = computeAcceptButtonState({
    patchVerified: reviewCardVerified,
    strictMode
  });

  const statusPill = reviewCardVerified
    ? `<span id="review-card-status-pill" class="chip" role="button" tabindex="0" title="Cambiar estado de verificación" style="cursor:pointer;padding:2px 8px">Verificado</span>`
    : `<span id="review-card-status-pill" class="chip chip-danger" role="button" tabindex="0" title="Cambiar estado de verificación" style="cursor:pointer;padding:2px 8px">No verificado</span>`;

  let actionAreaHtml = '';
  if (unverifiedAccepted) {
    actionAreaHtml = `<div id="unverified-patch-notice" role="status" style="margin-top:4px;padding:6px 10px;background:#152018;border:1px solid var(--green-mid);border-radius:8px;display:flex;align-items:center;justify-content:space-between;gap:8px">
      <span style="font-size:14px">Cambio aceptado en <span class="mono">HELLO.bara</span> · respaldo <span class="mono">${unverifiedAcceptedTimestamp}</span></span>
      <button type="button" id="btn-unverified-undo" class="btn btn-ghost" style="padding:3px 10px;flex-shrink:0">Deshacer</button>
    </div>`;
  } else if (!reviewCardVerified) {
    actionAreaHtml = `<div id="unverified-patch-notice" role="status" style="margin-top:4px;padding:6px 10px;background:#2a1515;border:1px solid var(--danger);border-radius:8px;color:#f0b0b0;display:flex;flex-direction:column;gap:5px">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap">
        <div style="display:flex;align-items:center;gap:6px;font-weight:600">
          ${SVG.warn(16)}
          <span>Este cambio NO está verificado</span>
        </div>
        <div class="row" style="gap:6px">
          <button type="button" id="btn-unverified-accept" class="btn btn-danger" style="padding:3px 10px" ${acceptState.disabled ? 'disabled aria-disabled="true" title="Modo estricto: verifica antes de aceptar"' : ''}>Aceptar</button>
          <button type="button" id="btn-unverified-reject" class="btn btn-ghost" style="padding:3px 10px">Rechazar</button>
        </div>
      </div>
      ${acceptState.disabled ? `<div id="strict-mode-block-msg" style="font-size:14px;color:#ffd0d0">${acceptState.explanation}</div>` : ''}
    </div>`;
  } else {
    actionAreaHtml = `<div id="unverified-patch-notice" role="status" style="margin-top:4px;display:flex;align-items:center;justify-content:space-between;gap:8px">
      <span style="color:var(--green-soft);font-size:14px">Verificado por el kernel ✓</span>
      <div class="row" style="gap:6px">
        <button type="button" id="btn-unverified-accept" class="btn btn-primary" style="padding:3px 10px">Aceptar</button>
        <button type="button" id="btn-unverified-reject" class="btn btn-ghost" style="padding:3px 10px">Rechazar</button>
      </div>
    </div>`;
  }

  return `<div id="chat-review-card" class="card" style="padding:8px 12px;border-color:${reviewCardVerified ? 'var(--green-mid)' : '#5a3030'};display:flex;flex-direction:column;gap:4px;max-width:460px;flex-shrink:0">
    <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap">
      <strong style="font-size:14px;color:#fff">Revisión de cambio · <span class="mono">HELLO.bara</span></strong>
      ${statusPill}
    </div>
    <div style="font-size:14px;color:var(--muted);display:flex;flex-wrap:wrap;gap:4px 12px">
      <span>Archivo: <span class="mono" style="color:var(--text)">HELLO.bara</span></span>
      <span>Líneas: <span class="mono" style="color:var(--text)">3–6</span></span>
      <span>Funciones: <span class="mono" style="color:var(--text)">main()</span></span>
    </div>
    <div class="mono" style="background:#08090a;border:1px solid var(--border);border-radius:6px;padding:4px 8px;font-size:14px;line-height:1.35">
      <div class="diff-del">-   mostrar("hola")</div>
      <div class="diff-add">+   mostrar("Bara IDE")</div>
      <div class="diff-add">+   registrar("ok")</div>
    </div>
    ${actionAreaHtml}
  </div>`;
}

function getScreen06Html() {
  const acceptState = computeAcceptButtonState({
    patchVerified: false,
    strictMode
  });
  return `${SIDEBAR_HTML}
    <section class="main" style="border-right:1px solid var(--border)">
      <div style="height:42px;display:flex;align-items:center;justify-content:space-between;padding:0 14px;border-bottom:1px solid var(--border);background:var(--rail)">
        <strong>Chat</strong>
        <button class="btn btn-ghost" style="padding:5px 10px">Ajustes</button>
      </div>
      <div style="flex:1;min-height:0;overflow-y:auto;padding:12px 14px;display:flex;flex-direction:column;gap:10px">
        <div style="align-self:flex-end;background:var(--hover);border:1px solid var(--border);padding:8px 12px;border-radius:12px">Añade mostrar_todo()</div>
        <div style="align-self:flex-start;background:var(--panel);border:1px solid var(--border);padding:10px 12px;border-radius:12px;max-width:440px">
          <div style="margin-bottom:6px">Parche propuesto (sin verificación del kernel).</div>
          <span class="chip-danger chip" style="display:inline-flex">Código inventado: la función mostrar_todo() no existe</span>
        </div>
        ${buildChatReviewCardHtml()}
      </div>
      ${COMPOSER_HTML}
    </section>
    <aside class="editor-pane">
      <div class="banner banner-warn" role="status" style="justify-content:space-between">
        <span style="display:inline-flex;align-items:center;gap:8px">${SVG.warn(18)} <span>Este cambio <strong>NO</strong> está verificado por el kernel</span></span>
        <div class="row">
          <button class="btn btn-primary">Rechazar</button>
          <button class="btn btn-danger" ${acceptState.disabled ? 'disabled aria-disabled="true" title="Modo estricto: verifica antes de aceptar"' : ''}>Aceptar de todos modos</button>
        </div>
      </div>
      ${buildTabbar(true)}
      <div class="code">
        <div class="gutter"><div>1</div><div>2</div><div>3</div><div>4</div><div>4</div><div>5</div><div>6</div><div>6</div><div>7</div></div>
        <div class="code-body"><div>funcion main() {</div><div>  variables x = 10</div><div>  si x &gt; 5 {</div><div class="diff-del">-   mostrar("hola")</div><div class="diff-add">+   mostrar("Bara IDE")</div><div class="diff-add">+   mostrar_todo()</div><div class="diff-add">+   registrar("ok")</div><div>  }</div><div>}</div></div>
      </div>
    </aside>`;
}

// 3. AJUSTES: AÑADIR Carpeta de confianza (C:/Users/Vexor/Downloads/bara-ide + Cambiar…), Autoguardado (encendido por defecto) y Recordar clave DESMARCADO por defecto
function getScreen13Html() {
  const isLocal = aiProvider === 'Modelo local (GGUF)';
  return `<main class="main" style="padding:12px 24px;background:#08090a;overflow:auto">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px">
        <h1 style="margin:0;font-size:22px;color:#fff">Ajustes</h1>
        <span class="chip">Conexión OK</span>
        <span class="chip mono">Versión ${APP_VERSION}</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;max-width:980px">
        <div class="card" style="display:flex;flex-direction:column;gap:8px;padding:12px 16px">
          <div class="row" style="justify-content:space-between">
            <span>Offline</span><div class="toggle"></div>
          </div>
          <div class="row" style="justify-content:space-between">
            <span>GGUF</span><div class="toggle ${isLocal ? 'on' : ''}"></div>
          </div>
          <div class="row" style="justify-content:space-between">
            <div>
              <span>Modo estricto</span>
              <div style="font-size:14px;color:var(--muted)">Bloquea Aceptar en cambios no verificados</div>
            </div>
            <button type="button" id="toggle-strict-mode" role="switch" aria-checked="${strictMode ? 'true' : 'false'}" aria-label="Modo estricto" class="toggle ${strictMode ? 'on' : ''}"></button>
          </div>
          <div class="row" style="justify-content:space-between">
            <span>Autoguardado</span>
            <button type="button" id="toggle-autosave" role="switch" aria-checked="${autosave ? 'true' : 'false'}" aria-label="Autoguardado" class="toggle ${autosave ? 'on' : ''}"></button>
          </div>
          <div>
            <label class="label" for="settings-provider-select">Proveedor</label>
            <select id="settings-provider-select" class="field" aria-label="Proveedor de IA">
              <option value="DeepSeek" ${!isLocal ? 'selected' : ''}>DeepSeek ▾</option>
              <option value="Modelo local (GGUF)" ${isLocal ? 'selected' : ''}>Modelo local (GGUF)</option>
            </select>
          </div>
          <div>
            <label class="label">Modelo</label>
            <div class="field mono">${isLocal ? 'No hay pesos locales cargados' : 'deepseek-chat'}</div>
          </div>
          <div>
            <label class="label">Clave conexión</label>
            <div class="field" style="color:var(--muted)">····················</div>
          </div>
          <div class="row">
            <button class="btn btn-ghost">Listar modelos</button>
            <button class="btn btn-ghost">Probar conexión</button>
          </div>
          <div>
            <label class="label">Raíz de la API</label>
            <div class="field mono" style="font-size:14px">https://api.deepseek.com/v1</div>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px">
          <div class="card" style="border-style:dashed;padding:12px 16px">
            <div style="font-weight:600;margin-bottom:6px">Avanzado</div>
            <div class="row" style="justify-content:space-between;margin-bottom:6px">
              <span>Temperatura</span>
              <span class="mono">0.2</span>
            </div>
            <div style="height:6px;background:#1e2a38;border-radius:999px;margin-bottom:8px">
              <div style="width:20%;height:100%;background:var(--green-soft);border-radius:999px"></div>
            </div>
            <div>
              <label class="label">Máximo de tokens</label>
              <div class="field mono">4096</div>
            </div>
            <div style="margin-top:6px">
              <label class="label">Prompt del sistema</label>
              <div class="field" style="min-height:44px">Eres el asistente oficial del lenguaje Bara.</div>
            </div>
            <label id="label-remember-key" class="row" style="margin-top:8px;color:var(--muted);cursor:pointer">
              <span id="check-remember-key" class="check ${rememberKey ? 'on' : ''}">${rememberKey ? '✓' : ''}</span> Recordar clave en llavero local
            </label>
          </div>
          <div class="card" style="padding:12px 16px">
            <div style="font-weight:600;margin-bottom:6px">Carpeta de confianza</div>
            <div style="display:flex;align-items:center;gap:8px">
              <input id="trusted-folder-input" class="field mono" readonly value="${trustedFolder}" aria-label="Carpeta de confianza"/>
              <button type="button" id="btn-change-trusted-folder" class="btn btn-ghost" style="flex-shrink:0">Cambiar…</button>
            </div>
          </div>
          <div class="card" style="padding:10px 16px">
            <div style="font-weight:600;margin-bottom:6px">Ajustes de interfaz</div>
            <div class="row" style="justify-content:space-between;margin-bottom:4px">
              <span>Tamaño de letra</span>
              <span class="mono">14 px mínimo</span>
            </div>
            <div class="row" style="justify-content:space-between;margin-bottom:4px">
              <span>Tema</span>
              <span>Oscuro (BARA)</span>
            </div>
            <div class="row" style="justify-content:space-between">
              <span>Versión</span>
              <span class="mono">${APP_VERSION}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="row" style="margin-top:10px;gap:10px">
        <button class="btn btn-primary">${SVG.save(16)} Guardar</button>
        <button class="btn btn-ghost">Valores de fábrica</button>
        <button class="btn btn-danger">Olvidar</button>
      </div>
    </main>`;
}

function getScreen12Html() {
  const rows = getActiveRegistros().map(r => `
    <div class="mono" style="padding:6px 0;border-bottom:1px solid rgba(30,42,56,.5)">
      <span style="color:var(--muted)">${r.time}</span>
      <span style="color:${r.color};font-weight:600"> [${r.level}]</span>
      <span> ${r.text}</span>
    </div>
  `).join('');

  return `<main class="main" style="padding:22px 32px;background:#08090a">
    <h1 style="margin:0 0 14px;font-size:22px;color:var(--green-soft)">Registros</h1>
    <div class="row" style="margin-bottom:14px;flex-wrap:wrap">
      <span class="chip" style="background:var(--green-dim);color:#fff;border-color:var(--green-mid)">Todo</span><span class="chip">Errores</span><span class="chip">Avisos</span><span class="chip">Info</span>
      <input class="field" style="max-width:280px;margin-left:auto" placeholder="Filtrar registros…"/>
    </div>
    <div class="card" style="max-width:1000px;font-size:14px;line-height:1.5">
      ${rows}
    </div>
  </main>`;
}

const SCREENS = {
  "01": {
    "id": "01",
    "rail": "Archivos",
    "label": "01 · Bienvenida",
    "html": `<main class="main" style="align-items:center;justify-content:center;background:#08090a">
      <div style="width:700px;max-width:92%">
        <div style="text-align:center;margin-bottom:18px;color:var(--muted);font-size:14px">
          <span class="chip" style="margin-bottom:10px">Sin carpeta abierta</span>
          <div style="margin-top:10px">Atajos: <span class="mono">Ctrl+O</span> abrir · <span class="mono">Ctrl+N</span> nuevo</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:22px">
          <div class="card" role="button" tabindex="0" style="display:flex;align-items:center;gap:14px;border-color:#2a3a2e;cursor:pointer">
            <div style="color:var(--green-soft);display:flex">${SVG.folder(20)}</div>
            <div>
              <div style="font-size:15px;font-weight:600;color:#fff">Abrir carpeta</div>
              <div style="font-size:14px;color:var(--muted);margin-top:2px">Abrir una carpeta o proyecto · Ctrl+O</div>
            </div>
          </div>
          <div class="card" role="button" tabindex="0" style="display:flex;align-items:center;gap:14px;cursor:pointer">
            <div style="color:var(--green-soft);display:flex">${SVG.filePlus(20)}</div>
            <div>
              <div style="font-size:15px;font-weight:600;color:#fff">Nuevo archivo .bara</div>
              <div style="font-size:14px;color:var(--muted);margin-top:2px">Crear script vacío · Ctrl+N</div>
            </div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;color:var(--muted);margin-bottom:10px;font-size:14px">
          <span style="display:inline-flex">${SVG.clock(16)}</span><span style="font-weight:600;color:var(--text)">Proyectos recientes</span>
        </div>
        <div class="card" style="padding:8px">
          <div class="recent-project-item" role="button" tabindex="0" style="display:flex;align-items:center;gap:12px;padding:12px;border-radius:8px;background:rgba(255,255,255,0.02);cursor:pointer">
            <span style="color:var(--green-soft);display:inline-flex">${SVG.cube(18)}</span>
            <div style="flex:1">
              <div style="font-weight:600;color:#fff;font-size:14px">genesis_engine</div>
              <div class="mono" style="font-size:14px;color:var(--muted)">~/proyectos/genesis_engine</div>
            </div>
            <span style="color:var(--muted);font-size:14px">Hace 2 días</span>
          </div>
          <div class="recent-project-item" role="button" tabindex="0" style="display:flex;align-items:center;gap:12px;padding:12px;border-radius:8px;cursor:pointer">
            <span style="color:var(--green-soft);display:inline-flex">${SVG.cube(18)}</span>
            <div style="flex:1">
              <div style="font-weight:600;color:#fff;font-size:14px">shoresh_met_lib</div>
              <div class="mono" style="font-size:14px;color:var(--muted)">~/proyectos/shoresh_met_lib</div>
            </div>
            <span style="color:var(--muted);font-size:14px">Hace 5 días</span>
          </div>
        </div>
      </div>
    </main>`
  },
  "02": {
    "id": "02",
    "rail": "Buscar",
    "label": "02 · Buscar",
    "html": `<main class="main" style="padding:28px 40px;background:#08090a">
      <h1 style="margin:0 0 16px;font-size:22px;font-weight:650;color:#fff">Buscar</h1>
      <div style="position:relative;margin-bottom:18px">
        <div class="field" style="display:flex;align-items:center;gap:10px;padding:12px 14px">
          <span style="opacity:.7;display:inline-flex">${SVG.search(16)}</span>
          <span style="flex:1;color:var(--muted)">Buscar función o herramienta</span>
          <span class="chip mono">Ctrl+Shift+P</span>
        </div>
      </div>
      <div style="max-width:860px">
        <div class="search-row" role="button" tabindex="0" data-target="01" style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border:1px solid var(--green-mid);border-radius:10px;margin-bottom:8px;background:var(--hover);cursor:pointer">
          <div>
            <div style="font-weight:600;color:#fff;font-size:15px">Abrir carpeta</div>
            <div style="color:var(--muted);font-size:14px;margin-top:2px">Seleccionar directorio de proyecto</div>
          </div>
          <span class="mono" style="color:var(--muted);font-size:14px;background:#0d1218;padding:4px 8px;border-radius:6px;border:1px solid var(--border)">Ctrl+O</span>
        </div>
        <div class="search-row" role="button" tabindex="0" data-target="03" style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border:1px solid var(--border2);border-radius:10px;margin-bottom:8px;cursor:pointer">
          <div>
            <div style="font-weight:600;color:#fff;font-size:15px">Nuevo archivo .bara</div>
            <div style="color:var(--muted);font-size:14px;margin-top:2px">Crear nuevo script</div>
          </div>
          <span class="mono" style="color:var(--muted);font-size:14px;background:#0d1218;padding:4px 8px;border-radius:6px;border:1px solid var(--border)">Ctrl+N</span>
        </div>
        <div class="search-row" role="button" tabindex="0" data-target="03" style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border:1px solid var(--border2);border-radius:10px;margin-bottom:8px;cursor:pointer">
          <div>
            <div style="font-weight:600;color:#fff;font-size:15px">Chat asistente</div>
            <div style="color:var(--muted);font-size:14px;margin-top:2px">Iniciar nueva conversación</div>
          </div>
          <span class="mono" style="color:var(--muted);font-size:14px;background:#0d1218;padding:4px 8px;border-radius:6px;border:1px solid var(--border)">Ctrl+L</span>
        </div>
        <div class="search-row" role="button" tabindex="0" data-target="12" style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border:1px solid var(--border2);border-radius:10px;margin-bottom:8px;cursor:pointer">
          <div>
            <div style="font-weight:600;color:#fff;font-size:15px">Registros</div>
            <div style="color:var(--muted);font-size:14px;margin-top:2px">Ver registro de eventos</div>
          </div>
          <span class="mono" style="color:var(--muted);font-size:14px;background:#0d1218;padding:4px 8px;border-radius:6px;border:1px solid var(--border)">Ctrl+Shift+L</span>
        </div>
        <div class="search-row" role="button" tabindex="0" data-target="09" style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border:1px solid var(--border2);border-radius:10px;margin-bottom:8px;cursor:pointer">
          <div>
            <div style="font-weight:600;color:#fff;font-size:15px">Topología</div>
            <div style="color:var(--muted);font-size:14px;margin-top:2px">Navegación de nodos y conexiones</div>
          </div>
          <span class="mono" style="color:var(--muted);font-size:14px;background:#0d1218;padding:4px 8px;border-radius:6px;border:1px solid var(--border)">Ctrl+Shift+T</span>
        </div>
        <div class="search-row" role="button" tabindex="0" data-target="08" style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border:1px solid var(--border2);border-radius:10px;margin-bottom:8px;cursor:pointer">
          <div>
            <div style="font-weight:600;color:#fff;font-size:15px">Constructor visual</div>
            <div style="color:var(--muted);font-size:14px;margin-top:2px">Interfaz gráfica de diseño</div>
          </div>
          <span class="mono" style="color:var(--muted);font-size:14px;background:#0d1218;padding:4px 8px;border-radius:6px;border:1px solid var(--border)">Ctrl+Shift+V</span>
        </div>
        <div class="search-row" role="button" tabindex="0" data-target="13" style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border:1px solid var(--border2);border-radius:10px;margin-bottom:8px;cursor:pointer">
          <div>
            <div style="font-weight:600;color:#fff;font-size:15px">Ajustes</div>
            <div style="color:var(--muted);font-size:14px;margin-top:2px">Configuración general</div>
          </div>
          <span class="mono" style="color:var(--muted);font-size:14px;background:#0d1218;padding:4px 8px;border-radius:6px;border:1px solid var(--border)">Ctrl+,</span>
        </div>
      </div>
    </main>`
  },
  "03": {
    "id": "03",
    "rail": "Chat",
    "label": "03 · Chat + Editor",
    get html() {
      return `${SIDEBAR_HTML}
      <section class="main" style="border-right:1px solid var(--border)">
        <div style="height:42px;display:flex;align-items:center;justify-content:space-between;padding:0 14px;border-bottom:1px solid var(--border);background:var(--rail);flex-shrink:0">
          <strong style="font-size:15px">Chat</strong>
          <button class="btn btn-ghost" style="padding:5px 10px">Ajustes</button>
        </div>
        <div style="height:28px;display:flex;align-items:center;gap:8px;padding:0 14px;border-bottom:1px solid var(--border);background:#0d1218;font-size:14px;color:var(--muted);flex-shrink:0">
          <span style="width:8px;height:8px;border-radius:50%;background:var(--green-soft)"></span>
          <span class="mono" style="color:var(--text)">HELLO.bara</span>
        </div>
        <div style="flex:1;min-height:0;overflow-y:auto;padding:10px 14px;display:flex;flex-direction:column;gap:8px">
          <div style="padding:8px 10px;background:rgba(17,24,33,.85);border:1px solid var(--border);border-radius:8px;font-size:14px;color:var(--muted)">
            <div style="color:var(--green-soft)">✓ Leí HELLO.bara</div>
            <div style="color:var(--green-soft)">✓ Sin diagnósticos nuevos</div>
            <div style="color:var(--green-soft)">✓ Confirmé firma</div>
          </div>
          <div style="align-self:flex-end;background:var(--hover);border:1px solid var(--border);padding:8px 12px;border-radius:12px;max-width:320px">¿Qué hace este código?</div>
          <div style="align-self:flex-start;background:var(--panel);border:1px solid var(--border);padding:10px 12px;border-radius:12px;max-width:440px">
            <p style="margin:0 0 6px">El archivo <span class="mono" style="color:var(--green-soft)">HELLO.bara</span> define el punto de entrada con <span class="mono">funcion main()</span>.</p>
            <div class="mono" style="background:#08090a;border:1px solid var(--border);border-radius:6px;padding:6px 8px;font-size:14px;color:var(--muted)">funcion main() {<br/>&nbsp;&nbsp;variables x = 10<br/>&nbsp;&nbsp;si x &gt; 5 { mostrar("Bara IDE") }<br/>}</div>
          </div>
          ${buildChatReviewCardHtml()}
        </div>
        ${COMPOSER_HTML}
      </section>
      <aside class="editor-pane">
        ${buildTabbar(true)}
        ${buildEditorWithDiagnosticsHtml()}
      </aside>`;
    }
  },
  "04": {
    "id": "04",
    "rail": "Chat",
    "label": "04 · Cambio propuesto (diff)",
    "html": `${SIDEBAR_HTML}
    <section class="main" style="border-right:1px solid var(--border)">
      <div style="height:42px;display:flex;align-items:center;justify-content:space-between;padding:0 14px;border-bottom:1px solid var(--border);background:var(--rail)">
        <strong>Chat</strong>
        <button class="btn btn-ghost" style="padding:5px 10px">Ajustes</button>
      </div>
      <div style="flex:1;overflow:hidden;padding:14px;display:flex;flex-direction:column;gap:12px">
        <div style="align-self:flex-end;background:var(--hover);border:1px solid var(--border);padding:10px 14px;border-radius:12px">Mejora el saludo y registra el resultado</div>
        <div style="align-self:flex-start;background:var(--panel);border:1px solid var(--border);padding:12px 14px;border-radius:12px;max-width:440px">
          <div style="margin-bottom:8px">Propongo este cambio en el cuerpo de <span class="mono">main</span>.</div>
          <span class="chip">Toca: HELLO.bara (líneas 3–6)</span>
          <div style="margin-top:10px;font-size:14px;color:var(--muted)">Se creará respaldo en <span class="mono">.bara-backup/</span> al aceptar.</div>
        </div>
      </div>
      ${COMPOSER_HTML}
    </section>
    <aside class="editor-pane">
      <div style="padding:10px 12px;border-bottom:1px solid var(--border);background:#122018;display:flex;flex-direction:column;gap:8px;flex-shrink:0">
        <div style="font-size:14px;white-space:nowrap">
          <strong>Cambio propuesto</strong> · <span class="mono">HELLO.bara</span>
          · <span style="color:var(--green-soft)">+3</span> <span style="color:#c99">−1</span>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap">
          <span class="chip" style="white-space:nowrap">Verificado por el kernel ✓</span>
          <div class="row" style="flex-shrink:0;gap:6px;margin-left:auto">
            <button class="btn btn-ghost" style="padding:5px 10px">Rechazar</button>
            <button class="btn btn-primary" style="padding:5px 10px">Aceptar</button>
          </div>
        </div>
      </div>
      ${buildTabbar(true)}
      <div class="code">
        <div class="gutter"><div>1</div><div>2</div><div>3</div><div>4</div><div>4</div><div>5</div><div>6</div><div>6</div><div>7</div></div>
        <div class="code-body"><div>funcion main() {</div><div>  variables x = 10</div><div>  si x &gt; 5 {</div><div class="diff-del">-   mostrar("hola")</div><div class="diff-add">+   mostrar("Bara IDE")</div><div class="diff-add">+   registrar("ok")</div><div class="diff-add">+   devolver x</div><div>  }</div><div>}</div></div>
      </div>
    </aside>`
  },
  "05": {
    "id": "05",
    "rail": "Chat",
    "label": "05 · Cambio aplicado",
    "html": `${SIDEBAR_HTML}
    <section class="main" style="border-right:1px solid var(--border);position:relative">
      <div style="height:42px;display:flex;align-items:center;justify-content:space-between;padding:0 14px;border-bottom:1px solid var(--border);background:var(--rail)">
        <strong>Chat</strong>
        <button class="btn btn-ghost" style="padding:5px 10px">Ajustes</button>
      </div>
      <div style="flex:1;overflow:hidden;padding:14px;display:flex;flex-direction:column;gap:12px">
        <div style="align-self:flex-start;background:var(--panel);border:1px solid var(--border);padding:12px 14px;border-radius:12px;max-width:420px">
          Cambio aplicado. Puedes deshacer desde el aviso inferior.
        </div>
      </div>
      ${COMPOSER_HTML}
    </section>
    <aside class="editor-pane">
      ${buildTabbar(false)}
      <div class="code">
        <div class="gutter"><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div><div>7</div></div>
        <div class="code-body"><div>funcion main() {</div><div>  variables x = 10</div><div>  si x &gt; 5 {</div><div>    mostrar("Bara IDE")</div><div>    registrar("ok")</div><div>  }</div><div>}</div></div>
      </div>
      <div class="toast" id="toast-05" style="bottom:24px;left:50%;transform:translateX(-50%);width:calc(100% - 24px);justify-content:space-between">
        <span style="min-width:0;overflow:hidden;text-overflow:ellipsis">Cambio aplicado a <span class="mono">HELLO.bara</span> · respaldo guardado</span>
        <div style="display:flex;align-items:center;gap:8px;flex-shrink:0;margin-left:auto">
          <button type="button" class="btn btn-ghost" style="padding:4px 10px;flex-shrink:0" id="toast-deshacer-btn">Deshacer</button>
          <button type="button" id="toast-close-btn" class="icon-close-btn" aria-label="Cerrar notificación">${SVG.close(16)}</button>
        </div>
      </div>
    </aside>`
  },
  "06": {
    "id": "06",
    "rail": "Chat",
    "label": "06 · Cambio no verificado",
    get html() {
      return getScreen06Html();
    }
  },
  "07": {
    "id": "07",
    "rail": "Herramientas",
    "label": "07 · Herramientas hub",
    "html": `<main class="main" style="padding:24px 32px;background:#08090a">
      <h1 style="margin:0 0 6px;font-size:22px;color:#fff">Herramientas</h1>
      <p style="margin:0 0 18px;color:var(--muted)">Acceso a las funciones del IDE fuera del rail principal.</p>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;max-width:980px">
        <div class="card tool-card" role="button" tabindex="0" data-tool="08" style="min-height:110px;display:flex;flex-direction:column;gap:8px;cursor:pointer">
          <div style="display:flex;align-items:center;gap:10px">
            <span style="color:var(--green-soft);display:inline-flex">${SVG.puzzle(20)}</span>
            <strong style="font-size:16px;color:#fff">Constructor visual</strong>
          </div>
          <div style="color:var(--muted);font-size:14px;line-height:1.45">Lienzo de bloques fuente → sumidero, traducir y firmar</div>
        </div>
        <div class="card tool-card" role="button" tabindex="0" data-tool="09" style="min-height:110px;display:flex;flex-direction:column;gap:8px;cursor:pointer">
          <div style="display:flex;align-items:center;gap:10px">
            <span style="color:var(--green-soft);display:inline-flex">${SVG.network(20)}</span>
            <strong style="font-size:16px;color:#fff">Topología</strong>
          </div>
          <div style="color:var(--muted);font-size:14px;line-height:1.45">Grafo de archivos, funciones y contratos del proyecto</div>
        </div>
        <div class="card tool-card" role="button" tabindex="0" data-tool="10" style="min-height:110px;display:flex;flex-direction:column;gap:8px;cursor:pointer">
          <div style="display:flex;align-items:center;gap:10px">
            <span style="color:var(--green-soft);display:inline-flex">${SVG.git(20)}</span>
            <strong style="font-size:16px;color:#fff">Git</strong>
          </div>
          <div style="color:var(--muted);font-size:14px;line-height:1.45">Control de versiones, commits y archivos cambiados</div>
        </div>
        <div class="card tool-card" role="button" tabindex="0" data-tool="11" style="min-height:110px;display:flex;flex-direction:column;gap:8px;cursor:pointer">
          <div style="display:flex;align-items:center;gap:10px">
            <span style="color:var(--green-soft);display:inline-flex">${SVG.warn(20)}</span>
            <strong style="font-size:16px;color:#fff">Problemas</strong>
          </div>
          <div style="color:var(--muted);font-size:14px;line-height:1.45">Diagnósticos del editor y del kernel</div>
        </div>
        <div class="card tool-card" role="button" tabindex="0" data-tool="asistencia" style="min-height:110px;display:flex;flex-direction:column;gap:8px;cursor:pointer">
          <div style="display:flex;align-items:center;gap:10px">
            <span style="color:var(--green-soft);display:inline-flex">${SVG.help(20)}</span>
            <strong style="font-size:16px;color:#fff">Asistencia</strong>
          </div>
          <div style="color:var(--muted);font-size:14px;line-height:1.45">Ventana de ayuda y documentación contextual</div>
        </div>
      </div>
    </main>`
  },
  "08": {
    "id": "08",
    "rail": "Herramientas",
    "label": "08 · Constructor visual",
    "html": `${SIDEBAR_HTML}
    <section class="main">
      <div style="height:48px;display:flex;align-items:center;justify-content:space-between;padding:0 14px;border-bottom:1px solid var(--border);background:var(--rail);flex-shrink:0">
        <strong style="font-size:16px">Constructor visual</strong>
        <div class="row">
          <button class="btn btn-ghost">Traducir y firmar</button>
          <button class="btn btn-ghost">Ejemplo</button>
          <button class="btn btn-ghost"><span style="width:8px;height:8px;border-radius:50%;background:var(--green-soft)"></span> Emitir .bara</button>
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
          <div style="border-top:1px solid var(--border);padding:12px 16px;background:var(--rail);flex-shrink:0">
            <div style="font-weight:600;margin-bottom:8px">Informe del kernel</div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px 12px;font-size:14px">
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
    </section>`
  },
  "09": {
    "id": "09",
    "rail": "Herramientas",
    "label": "09 · Topología",
    "html": `<main class="main" style="flex-direction:row;background:#08090a">
      <div style="width:200px;flex-shrink:0;border-right:1px solid var(--border);padding:12px;display:flex;flex-direction:column;gap:10px">
        <strong style="font-size:16px">Topología</strong>
        <div id="topology-scope-selector" style="display:flex;background:#0d1218;border:1px solid var(--border);border-radius:999px;overflow:hidden">
          <div id="topology-seg-proyecto" role="button" tabindex="0" data-scope="proyecto" style="flex:1;text-align:center;padding:7px;background:var(--green-dim);color:#fff;font-weight:600;cursor:pointer;font-size:14px">Proyecto</div>
          <div id="topology-seg-bara" role="button" tabindex="0" data-scope="bara" style="flex:1;text-align:center;padding:7px;color:var(--muted);cursor:pointer;font-size:14px">Bara</div>
        </div>
        <div id="topology-node-list" style="display:flex;flex-direction:column;gap:4px">
          ${renderTopologyNodesList('proyecto')}
        </div>
      </div>
      <div id="topology-graph-view" role="alert" aria-label="Grafo de topología" style="flex:1;min-width:0;position:relative;display:flex;align-items:center;justify-content:center;background:#070a0e;padding:12px">
        ${TOPOLOGY_SETS.proyecto.svg}
      </div>
      <div style="width:240px;flex-shrink:0;border-left:1px solid var(--border);padding:12px;display:flex;flex-direction:column;gap:10px;background:var(--rail)">
        <div>
          <strong style="font-size:16px">Propiedades</strong>
          <div style="font-size:14px;color:var(--muted);margin-top:2px">detalle del nodo (solo lectura)</div>
        </div>
        <div>
          <label class="label">ruta</label>
          <input id="topo-prop-ruta" class="field mono" readonly value="src/HELLO.bara"/>
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
        <button class="btn btn-ghost" style="justify-content:center">Abrir en el editor</button>
        <button class="btn btn-primary" style="justify-content:center">Actualizar grafo</button>
      </div>
    </main>`
  },
  "10": {
    "id": "10",
    "rail": "Herramientas",
    "label": "10 · Git",
    get html() {
      return `<main class="main" style="padding:20px 28px;background:#08090a;position:relative">
        <h1 style="margin:0 0 14px;font-size:22px;color:#fff">Git · control de versiones</h1>
        <div style="display:grid;grid-template-columns:1.1fr 0.9fr;gap:16px;max-width:980px">
          <div class="card">
            <div style="font-weight:600;margin-bottom:10px">Archivos cambiados</div>
            <div style="display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:6px;">
              <span class="mono" style="width:18px;color:#c9a227;font-weight:700">M</span>
              <span class="mono" style="flex:1">src/HELLO.bara</span>
              <span class="check on">✓</span>
            </div>
            <div style="display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:6px;">
              <span class="mono" style="width:18px;color:#6aa96f;font-weight:700">A</span>
              <span class="mono" style="flex:1">src/util.bara</span>
              <span class="check on">✓</span>
            </div>
            <div style="display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:6px;background:#2a1515">
              <span class="mono" style="width:18px;color:#c9a227;font-weight:700">M</span>
              <span class="mono" style="flex:1">.env</span>
              <span class="chip-danger chip">secreto</span>
            </div>
            <div style="margin-top:10px;font-size:14px;color:var(--muted)">Se excluyen <span class="mono">.bara-backup/</span> y <span class="mono">.bara-trash/</span></div>
          </div>
          <div style="display:flex;flex-direction:column;gap:12px">
            <div class="card">
              <label class="label">Mensaje del commit</label>
              <textarea class="field" style="height:80px;resize:none">Mejora saludo en HELLO.bara</textarea>
              <button class="btn btn-primary" style="margin-top:10px;width:100%;justify-content:center">Preparar commit…</button>
            </div>
            <div class="card">
              <label class="label" for="git-remote-url-input">URL remota (GitHub https / ssh)</label>
              <div style="display:flex;gap:8px;align-items:center">
                <input id="git-remote-url-input" class="field mono" value="${gitRemoteUrl}" aria-label="URL remota"/>
                <button type="button" id="btn-verify-remote-url" class="btn btn-ghost" style="flex-shrink:0">Verificar URL remota</button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-backdrop">
          <div class="modal">
            <h2 style="margin:0 0 8px;font-size:18px">Confirmar commit</h2>
            <p style="margin:0 0 12px;color:var(--muted);font-size:14px">Se incluirán estos archivos:</p>
            <div style="background:#0d1218;border:1px solid var(--border);border-radius:8px;padding:10px;margin-bottom:12px" class="mono">
              <div>✓ src/HELLO.bara</div>
              <div>✓ src/util.bara</div>
            </div>
            <div class="banner-warn" style="border:1px solid #6a4a20;border-radius:8px;padding:10px;margin-bottom:10px;font-size:14px;display:flex;align-items:center;gap:8px">
              ${SVG.warn(18)} <span><span class="mono">.env</span> — Parece un secreto: no se incluirá salvo que lo marques.</span>
            </div>
            <div style="font-size:14px;color:var(--muted);margin-bottom:14px">Excluidos: .bara-backup/ · .bara-trash/</div>
            <div class="row" style="justify-content:flex-end">
              <button class="btn btn-ghost" id="git-modal-cancel">Cancelar</button>
              <button class="btn btn-primary">Confirmar commit</button>
            </div>
          </div>
        </div>
      </main>`;
    }
  },
  "11": {
    "id": "11",
    "rail": "Chat",
    "label": "11 · Problemas (panel abierto)",
    get html() {
      return `${SIDEBAR_HTML}
      <section class="main" style="border-right:1px solid var(--border)">
        <div style="height:42px;display:flex;align-items:center;justify-content:space-between;padding:0 14px;border-bottom:1px solid var(--border);background:var(--rail);flex-shrink:0">
          <strong style="font-size:15px">Chat</strong>
          <button class="btn btn-ghost" style="padding:5px 10px">Ajustes</button>
        </div>
        <div style="height:28px;display:flex;align-items:center;gap:8px;padding:0 14px;border-bottom:1px solid var(--border);background:#0d1218;font-size:14px;color:var(--muted);flex-shrink:0">
          <span style="width:8px;height:8px;border-radius:50%;background:var(--green-soft)"></span>
          <span class="mono" style="color:var(--text)">HELLO.bara</span>
        </div>
        <div style="flex:1;min-height:0;overflow-y:auto;padding:10px 14px;display:flex;flex-direction:column;gap:8px">
          <div style="padding:8px 10px;background:rgba(17,24,33,.85);border:1px solid var(--border);border-radius:8px;font-size:14px;color:var(--muted)">
            <div style="color:var(--green-soft)">✓ Leí HELLO.bara</div>
            <div style="color:var(--green-soft)">✓ Sin diagnósticos nuevos</div>
            <div style="color:var(--green-soft)">✓ Confirmé firma</div>
          </div>
          <div style="align-self:flex-end;background:var(--hover);border:1px solid var(--border);padding:8px 12px;border-radius:12px;max-width:320px">¿Qué hace este código?</div>
          <div style="align-self:flex-start;background:var(--panel);border:1px solid var(--border);padding:10px 12px;border-radius:12px;max-width:440px">
            <p style="margin:0 0 6px">El archivo <span class="mono" style="color:var(--green-soft)">HELLO.bara</span> define el punto de entrada con <span class="mono">funcion main()</span>.</p>
            <div class="mono" style="background:#08090a;border:1px solid var(--border);border-radius:6px;padding:6px 8px;font-size:14px;color:var(--muted)">funcion main() {<br/>&nbsp;&nbsp;variables x = 10<br/>&nbsp;&nbsp;si x &gt; 5 { mostrar("Bara IDE") }<br/>}</div>
          </div>
          ${buildChatReviewCardHtml()}
        </div>
        ${COMPOSER_HTML}
        ${buildBottomDockHtml()}
      </section>
      <aside class="editor-pane">
        ${buildTabbar(true)}
        ${buildEditorWithDiagnosticsHtml()}
      </aside>`;
    }
  },
  "12": {
    "id": "12",
    "rail": "Registros",
    "label": "12 · Registros",
    get html() {
      return getScreen12Html();
    }
  },
  "13": {
    "id": "13",
    "rail": "Ajustes",
    "label": "13 · Ajustes",
    get html() {
      return getScreen13Html();
    }
  },
  "14": {
    "id": "14",
    "rail": "Chat",
    "label": "14 · Error sin clave",
    "html": `${SIDEBAR_HTML}
    <section class="main" style="border-right:1px solid var(--border)">
      <div class="banner banner-error" role="status" style="justify-content:space-between">
        <span>No hay clave configurada para DeepSeek. Abre Ajustes</span>
        <div class="row">
          <button class="btn btn-primary" style="padding:5px 12px">Ir a Ajustes</button>
          <button type="button" id="banner-nokey-close" class="icon-close-btn" aria-label="Cerrar aviso de clave" title="Cerrar (Esc)">${SVG.close(16)}</button>
        </div>
      </div>
      <div style="height:42px;display:flex;align-items:center;padding:0 14px;border-bottom:1px solid var(--border);background:var(--rail)"><strong>Chat</strong></div>
      <div style="flex:1;padding:16px;color:var(--muted)">Escribe un mensaje cuando la clave esté configurada.</div>
      ${COMPOSER_HTML}
    </section>
    <aside class="editor-pane">
      ${buildTabbar(false)}
      <div class="code">
        <div class="gutter"><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div></div>
        <div class="code-body"><div>funcion main() {</div><div>  variables x = 10</div><div>  si x &gt; 5 {</div><div>    <span>mostrar("Bara IDE")</span></div><div>  }</div><div>}</div></div>
      </div>
    </aside>`
  },
  "15": {
    "id": "15",
    "rail": "Archivos",
    "label": "15 · Archivos sin guardar",
    "html": `<main class="main" style="align-items:center;justify-content:center;background:#08090a;position:relative">
      <div style="opacity:.35;text-align:center;color:var(--muted)">
        <div style="font-size:18px;margin-bottom:8px">Bienvenida · Archivos</div>
        <div>Cambiar de carpeta…</div>
      </div>
      <div class="modal-backdrop">
        <div class="modal">
          <h2 style="margin:0 0 8px;font-size:18px">Tienes 2 archivos sin guardar</h2>
          <p style="margin:0 0 12px;color:var(--muted)">Guarda o descarta los cambios antes de cambiar de carpeta.</p>
          <div style="background:#0d1218;border:1px solid var(--border);border-radius:8px;padding:10px;margin-bottom:16px" class="mono">
            <div style="display:flex;align-items:center;gap:8px;padding:4px 0"><span class="dot" style="display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--green-soft)"></span>HELLO.bara</div>
            <div style="display:flex;align-items:center;gap:8px;padding:4px 0"><span class="dot" style="display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--green-soft)"></span>genesis.bara</div>
          </div>
          <div class="row" style="justify-content:flex-end">
            <button class="btn btn-ghost" data-modal15="cancelar">Cancelar</button>
            <button class="btn btn-danger" data-modal15="descartar">Descartar</button>
            <button class="btn btn-primary" data-modal15="guardar">Guardar</button>
          </div>
        </div>
      </div>
    </main>`
  }
};

let currentScreenId = '01';
let previousScreenId = '01';
let bottomPanelOpen = false;
let ephemeralToastTimer = null;

function showEphemeralToast(message) {
  const viewport = document.getElementById('screen-viewport');
  if (!viewport) return;
  const existing = document.getElementById('bara-ephemeral-toast');
  if (existing) existing.remove();
  if (ephemeralToastTimer) clearTimeout(ephemeralToastTimer);

  const toast = document.createElement('div');
  toast.id = 'bara-ephemeral-toast';
  toast.className = 'toast';
  toast.style.bottom = '24px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.innerHTML = `
    <span>${message}</span>
    <button type="button" class="icon-close-btn" aria-label="Cerrar notificación">${SVG.close(16)}</button>
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

// Portal Menu para » («Más pestañas») en document.body, posición fija abriendo hacia arriba
function closeMoreTabsPortal(restoreFocus = false) {
  moreTabsOpen = false;
  const existing = document.getElementById('more-tabs-portal');
  if (existing) existing.remove();
  const btn = document.getElementById('bp-more-tabs-btn');
  if (btn) {
    btn.setAttribute('aria-expanded', 'false');
    if (restoreFocus) btn.focus();
  }
}

function openMoreTabsPortal() {
  if (!bottomPanelOpen && currentScreenId !== '11') {
    bottomPanelOpen = true;
    renderScreen('11');
  }
  const btn = document.getElementById('bp-more-tabs-btn');
  if (!btn) return;

  closeMoreTabsPortal(false);
  moreTabsOpen = true;
  btn.setAttribute('aria-expanded', 'true');

  const rect = btn.getBoundingClientRect();
  const portal = document.createElement('div');
  portal.id = 'more-tabs-portal';
  portal.className = 'more-tabs-portal';
  portal.setAttribute('role', 'menu');
  portal.setAttribute('aria-label', 'Más pestañas');

  const leftPos = Math.max(12, Math.min(rect.left, window.innerWidth - 222));
  const bottomPos = Math.max(36, window.innerHeight - rect.top + 6);
  portal.style.left = `${leftPos}px`;
  portal.style.bottom = `${bottomPos}px`;

  const allMenuTabs = [
    { id: 'problemas', label: 'Problemas' },
    { id: 'registros', label: 'Registros' },
    { id: 'terminal', label: 'Terminal kernel' },
    ...MORE_TABS_ITEMS
  ];

  portal.innerHTML = allMenuTabs.map(item => `
    <button type="button" class="more-tabs-item" role="menuitem" data-more-tab="${item.id}">
      <span>${item.label}</span>
    </button>
  `).join('');

  document.body.appendChild(portal);

  portal.querySelectorAll('.more-tabs-item').forEach(menuBtn => {
    menuBtn.onclick = (e) => {
      e.stopPropagation();
      const tabId = menuBtn.getAttribute('data-more-tab');
      closeMoreTabsPortal(true);
      const content = document.getElementById('bp-content');
      if (!content) return;
      if (tabId === 'problemas') {
        content.innerHTML = buildProblemsTableHtml();
        bindProblemRowEvents();
      } else if (tabId === 'registros') {
        document.getElementById('bp-tab-registros')?.click();
      } else if (tabId === 'terminal') {
        document.getElementById('bp-tab-terminal')?.click();
      } else {
        const found = MORE_TABS_ITEMS.find(i => i.id === tabId);
        if (found) {
          content.innerHTML = `<div style="padding:10px 14px;font-size:14px;color:var(--text)"><strong style="color:var(--green-soft)">${found.label}</strong> — ${found.description}</div>`;
        }
      }
    };
  });

  const first = portal.querySelector('.more-tabs-item');
  if (first) first.focus();
}

function toggleEditorFirstLayout() {
  editorFirst = !editorFirst;
  try {
    localStorage.setItem('editorFirst', String(editorFirst));
  } catch (_) {}
  syncShellAdditions();
}

function setErrorBannerVisible(visible) {
  errorBannerVisible = Boolean(visible);
  syncShellAdditions();
}

function dismissProblemById(probId) {
  activeProblems = activeProblems.filter(p => p.id !== probId);
  syncShellAdditions();
  renderScreen(currentScreenId);
}

function resetProblems() {
  activeProblems = INITIAL_PROBLEMS.map(p => ({ ...p }));
  syncShellAdditions();
  renderScreen(currentScreenId);
}

function syncShellAdditions() {
  const shell = document.getElementById('app-shell');
  if (shell) {
    shell.classList.toggle('editor-first', editorFirst);
  }
  const swapBtn = document.getElementById('btn-swap-layout');
  if (swapBtn) {
    swapBtn.classList.toggle('active', editorFirst);
  }
  const banner = document.getElementById('github-url-error-banner');
  if (banner) {
    banner.hidden = !errorBannerVisible;
    const span = banner.querySelector('span');
    if (span) span.textContent = ERROR_BANNER_TEXT;
  }
  const verEl = document.getElementById('status-version-tag');
  if (verEl) verEl.textContent = APP_VERSION;

  // 2. CONTADORES COHERENTES: barra de estado, ⚠ N y pestaña Problemas usan el mismo origen de datos
  const summary = computeProblemsSummary(activeProblems);
  const probStatusEl = document.getElementById('status-problemas-trigger');
  if (probStatusEl) {
    probStatusEl.textContent = summary.statusText;
  }
  const diagCounterEl = document.getElementById('status-diag-counter');
  if (diagCounterEl) {
    diagCounterEl.textContent = summary.badgeText;
  }
  const bpTabProbEl = document.getElementById('bp-tab-problemas');
  if (bpTabProbEl) {
    bpTabProbEl.textContent = `Problemas (${summary.total})`;
  }

  // Componentes ocultos de VISUAL-4 (Belnap/Bilattice, AETHER, internos del kernel) presentes en el DOM con showAdvanced = false
  const advContainer = document.getElementById('hidden-advanced-modules');
  if (advContainer) {
    advContainer.hidden = !showAdvanced;
    if (!advContainer.innerHTML) {
      advContainer.innerHTML = Object.values(HIDDEN_ADVANCED_COMPONENTS).map(c =>
        `<section id="${c.id}" data-hidden-by-default="${c.hiddenByDefault}">${c.title || c.label}</section>`
      ).join('');
    }
  }
}

window.BaraIDE = {
  version: APP_VERSION,
  topologyScope: 'proyecto',
  constructorMode: 'blueprint',
  jumpToLine(file, line) {
    activeDiagLine = line;
    renderScreen(bottomPanelOpen ? '11' : '03');
  },
  showToast: showEphemeralToast,
  toggleEditorFirstLayout,
  openMoreTabsPortal,
  closeMoreTabsPortal,
  setErrorBannerVisible,
  dismissProblemById,
  resetProblems
};

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
  const first = data.nodes[0];
  if (first) {
    const r = document.getElementById('topo-prop-ruta');
    const l = document.getElementById('topo-prop-linea');
    const t = document.getElementById('topo-prop-tipo');
    const g = document.getElementById('topo-prop-lenguaje');
    if (r) r.value = first.path;
    if (l) l.value = first.line;
    if (t) t.value = first.kind;
    if (g) g.value = first.lang;
  }
}

function bindTopologyNodeClicks(scope) {
  const data = TOPOLOGY_SETS[scope] || TOPOLOGY_SETS.proyecto;
  document.querySelectorAll('.topology-node-item').forEach(item => {
    item.onclick = () => {
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
    };
  });
}

function renderScreen(screenId) {
  closeMoreTabsPortal(false);
  if (screenId !== currentScreenId) {
    previousScreenId = currentScreenId;
  }
  currentScreenId = screenId;
  const screen = SCREENS[screenId] || SCREENS['01'];

  document.querySelectorAll('.rail a').forEach(a => {
    if (a.getAttribute('data-rail') === screen.rail) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });

  const labelEl = document.getElementById('demo-active-label');
  if (labelEl) labelEl.textContent = screen.label;

  document.querySelectorAll('.demo-option').forEach(opt => {
    if (opt.getAttribute('data-id') === screenId) {
      opt.classList.add('selected');
    } else {
      opt.classList.remove('selected');
    }
  });

  const viewport = document.getElementById('screen-viewport');
  if (viewport) {
    bottomPanelOpen = (screenId === '11');
    const html = screen.html;
    viewport.innerHTML = html;
    syncShellAdditions();
    bindScreenInteractions();
  }
}

function toggleBottomPanel() {
  closeMoreTabsPortal(false);
  bottomPanelOpen = !bottomPanelOpen;
  if (bottomPanelOpen) {
    renderScreen('11');
  } else {
    if (currentScreenId === '11') {
      renderScreen('03');
    } else {
      renderScreen(currentScreenId);
    }
  }
}

function bindProblemRowEvents() {
  document.querySelectorAll('.btn-dismiss-problem').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const probId = btn.getAttribute('data-dismiss-problem');
      if (probId) dismissProblemById(probId);
    };
  });
  document.querySelectorAll('.problem-row').forEach(row => {
    const file = row.getAttribute('data-file') || 'HELLO.bara';
    const line = parseInt(row.getAttribute('data-line') || '1', 10);
    bindKeyboardRoleButton(row, (e) => {
      if (e.target && e.target.closest('.btn-dismiss-problem')) return;
      window.BaraIDE.jumpToLine(file, line);
    });
  });
  document.querySelectorAll('.diag-token').forEach(tok => {
    const line = parseInt(tok.getAttribute('data-diag-line') || '4', 10);
    bindKeyboardRoleButton(tok, () => {
      activeDiagLine = line;
      renderScreen(currentScreenId);
    });
  });
}

function bindScreenInteractions() {
  // Auto-Apply checkbox (desmarcado por defecto, clicable)
  const autoApplyCheck = document.getElementById('auto-apply-checkbox');
  if (autoApplyCheck) {
    autoApplyCheck.parentElement.onclick = (e) => {
      e.preventDefault();
      const isOn = autoApplyCheck.classList.toggle('on');
      autoApplyCheck.textContent = isOn ? '✓' : '';
    };
  }

  // 1. Tarjeta de revisión en el Chat: alternar Verificado / No verificado, Aceptar, Rechazar, Deshacer
  const reviewPill = document.getElementById('review-card-status-pill');
  if (reviewPill) {
    bindKeyboardRoleButton(reviewPill, () => {
      reviewCardVerified = !reviewCardVerified;
      renderScreen(currentScreenId);
    });
  }
  const unvAccept = document.getElementById('btn-unverified-accept');
  if (unvAccept) {
    unvAccept.onclick = () => {
      if (!reviewCardVerified && strictMode) return;
      unverifiedAccepted = true;
      renderScreen(currentScreenId);
    };
  }
  const unvReject = document.getElementById('btn-unverified-reject');
  if (unvReject) {
    unvReject.onclick = () => {
      unverifiedAccepted = false;
      showEphemeralToast('Cambio rechazado');
      renderScreen(currentScreenId);
    };
  }
  const unvUndo = document.getElementById('btn-unverified-undo');
  if (unvUndo) {
    unvUndo.onclick = () => {
      unverifiedAccepted = false;
      renderScreen(currentScreenId);
    };
  }

  // 7. Botón » («Más pestañas») en el panel inferior
  const moreTabsBtn = document.getElementById('bp-more-tabs-btn');
  if (moreTabsBtn) {
    moreTabsBtn.onclick = (e) => {
      e.stopPropagation();
      if (moreTabsOpen) closeMoreTabsPortal(true);
      else openMoreTabsPortal();
    };
  }

  // 3. Ajustes (13): Modo estricto, Autoguardado, Recordar clave, Carpeta de confianza, Proveedor
  const strictBtn = document.getElementById('toggle-strict-mode');
  if (strictBtn) {
    strictBtn.onclick = () => {
      strictMode = !strictMode;
      try { localStorage.setItem('strictMode', String(strictMode)); } catch (_) {}
      renderScreen('13');
    };
  }
  const autosaveBtn = document.getElementById('toggle-autosave');
  if (autosaveBtn) {
    autosaveBtn.onclick = () => {
      autosave = !autosave;
      try { localStorage.setItem('autosave', String(autosave)); } catch (_) {}
      renderScreen('13');
    };
  }
  const rememberLabel = document.getElementById('label-remember-key');
  if (rememberLabel) {
    rememberLabel.onclick = (e) => {
      e.preventDefault();
      rememberKey = !rememberKey;
      renderScreen('13');
    };
  }
  const changeFolderBtn = document.getElementById('btn-change-trusted-folder');
  if (changeFolderBtn) {
    changeFolderBtn.onclick = () => {
      trustedFolder = trustedFolder === DEFAULT_TRUSTED_FOLDER
        ? 'C:/Users/Vexor/proyectos/genesis_engine'
        : DEFAULT_TRUSTED_FOLDER;
      renderScreen('13');
      showEphemeralToast(`Carpeta de confianza: ${trustedFolder}`);
    };
  }
  const provSelect = document.getElementById('settings-provider-select');
  if (provSelect) {
    provSelect.onchange = (e) => {
      aiProvider = e.target.value;
      renderScreen('13');
    };
  }

  // 4. Git (10): Verificar URL remota dispara el banner si no es de GitHub
  const verifyRemoteBtn = document.getElementById('btn-verify-remote-url');
  const remoteInput = document.getElementById('git-remote-url-input');
  if (verifyRemoteBtn && remoteInput) {
    verifyRemoteBtn.onclick = () => {
      gitRemoteUrl = remoteInput.value;
      const check = validateGithubUrl(gitRemoteUrl);
      if (!check.valid) {
        setErrorBannerVisible(true);
      } else {
        setErrorBannerVisible(false);
        showEphemeralToast('URL remota de GitHub verificada ✓');
      }
    };
  }

  // Toast 05: Deshacer and Close (×)
  const deshacerBtn = document.getElementById('toast-deshacer-btn');
  if (deshacerBtn) {
    deshacerBtn.onclick = () => {
      unverifiedAccepted = false;
      renderScreen('03');
    };
  }
  const toastClose = document.getElementById('toast-close-btn');
  if (toastClose) {
    toastClose.onclick = () => {
      const t = document.getElementById('toast-05');
      if (t) t.style.display = 'none';
    };
  }

  // Banner 14: Close (×) returns to 03
  const bannerClose = document.getElementById('banner-nokey-close');
  if (bannerClose) {
    bannerClose.onclick = () => renderScreen('03');
  }

  // Bottom dock controls
  const bpMin = document.getElementById('bp-btn-minimize');
  if (bpMin) {
    bpMin.onclick = () => toggleBottomPanel();
  }
  const bpClose = document.getElementById('bp-btn-close');
  if (bpClose) {
    bpClose.onclick = () => toggleBottomPanel();
  }
  const bpMax = document.getElementById('bp-btn-maximize');
  if (bpMax) {
    bpMax.onclick = () => {
      const dock = document.getElementById('bottom-dock');
      if (dock) {
        dock.style.height = dock.style.height === '340px' ? '210px' : '340px';
      }
    };
  }

  // Bottom dock tabs & Problem rows
  bindProblemRowEvents();

  ['problemas', 'registros', 'terminal'].forEach(tabName => {
    const tabEl = document.getElementById(`bp-tab-${tabName}`);
    if (tabEl) {
      bindKeyboardRoleButton(tabEl, () => {
        document.querySelectorAll('.bp-tab').forEach(t => {
          t.style.background = 'transparent';
          t.style.color = 'var(--muted)';
          t.style.fontWeight = 'normal';
        });
        tabEl.style.background = 'var(--hover)';
        tabEl.style.color = '#fff';
        tabEl.style.fontWeight = '600';

        const content = document.getElementById('bp-content');
        if (content) {
          if (tabName === 'problemas') {
            content.innerHTML = buildProblemsTableHtml();
            bindProblemRowEvents();
          } else if (tabName === 'registros') {
            const logRows = getActiveRegistros().map(r =>
              `<div><span style="color:var(--muted)">${r.time}</span> <span style="color:${r.color};font-weight:600">[${r.level}]</span> ${r.text}</div>`
            ).join('');
            content.innerHTML = `<div style="padding:10px 14px;font-family:var(--mono);font-size:14px;line-height:1.6;color:var(--text);">${logRows}</div>`;
          } else if (tabName === 'terminal') {
            content.innerHTML = `
              <div style="padding:10px 14px;font-family:var(--mono);font-size:14px;line-height:1.6;color:var(--text);">
                <span style="color:var(--green-soft)">bara-kernel$</span> ./bara --version<br/>
                Bara IDE<br/>
                <span style="color:var(--green-soft)">bara-kernel$</span> _
              </div>
            `;
          }
        }
      });
    }
  });

  // Screen 01 cards & recent projects
  document.querySelectorAll('.card[role="button"], .recent-project-item').forEach(el => {
    if (!el.classList.contains('tool-card')) {
      bindKeyboardRoleButton(el, () => renderScreen('03'));
    }
  });

  // Herramientas 07 cards
  document.querySelectorAll('.tool-card').forEach(card => {
    const toolTarget = card.getAttribute('data-tool');
    bindKeyboardRoleButton(card, () => {
      if (toolTarget === 'asistencia') {
        showEphemeralToast('Se abre en ventana aparte');
      } else if (toolTarget) {
        renderScreen(toolTarget);
      }
    });
  });

  // Generic Buttons
  document.querySelectorAll('button').forEach(btn => {
    if (btn.hasAttribute('data-modal15')) {
      btn.onclick = () => renderScreen('01');
      return;
    }
    if (
      btn.id === 'btn-unverified-accept' ||
      btn.id === 'btn-unverified-reject' ||
      btn.id === 'btn-unverified-undo' ||
      btn.id === 'btn-verify-remote-url' ||
      btn.id === 'btn-change-trusted-folder' ||
      btn.classList.contains('btn-dismiss-problem')
    ) {
      return;
    }
    const t = (btn.textContent || '').trim();
    if (t === 'Nuevo chat') btn.onclick = () => renderScreen('03');
    if (t === 'Aceptar' || t === 'Aceptar cambio' || t === 'Aceptar de todos modos') {
      btn.onclick = () => {
        if (currentScreenId === '06' && strictMode) return;
        unverifiedAccepted = true;
        renderScreen('05');
      };
    }
    if (t === 'Rechazar') btn.onclick = () => renderScreen('03');
    if (t === 'Deshacer') btn.onclick = () => renderScreen('03');
    if (t === 'Ir a Ajustes' || (t === 'Ajustes' && currentScreenId !== '13')) {
      btn.onclick = () => renderScreen('13');
    }
    if (t === 'Abrir en el editor') btn.onclick = () => renderScreen('03');
    if (t === 'Cancelar') {
      btn.onclick = () => {
        document.querySelectorAll('.modal-backdrop').forEach(m => m.style.display = 'none');
      };
    }
    if (t === 'Confirmar commit') {
      btn.onclick = () => {
        document.querySelectorAll('.modal-backdrop').forEach(m => m.style.display = 'none');
        showEphemeralToast('Commit confirmado');
      };
    }
    if (t === 'Preparar commit…') {
      btn.onclick = () => {
        document.querySelectorAll('.modal-backdrop').forEach(m => m.style.display = 'flex');
      };
    }

    // Constructor 08 buttons
    if (t === 'Ejemplo') {
      btn.onclick = () => {
        const asideTitle = document.querySelector('#constructor-blueprint-aside > div');
        if (asideTitle) asideTitle.textContent = 'Blueprint JSON';
        const g = document.getElementById('constructor-blueprint-gutter');
        const b = document.getElementById('constructor-blueprint-code');
        if (g && b) {
          g.innerHTML = DEFAULT_BP.gutterHtml;
          b.innerHTML = DEFAULT_BP.codeHtml;
        }
      };
    }
    if (t === 'Traducir y firmar') {
      btn.onclick = () => {
        document.querySelectorAll('label.row .check').forEach(c => {
          c.classList.add('on');
          c.textContent = '✓';
        });
      };
    }
    if (t.includes('Emitir .bara')) {
      btn.onclick = () => {
        const asideTitle = document.querySelector('#constructor-blueprint-aside > div');
        if (asideTitle) asideTitle.textContent = 'Código HELLO.bara';
        const g = document.getElementById('constructor-blueprint-gutter');
        const b = document.getElementById('constructor-blueprint-code');
        const baraLines = [
          '<span style="color:#8fb89a">funcion</span> main() {',
          '  variables x = 10',
          '  <span style="color:#8fb89a">si</span> x &gt; 5 {',
          '    mostrar("Bara IDE")',
          '    registrar("ok")',
          '  }',
          '}'
        ];
        if (g && b) {
          const rendered = renderBlueprintLines(baraLines);
          g.innerHTML = rendered.gutterHtml;
          b.innerHTML = rendered.codeHtml;
        }
      };
    }
  });

  // Topología scope selector (Proyecto | Bara)
  const segProy = document.getElementById('topology-seg-proyecto');
  const segBara = document.getElementById('topology-seg-bara');
  if (segProy && segBara) {
    bindKeyboardRoleButton(segProy, () => updateTopologyScope('proyecto'));
    bindKeyboardRoleButton(segBara, () => updateTopologyScope('bara'));
    bindTopologyNodeClicks(window.BaraIDE.topologyScope || 'proyecto');
  }

  // Command rows in Buscar (Screen 02)
  document.querySelectorAll('.search-row').forEach(row => {
    const target = row.getAttribute('data-target');
    if (target) {
      bindKeyboardRoleButton(row, () => renderScreen(target));
    }
  });

  // Close tab button in editor
  document.querySelectorAll('.tab .x').forEach(x => {
    x.onclick = (e) => {
      e.stopPropagation();
      renderScreen('15');
    };
  });
}

window.renderScreen = renderScreen;
window.updateTopologyScope = updateTopologyScope;
window.setErrorBannerVisible = setErrorBannerVisible;
window.toggleEditorFirstLayout = toggleEditorFirstLayout;
window.openMoreTabsPortal = openMoreTabsPortal;
window.closeMoreTabsPortal = closeMoreTabsPortal;
window.setStrictMode = (val) => {
  strictMode = Boolean(val);
  try { localStorage.setItem('strictMode', String(strictMode)); } catch (_) {}
  renderScreen(currentScreenId);
};
window.setActiveDiagLine = (line) => {
  activeDiagLine = line;
  renderScreen(currentScreenId);
};
window.dismissProblemById = dismissProblemById;
window.resetProblems = resetProblems;

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('demo') === '1' || window.location.pathname.includes('demo')) {
    document.getElementById('demo-switcher')?.classList.add('visible');
  }

  // Botón ⇄ en barra de título
  const swapBtn = document.getElementById('btn-swap-layout');
  if (swapBtn) {
    swapBtn.onclick = () => toggleEditorFirstLayout();
  }

  // Controles de ventana ▬ □ ×
  ['win-btn-min', 'win-btn-max', 'win-btn-close'].forEach(id => {
    const b = document.getElementById(id);
    if (b) {
      b.onclick = () => showEphemeralToast('Control de ventana');
    }
  });

  // Cerrar banner de error con ×
  const errClose = document.getElementById('btn-close-error-banner');
  if (errClose) {
    errClose.onclick = () => setErrorBannerVisible(false);
  }

  document.querySelectorAll('.rail a').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const targetScreen = a.getAttribute('data-screen');
      if (targetScreen) renderScreen(targetScreen);
    });
  });

  const probTrigger = document.getElementById('status-problemas-trigger');
  if (probTrigger) {
    bindKeyboardRoleButton(probTrigger, toggleBottomPanel);
  }
  const diagTrigger = document.getElementById('status-diag-counter');
  if (diagTrigger) {
    bindKeyboardRoleButton(diagTrigger, () => {
      activeDiagLine = 4;
      bottomPanelOpen = true;
      renderScreen('11');
    });
  }

  const demoMenu = document.getElementById('demo-menu');
  const demoBtn = document.getElementById('demo-switcher-btn');
  if (demoMenu && demoBtn) {
    demoMenu.innerHTML = Object.values(SCREENS).map(s => `
      <div class="demo-option ${s.id === currentScreenId ? 'selected' : ''}" data-id="${s.id}" onclick="renderScreen('${s.id}'); document.getElementById('demo-menu').classList.remove('open');">
        <span>${s.label}</span>
        <span class="mono" style="font-size:11px;color:var(--muted);">${s.id}</span>
      </div>
    `).join('');

    demoBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      demoMenu.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      demoMenu.classList.remove('open');
      if (moreTabsOpen) {
        const portal = document.getElementById('more-tabs-portal');
        const mBtn = document.getElementById('bp-more-tabs-btn');
        if (portal && !portal.contains(e.target) && (!mBtn || !mBtn.contains(e.target))) {
          closeMoreTabsPortal(true);
        }
      }
    });
  }

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
      if (moreTabsOpen) {
        e.preventDefault();
        closeMoreTabsPortal(true);
        return;
      }
      if (errorBannerVisible) {
        e.preventDefault();
        setErrorBannerVisible(false);
        return;
      }
      const ephToast = document.getElementById('bara-ephemeral-toast');
      if (ephToast) {
        ephToast.remove();
      }
      const toast05 = document.getElementById('toast-05');
      if (toast05 && toast05.style.display !== 'none') {
        toast05.style.display = 'none';
        return;
      }
      if (currentScreenId === '02' || currentScreenId === '13') {
        renderScreen(previousScreenId || '01');
        return;
      }
      if (currentScreenId === '14') {
        renderScreen('03');
        return;
      }
      document.querySelectorAll('.modal-backdrop').forEach(m => m.style.display = 'none');
      document.getElementById('demo-menu')?.classList.remove('open');
    }
  });

  const path = window.location.pathname;
  if (path.includes('buscar')) renderScreen('02');
  else if (path.includes('chat') || path.includes('asistente') || path.includes('editor')) renderScreen('03');
  else if (path.includes('constructor')) renderScreen('08');
  else if (path.includes('topologia')) renderScreen('09');
  else if (path.includes('git')) renderScreen('10');
  else if (path.includes('registros') || path.includes('logs')) renderScreen('12');
  else if (path.includes('ajustes')) renderScreen('13');
  else if (path.includes('herramientas')) renderScreen('07');
  else if (path.includes('problemas')) renderScreen('11');
  else renderScreen('01');
});
