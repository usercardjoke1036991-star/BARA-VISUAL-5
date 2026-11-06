/**
 * Bara IDE
 * Self-contained desktop-class IDE mock for screens 01 to 15.
 */

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

const COMPOSER_HTML = `<div style="padding:10px 12px;border-top:1px solid var(--border);background:var(--rail);flex-shrink:0">
  <div style="background:var(--panel);border:1px solid var(--border);border-radius:10px;padding:10px">
    <div style="color:var(--muted);margin-bottom:8px">Escribe...</div>
    <div style="display:flex;align-items:center;justify-content:space-between">
      <div class="row">
        ${SVG.clip(16)}
        <label class="row" style="color:var(--muted);font-size:14px">
          <span class="check on">✓</span> Auto-Apply
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

const PROBLEMS_TABLE_HTML = `
  <div style="display:grid;grid-template-columns:minmax(120px,auto) 1fr auto;gap:10px;padding:6px 12px;color:var(--muted);font-size:14px;border-bottom:1px solid var(--border2)">
    <span>archivo:línea</span><span>mensaje</span><span>nivel</span>
  </div>
  <div class="problem-row" role="button" tabindex="0" data-file="HELLO.bara" data-line="4" style="display:grid;grid-template-columns:minmax(120px,auto) 1fr auto;gap:10px;padding:8px 12px;border-bottom:1px solid var(--border2);font-size:14px;cursor:pointer;">
    <span class="mono" style="color:var(--green-soft)">HELLO.bara:4</span>
    <span style="min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">Identificador 'mostrar' — aviso de firma</span>
    <span style="color:#c9a227">aviso</span>
  </div>
  <div class="problem-row" role="button" tabindex="0" data-file="genesis.bara" data-line="12" style="display:grid;grid-template-columns:minmax(120px,auto) 1fr auto;gap:10px;padding:8px 12px;border-bottom:1px solid var(--border2);font-size:14px;cursor:pointer;">
    <span class="mono" style="color:var(--green-soft)">genesis.bara:12</span>
    <span style="min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">ContratoA no resuelto en alcance</span>
    <span style="color:#c45c5c">error</span>
  </div>
  <div class="problem-row" role="button" tabindex="0" data-file="HELLO.bara" data-line="2" style="display:grid;grid-template-columns:minmax(120px,auto) 1fr auto;gap:10px;padding:8px 12px;border-bottom:1px solid var(--border2);font-size:14px;cursor:pointer;">
    <span class="mono" style="color:var(--green-soft)">HELLO.bara:2</span>
    <span style="min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">Variable x sin anotación de tipo</span>
    <span style="color:var(--muted)">info</span>
  </div>
`;

const BOTTOM_DOCK_HTML = `<div id="bottom-dock" style="height:240px;border-top:1px solid var(--border);background:#0a0c0d;display:flex;flex-direction:column;flex-shrink:0">
  <div style="height:36px;display:flex;align-items:center;padding:0 6px;border-bottom:1px solid var(--border);gap:2px;min-width:0">
    <div id="bp-tab-problemas" class="bp-tab" role="button" tabindex="0" style="padding:4px 6px;background:var(--hover);border-radius:4px;color:#fff;font-weight:600;cursor:pointer;font-size:14px;white-space:nowrap;flex-shrink:0">Problemas</div>
    <div id="bp-tab-registros" class="bp-tab" role="button" tabindex="0" style="padding:4px 6px;color:var(--muted);cursor:pointer;font-size:14px;white-space:nowrap;flex-shrink:0">Registros</div>
    <div id="bp-tab-terminal" class="bp-tab" role="button" tabindex="0" style="padding:4px 6px;color:var(--muted);cursor:pointer;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0;flex:0 1 auto">Terminal kernel</div>
    <div style="margin-left:auto;display:flex;gap:2px;align-items:center;flex-shrink:0">
      <button type="button" id="bp-btn-minimize" class="dock-ctrl-btn" aria-label="Minimizar panel" title="Minimizar panel (Ctrl+J)">${SVG.minimize(16)}</button>
      <button type="button" id="bp-btn-maximize" class="dock-ctrl-btn" aria-label="Maximizar panel" title="Maximizar panel">${SVG.maximize(16)}</button>
      <button type="button" id="bp-btn-close" class="dock-ctrl-btn" aria-label="Cerrar panel" title="Cerrar panel (Ctrl+J)">${SVG.close(16)}</button>
    </div>
  </div>
  <div id="bp-content" style="flex:1;overflow:auto">
    ${PROBLEMS_TABLE_HTML}
  </div>
</div>`;

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
    "html": `${SIDEBAR_HTML}
    <section class="main" style="border-right:1px solid var(--border)">
      <div style="height:42px;display:flex;align-items:center;justify-content:space-between;padding:0 14px;border-bottom:1px solid var(--border);background:var(--rail);flex-shrink:0">
        <strong style="font-size:15px">Chat</strong>
        <button class="btn btn-ghost" style="padding:5px 10px">Ajustes</button>
      </div>
      <div style="height:30px;display:flex;align-items:center;gap:8px;padding:0 14px;border-bottom:1px solid var(--border);background:#0d1218;font-size:14px;color:var(--muted);flex-shrink:0">
        <span style="width:8px;height:8px;border-radius:50%;background:var(--green-soft)"></span>
        <span class="mono" style="color:var(--text)">HELLO.bara</span>
      </div>
      <div style="flex:1;overflow:hidden;padding:14px;display:flex;flex-direction:column;gap:12px">
        <div style="padding:10px 12px;background:rgba(17,24,33,.85);border:1px solid var(--border);border-radius:8px;font-size:14px;color:var(--muted)">
          <div style="color:var(--green-soft)">✓ Leí HELLO.bara</div>
          <div style="color:var(--green-soft)">✓ Sin diagnósticos nuevos</div>
          <div style="color:var(--green-soft)">✓ Confirmé firma</div>
        </div>
        <div style="align-self:flex-end;background:var(--hover);border:1px solid var(--border);padding:10px 14px;border-radius:12px;max-width:320px">¿Qué hace este código?</div>
        <div style="align-self:flex-start;background:var(--panel);border:1px solid var(--border);padding:12px 14px;border-radius:12px;max-width:420px">
          <p style="margin:0 0 8px">El archivo <span class="mono" style="color:var(--green-soft)">HELLO.bara</span> define el punto de entrada con <span class="mono">funcion main()</span>.</p>
          <div class="mono" style="background:#08090a;border:1px solid var(--border);border-radius:6px;padding:8px;font-size:14px;color:var(--muted)">funcion main() {<br/>&nbsp;&nbsp;variables x = 10<br/>&nbsp;&nbsp;si x &gt; 5 { mostrar("Bara IDE") }<br/>}</div>
        </div>
      </div>
      ${COMPOSER_HTML}
    </section>
    <aside class="editor-pane">
      ${buildTabbar(true)}
      <div class="code">
        <div class="gutter"><div>1</div><div>2</div><div>3</div><div class="gutter-err">●</div><div>5</div><div>6</div></div>
        <div class="code-body"><div>funcion main() {</div><div>  variables x = 10</div><div>  si x &gt; 5 {</div><div>    <span class="err-line">mostrar("Bara IDE")</span></div><div>  }</div><div>}</div></div>
      </div>
    </aside>`
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
    "html": `${SIDEBAR_HTML}
    <section class="main" style="border-right:1px solid var(--border)">
      <div style="height:42px;display:flex;align-items:center;justify-content:space-between;padding:0 14px;border-bottom:1px solid var(--border);background:var(--rail)">
        <strong>Chat</strong>
        <button class="btn btn-ghost" style="padding:5px 10px">Ajustes</button>
      </div>
      <div style="flex:1;overflow:hidden;padding:14px;display:flex;flex-direction:column;gap:12px">
        <div style="align-self:flex-end;background:var(--hover);border:1px solid var(--border);padding:10px 14px;border-radius:12px">Añade mostrar_todo()</div>
        <div style="align-self:flex-start;background:var(--panel);border:1px solid var(--border);padding:12px 14px;border-radius:12px;max-width:440px">
          <div style="margin-bottom:8px">Parche propuesto (sin verificación del kernel).</div>
          <span class="chip-danger chip" style="display:inline-flex">Código inventado: la función mostrar_todo() no existe</span>
        </div>
      </div>
      ${COMPOSER_HTML}
    </section>
    <aside class="editor-pane">
      <div class="banner banner-warn" style="justify-content:space-between">
        <span style="display:inline-flex;align-items:center;gap:8px">${SVG.warn(18)} <span>Este cambio <strong>NO</strong> está verificado por el kernel</span></span>
        <div class="row">
          <button class="btn btn-primary">Rechazar</button>
          <button class="btn btn-danger">Aceptar de todos modos</button>
        </div>
      </div>
      ${buildTabbar(true)}
      <div class="code">
        <div class="gutter"><div>1</div><div>2</div><div>3</div><div>4</div><div>4</div><div>5</div><div>6</div><div>6</div><div>7</div></div>
        <div class="code-body"><div>funcion main() {</div><div>  variables x = 10</div><div>  si x &gt; 5 {</div><div class="diff-del">-   mostrar("hola")</div><div class="diff-add">+   mostrar("Bara IDE")</div><div class="diff-add">+   mostrar_todo()</div><div class="diff-add">+   registrar("ok")</div><div>  }</div><div>}</div></div>
      </div>
    </aside>`
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
    "html": `<main class="main" style="padding:20px 28px;background:#08090a;position:relative">
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
        <div class="card">
          <label class="label">Mensaje del commit</label>
          <textarea class="field" style="height:100px;resize:none">Mejora saludo en HELLO.bara</textarea>
          <button class="btn btn-primary" style="margin-top:12px;width:100%;justify-content:center">Preparar commit…</button>
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
            <button class="btn btn-ghost">Cancelar</button>
            <button class="btn btn-primary">Confirmar commit</button>
          </div>
        </div>
      </div>
    </main>`
  },
  "11": {
    "id": "11",
    "rail": "Chat",
    "label": "11 · Problemas (panel abierto)",
    "html": `${SIDEBAR_HTML}
    <section class="main" style="border-right:1px solid var(--border)">
      <div style="height:42px;display:flex;align-items:center;justify-content:space-between;padding:0 14px;border-bottom:1px solid var(--border);background:var(--rail);flex-shrink:0">
        <strong style="font-size:15px">Chat</strong>
        <button class="btn btn-ghost" style="padding:5px 10px">Ajustes</button>
      </div>
      <div style="height:30px;display:flex;align-items:center;gap:8px;padding:0 14px;border-bottom:1px solid var(--border);background:#0d1218;font-size:14px;color:var(--muted);flex-shrink:0">
        <span style="width:8px;height:8px;border-radius:50%;background:var(--green-soft)"></span>
        <span class="mono" style="color:var(--text)">HELLO.bara</span>
      </div>
      <div style="flex:1;overflow:hidden;padding:14px;display:flex;flex-direction:column;gap:12px">
        <div style="padding:10px 12px;background:rgba(17,24,33,.85);border:1px solid var(--border);border-radius:8px;font-size:14px;color:var(--muted)">
          <div style="color:var(--green-soft)">✓ Leí HELLO.bara</div>
          <div style="color:var(--green-soft)">✓ Sin diagnósticos nuevos</div>
          <div style="color:var(--green-soft)">✓ Confirmé firma</div>
        </div>
        <div style="align-self:flex-end;background:var(--hover);border:1px solid var(--border);padding:10px 14px;border-radius:12px;max-width:320px">¿Qué hace este código?</div>
        <div style="align-self:flex-start;background:var(--panel);border:1px solid var(--border);padding:12px 14px;border-radius:12px;max-width:420px">
          <p style="margin:0 0 8px">El archivo <span class="mono" style="color:var(--green-soft)">HELLO.bara</span> define el punto de entrada con <span class="mono">funcion main()</span>.</p>
          <div class="mono" style="background:#08090a;border:1px solid var(--border);border-radius:6px;padding:8px;font-size:14px;color:var(--muted)">funcion main() {<br/>&nbsp;&nbsp;variables x = 10<br/>&nbsp;&nbsp;si x &gt; 5 { mostrar("Bara IDE") }<br/>}</div>
        </div>
      </div>
      ${COMPOSER_HTML}
      ${BOTTOM_DOCK_HTML}
    </section>
    <aside class="editor-pane">
      ${buildTabbar(true)}
      <div class="code">
        <div class="gutter"><div>1</div><div>2</div><div>3</div><div class="gutter-err">●</div><div>5</div><div>6</div></div>
        <div class="code-body"><div>funcion main() {</div><div>  variables x = 10</div><div>  si x &gt; 5 {</div><div>    <span class="err-line">mostrar("Bara IDE")</span></div><div>  }</div><div>}</div></div>
      </div>
    </aside>`
  },
  "12": {
    "id": "12",
    "rail": "Registros",
    "label": "12 · Registros",
    "html": `<main class="main" style="padding:22px 32px;background:#08090a">
      <h1 style="margin:0 0 14px;font-size:22px;color:var(--green-soft)">Registros</h1>
      <div class="row" style="margin-bottom:14px;flex-wrap:wrap">
        <span class="chip" style="background:var(--green-dim);color:#fff;border-color:var(--green-mid)">Todo</span><span class="chip">Errores</span><span class="chip">Avisos</span><span class="chip">Info</span>
        <input class="field" style="max-width:280px;margin-left:auto" placeholder="Filtrar registros…"/>
      </div>
      <div class="card" style="max-width:1000px;font-size:14px;line-height:1.5">
        <div class="mono" style="padding:6px 0;border-bottom:1px solid rgba(30,42,56,.5)">
          <span style="color:var(--muted)">10:31:02</span>
          <span style="color:var(--green-soft);font-weight:600"> [INFO]</span>
          <span> Carpeta abierta: genesis_engine</span>
        </div>
        <div class="mono" style="padding:6px 0;border-bottom:1px solid rgba(30,42,56,.5)">
          <span style="color:var(--muted)">10:31:04</span>
          <span style="color:var(--green-soft);font-weight:600"> [INFO]</span>
          <span> Kernel conectado · fa3d308</span>
        </div>
        <div class="mono" style="padding:6px 0;border-bottom:1px solid rgba(30,42,56,.5)">
          <span style="color:var(--muted)">10:31:18</span>
          <span style="color:var(--green-soft);font-weight:600"> [INFO]</span>
          <span> Cambio aceptado en HELLO.bara · respaldo 2026-11-05_1031</span>
        </div>
        <div class="mono" style="padding:6px 0;border-bottom:1px solid rgba(30,42,56,.5)">
          <span style="color:var(--muted)">10:31:40</span>
          <span style="color:#c9a227;font-weight:600"> [AVISO]</span>
          <span> Parche no verificado rechazado</span>
        </div>
        <div class="mono" style="padding:6px 0;border-bottom:1px solid rgba(30,42,56,.5)">
          <span style="color:var(--muted)">10:32:05</span>
          <span style="color:#c45c5c;font-weight:600"> [ERROR]</span>
          <span> Sin conexión con el proveedor (tiempo agotado)</span>
        </div>
        <div class="mono" style="padding:6px 0;border-bottom:1px solid rgba(30,42,56,.5)">
          <span style="color:var(--muted)">10:32:11</span>
          <span style="color:var(--green-soft);font-weight:600"> [INFO]</span>
          <span> Reintento de conexión · DeepSeek</span>
        </div>
        <div class="mono" style="padding:6px 0;border-bottom:1px solid rgba(30,42,56,.5)">
          <span style="color:var(--muted)">10:32:14</span>
          <span style="color:var(--green-soft);font-weight:600"> [INFO]</span>
          <span> Conexión OK · deepseek-chat</span>
        </div>
        <div class="mono" style="padding:6px 0;border-bottom:1px solid rgba(30,42,56,.5)">
          <span style="color:var(--muted)">10:32:30</span>
          <span style="color:#c9a227;font-weight:600"> [AVISO]</span>
          <span> Archivo .env detectado · excluido del commit</span>
        </div>
      </div>
    </main>`
  },
  "13": {
    "id": "13",
    "rail": "Ajustes",
    "label": "13 · Ajustes",
    "html": `<main class="main" style="padding:18px 28px;background:#08090a;overflow:hidden">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">
        <h1 style="margin:0;font-size:22px;color:#fff">Ajustes</h1>
        <span class="chip">Conexión OK</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;max-width:980px">
        <div class="card" style="display:flex;flex-direction:column;gap:12px">
          <div class="row" style="justify-content:space-between">
            <span>Offline</span><div class="toggle"></div>
          </div>
          <div class="row" style="justify-content:space-between">
            <span>GGUF</span><div class="toggle"></div>
          </div>
          <div>
            <label class="label">Proveedor</label>
            <div class="field">DeepSeek ▾</div>
          </div>
          <div>
            <label class="label">Modelo</label>
            <div class="field mono">deepseek-chat</div>
          </div>
          <div>
            <label class="label">Clave conexión</label>
            <div class="field mono">••••••••••••••••••••</div>
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
        <div style="display:flex;flex-direction:column;gap:14px">
          <div class="card" style="border-style:dashed">
            <div style="font-weight:600;margin-bottom:10px">Avanzado</div>
            <div class="row" style="justify-content:space-between;margin-bottom:10px">
              <span>Temperatura</span>
              <span class="mono">0.2</span>
            </div>
            <div style="height:6px;background:#1e2a38;border-radius:999px;margin-bottom:12px">
              <div style="width:20%;height:100%;background:var(--green-soft);border-radius:999px"></div>
            </div>
            <div>
              <label class="label">Máximo de tokens</label>
              <div class="field mono">4096</div>
            </div>
            <div style="margin-top:10px">
              <label class="label">Prompt del sistema</label>
              <div class="field" style="min-height:64px">Eres el asistente oficial del lenguaje Bara.</div>
            </div>
            <label class="row" style="margin-top:10px;color:var(--muted)">
              <span class="check on">✓</span> Recordar clave en llavero local
            </label>
          </div>
          <div class="card">
            <div style="font-weight:600;margin-bottom:10px">Ajustes de interfaz</div>
            <div class="row" style="justify-content:space-between;margin-bottom:8px">
              <span>Tamaño de letra</span>
              <span class="mono">14 px mínimo</span>
            </div>
            <div class="row" style="justify-content:space-between">
              <span>Tema</span>
              <span>Oscuro (BARA)</span>
            </div>
          </div>
        </div>
      </div>
      <div class="row" style="margin-top:16px;gap:10px">
        <button class="btn btn-primary">${SVG.save(16)} Guardar</button>
        <button class="btn btn-ghost">Valores de fábrica</button>
        <button class="btn btn-danger">Olvidar</button>
      </div>
    </main>`
  },
  "14": {
    "id": "14",
    "rail": "Chat",
    "label": "14 · Error sin clave",
    "html": `${SIDEBAR_HTML}
    <section class="main" style="border-right:1px solid var(--border)">
      <div class="banner banner-error" style="justify-content:space-between">
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

window.BaraIDE = {
  topologyScope: 'proyecto',
  constructorMode: 'blueprint',
  jumpToLine(file, line) {
    renderScreen('03');
  },
  showToast: showEphemeralToast
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
    let html = screen.html;

    if (screenId === '11') {
      bottomPanelOpen = true;
    } else if (screenId === '03' && bottomPanelOpen) {
      html = html.replace('</section>', BOTTOM_DOCK_HTML + '</section>');
    }

    viewport.innerHTML = html;
    bindScreenInteractions();
  }
}

function toggleBottomPanel() {
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
  document.querySelectorAll('.problem-row').forEach(row => {
    const file = row.getAttribute('data-file') || 'HELLO.bara';
    const line = parseInt(row.getAttribute('data-line') || '1', 10);
    bindKeyboardRoleButton(row, () => window.BaraIDE.jumpToLine(file, line));
  });
}

function bindScreenInteractions() {
  // 1. Toast 05: Deshacer and Close (×)
  const deshacerBtn = document.getElementById('toast-deshacer-btn');
  if (deshacerBtn) {
    deshacerBtn.onclick = () => renderScreen('03');
  }
  const toastClose = document.getElementById('toast-close-btn');
  if (toastClose) {
    toastClose.onclick = () => {
      const t = document.getElementById('toast-05');
      if (t) t.style.display = 'none';
    };
  }

  // 2. Banner 14: Close (×) returns to 03
  const bannerClose = document.getElementById('banner-nokey-close');
  if (bannerClose) {
    bannerClose.onclick = () => renderScreen('03');
  }

  // 3. Bottom dock controls
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
        dock.style.height = dock.style.height === '380px' ? '240px' : '380px';
      }
    };
  }

  // 4. Bottom dock tabs & Problem rows
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
            content.innerHTML = PROBLEMS_TABLE_HTML;
            bindProblemRowEvents();
          } else if (tabName === 'registros') {
            content.innerHTML = `
              <div style="padding:10px 14px;font-family:var(--mono);font-size:14px;line-height:1.6;color:var(--text);">
                <div><span style="color:var(--muted)">10:31:02</span> <span style="color:var(--green-soft);font-weight:600">[INFO]</span> Carpeta abierta: genesis_engine</div>
                <div><span style="color:var(--muted)">10:31:04</span> <span style="color:var(--green-soft);font-weight:600">[INFO]</span> Kernel conectado · fa3d308</div>
                <div><span style="color:var(--muted)">10:31:40</span> <span style="color:#c9a227;font-weight:600">[AVISO]</span> Parche no verificado rechazado</div>
              </div>
            `;
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

  // 5. Screen 01 cards & recent projects
  document.querySelectorAll('.card[role="button"], .recent-project-item').forEach(el => {
    if (!el.classList.contains('tool-card')) {
      bindKeyboardRoleButton(el, () => renderScreen('03'));
    }
  });

  // 6. Herramientas 07 cards
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

  // 7. Buttons
  document.querySelectorAll('button').forEach(btn => {
    if (btn.hasAttribute('data-modal15')) {
      btn.onclick = () => renderScreen('01');
      return;
    }
    const t = (btn.textContent || '').trim();
    if (t === 'Nuevo chat') btn.onclick = () => renderScreen('03');
    if (t === 'Aceptar' || t === 'Aceptar cambio' || t === 'Aceptar de todos modos') {
      btn.onclick = () => renderScreen('05');
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

  // 8. Topología scope selector (Proyecto | Bara) with explicit IDs
  const segProy = document.getElementById('topology-seg-proyecto');
  const segBara = document.getElementById('topology-seg-bara');
  if (segProy && segBara) {
    bindKeyboardRoleButton(segProy, () => updateTopologyScope('proyecto'));
    bindKeyboardRoleButton(segBara, () => updateTopologyScope('bara'));
    bindTopologyNodeClicks(window.BaraIDE.topologyScope || 'proyecto');
  }

  // 9. Command rows in Buscar (Screen 02)
  document.querySelectorAll('.search-row').forEach(row => {
    const target = row.getAttribute('data-target');
    if (target) {
      bindKeyboardRoleButton(row, () => renderScreen(target));
    }
  });

  // 10. Close tab button in editor
  document.querySelectorAll('.tab .x').forEach(x => {
    x.onclick = (e) => {
      e.stopPropagation();
      renderScreen('15');
    };
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('demo') === '1') {
    document.getElementById('demo-switcher')?.classList.add('visible');
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

    document.addEventListener('click', () => {
      demoMenu.classList.remove('open');
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && (e.key === 'P' || e.key === 'p')) {
      e.preventDefault();
      renderScreen('02');
      return;
    }
    if (e.ctrlKey && (e.key === 'O' || e.key === 'o') && !e.shiftKey) {
      e.preventDefault();
      renderScreen('01');
      return;
    }
    if (e.ctrlKey && (e.key === 'N' || e.key === 'n') && !e.shiftKey) {
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
      const ephToast = document.getElementById('bara-ephemeral-toast');
      if (ephToast) {
        ephToast.remove();
      }
      const toast05 = document.getElementById('toast-05');
      if (toast05 && toast05.style.display !== 'none') {
        toast05.style.display = 'none';
        return;
      }
      if (currentScreenId === '02') {
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
  else renderScreen('01');
});
