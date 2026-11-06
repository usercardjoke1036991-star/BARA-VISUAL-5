/**
 * Bara IDE (v0.5.0)
 * Pure logic module for BARA-VISUAL-5:
 * - Version & trusted folder constants
 * - Hidden advanced components config (showAdvanced = false)
 * - Coherent single source of truth for Problems (error, aviso, info) & counters
 * - Interactive Problems filtering & Registros filtering (level + text)
 * - Strict mode gating for unverified changes
 * - GitHub URL validation for error banner
 */

export const APP_VERSION = 'v0.5.0';
export const DEFAULT_TRUSTED_FOLDER = 'C:/Users/Vexor/Downloads/bara-ide';
export const ERROR_BANNER_TEXT = 'Sólo se aceptan URL https o ssh de github.com';

export const SHOW_ADVANCED_DEFAULT = false;

export const HIDDEN_ADVANCED_COMPONENTS = {
  belnapBilattice: {
    id: 'adv-belnap-bilattice',
    title: 'Belnap Bilattice (AETHER-Ω)',
    states: ['True (⊤)', 'False (⊥)', 'Both (⊤⊥)', 'Neither (∅)'],
    hiddenByDefault: true
  },
  aetherHeader: {
    id: 'adv-aether-header',
    title: 'AETHER-Ω Symbolic Engine',
    subtitle: 'Motor formal de verificación simbólica',
    hiddenByDefault: true
  },
  kernelInternals: {
    id: 'adv-kernel-internals',
    title: 'Internos del Kernel (Shoresh AST / Ledger)',
    hash: 'fa3d308',
    hiddenByDefault: true
  },
  kernelRailItem: {
    id: 'adv-rail-kernel',
    label: 'Kernel',
    hiddenByDefault: true
  }
};

export const MORE_TABS_ITEMS = [
  { id: 'bilattice', label: 'Bilattice', description: 'Retículo lógico de cuatro valores (⊤, ⊥, Ambos, Ninguno)', advanced: true },
  { id: 'telemetria', label: 'Telemetría', description: 'Latencia de inferencia y tiempos de verificación local', advanced: true },
  { id: 'topologia', label: 'Topología', description: 'Grafo de dependencias y contratos del módulo', advanced: false },
  { id: 'ledger', label: 'Ledger', description: 'Registro criptográfico de firmas y parches aplicados', advanced: true },
  { id: 'lienzo', label: 'Lienzo', description: 'Vista rápida de nodos fuente → transformar → guardia → sumidero', advanced: false },
  { id: 'nucleo', label: 'Núcleo', description: 'Estado interno del verificador formal Bara v0.5.0', advanced: true }
];

/**
 * Returns the tabs shown inside the » («Más pestañas») menu.
 * While showAdvanced = false, Bilattice, Telemetría, Ledger and Núcleo stay hidden.
 */
export function getVisibleMoreTabs(showAdvanced = false) {
  const baseTabs = [
    { id: 'problemas', label: 'Problemas', advanced: false },
    { id: 'registros', label: 'Registros', advanced: false },
    { id: 'terminal', label: 'Terminal kernel', advanced: false }
  ];
  const extraTabs = MORE_TABS_ITEMS.filter(item => Boolean(showAdvanced) || !item.advanced);
  return [...baseTabs, ...extraTabs];
}

/**
 * Single source of truth for IDE problems (barra de estado, contador Σ N y panel Problemas).
 * Restored to VISUAL-4 levels: 1 aviso, 1 error, 1 info.
 */
export const INITIAL_PROBLEMS = [
  {
    id: 'prob-1',
    file: 'HELLO.bara',
    line: 4,
    col: 5,
    location: 'HELLO.bara:4:5',
    message: "Identificador 'mostrar' — aviso de firma",
    severity: 'aviso'
  },
  {
    id: 'prob-2',
    file: 'genesis.bara',
    line: 12,
    col: 1,
    location: 'genesis.bara:12:1',
    message: 'ContratoA no resuelto en alcance',
    severity: 'error'
  },
  {
    id: 'prob-3',
    file: 'HELLO.bara',
    line: 2,
    col: 3,
    location: 'HELLO.bara:2:3',
    message: 'Variable x sin anotación de tipo',
    severity: 'info'
  }
];

export function computeProblemsSummary(problemsList) {
  const list = Array.isArray(problemsList) ? problemsList : [];
  const total = list.length;
  const warnings = list.filter(p => p.severity === 'aviso').length;
  const errors = list.filter(p => p.severity === 'error').length;
  const infos = list.filter(p => p.severity === 'info').length;
  const probWord = total === 1 ? 'problema' : 'problemas';
  const warnWord = warnings === 1 ? 'aviso' : 'avisos';
  const errWord = errors === 1 ? 'error' : 'errores';
  return {
    total,
    warnings,
    errors,
    infos,
    statusText: `${total} ${probWord} · ⚠ ${warnings} ${warnWord} · ✖ ${errors} ${errWord} · ℹ ${infos} info`,
    badgeText: `Σ ${total}`,
    totalTooltip: `${total} ${probWord} en total (${warnings} ${warnWord}, ${errors} ${errWord}, ${infos} info)`
  };
}

/**
 * Filters activeProblems by severity chip ('todos' | 'error' | 'aviso' | 'info').
 */
export function filterProblems(problemsList, severityFilter = 'todos') {
  const list = Array.isArray(problemsList) ? problemsList : [];
  const norm = String(severityFilter || 'todos').toLowerCase();
  if (norm === 'todos' || norm === 'todo') return list;
  return list.filter(p => p.severity === norm);
}

/**
 * Filters Registros by level chip ('todo' | 'errores' | 'avisos' | 'info') and search text.
 */
export function filterRegistros(registrosList, levelFilter = 'todo', queryText = '') {
  const list = Array.isArray(registrosList) ? registrosList : [];
  const normLevel = String(levelFilter || 'todo').toLowerCase();
  const q = String(queryText || '').trim().toLowerCase();

  return list.filter(entry => {
    const entryLevel = String(entry.level || '').toUpperCase();
    let matchesLevel = true;
    if (normLevel === 'errores' || normLevel === 'error') {
      matchesLevel = entryLevel === 'ERROR';
    } else if (normLevel === 'avisos' || normLevel === 'aviso') {
      matchesLevel = entryLevel === 'AVISO';
    } else if (normLevel === 'info') {
      matchesLevel = entryLevel === 'INFO';
    }
    if (!matchesLevel) return false;
    if (!q) return true;
    const haystack = `${entry.time || ''} [${entryLevel}] ${entry.text || ''}`.toLowerCase();
    return haystack.includes(q);
  });
}

/**
 * Computes whether the "Aceptar" button on a proposed change must be disabled.
 * When strictMode is ON and the change is NOT verified, Aceptar is blocked
 * with the exact message «Modo estricto: verifica antes de aceptar».
 */
export function computeAcceptButtonState({ patchVerified, strictMode }) {
  if (!patchVerified && strictMode) {
    return {
      disabled: true,
      explanation: 'Modo estricto: verifica antes de aceptar'
    };
  }
  return {
    disabled: false,
    explanation: ''
  };
}

/**
 * Validates a repository URL (only https://github.com/... or git@github.com:... / ssh://git@github.com/... allowed).
 */
export function validateGithubUrl(url) {
  const trimmed = String(url || '').trim();
  const isHttps = /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+(\.git)?\/?$/i.test(trimmed);
  const isSsh = /^(git@github\.com:|ssh:\/\/git@github\.com\/)[\w.-]+\/[\w.-]+(\.git)?$/i.test(trimmed);
  if (isHttps || isSsh) {
    return { valid: true, error: null };
  }
  return { valid: false, error: ERROR_BANNER_TEXT };
}
