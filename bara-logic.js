/**
 * Bara IDE — AETHER-Ω (v0.5.0)
 * Pure logic module for BARA-VISUAL-5:
 * - Version & file constants
 * - Hidden advanced components config (showAdvanced = false)
 * - Coherent single source of truth for Problems & counters
 * - TokenKind::Diagnostic tokenizer & validators (3-consonant root, number, unclosed string)
 * - Strict mode gating for unverified changes
 * - GitHub URL validation for error banner
 */

export const APP_VERSION = 'v0.5.0';
export const OPEN_FILE_PATH = 'samples/genesis.bara';
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
  { id: 'bilattice', label: 'Bilattice', description: 'Retículo lógico de cuatro valores (⊤, ⊥, Ambos, Ninguno)' },
  { id: 'telemetria', label: 'Telemetría', description: 'Latencia de inferencia y tiempos de verificación local' },
  { id: 'topologia', label: 'Topología', description: 'Grafo de dependencias y contratos del módulo' },
  { id: 'ledger', label: 'Ledger', description: 'Registro criptográfico de firmas y parches aplicados' },
  { id: 'lienzo', label: 'Lienzo', description: 'Vista rápida de nodos fuente → transformar → guardia → sumidero' },
  { id: 'nucleo', label: 'Núcleo', description: 'Estado interno del verificador formal Bara v0.5.0' }
];

/**
 * Single source of truth for IDE problems (barra de estado, contador ⚠ N y panel Problemas).
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
    severity: 'error'
  }
];

export function computeProblemsSummary(problemsList) {
  const list = Array.isArray(problemsList) ? problemsList : [];
  const total = list.length;
  const warnings = list.filter(p => p.severity === 'aviso').length;
  const errors = list.filter(p => p.severity === 'error').length;
  const probWord = total === 1 ? 'problema' : 'problemas';
  const warnWord = warnings === 1 ? 'aviso' : 'avisos';
  const errWord = errors === 1 ? 'error' : 'errores';
  return {
    total,
    warnings,
    errors,
    statusText: `${total} ${probWord} · ⚠ ${warnings} ${warnWord} · ✖ ${errors} ${errWord}`,
    badgeText: `Σ ${total}`,
    totalTooltip: `${total} ${probWord} en total (${warnings} ${warnWord}, ${errors} ${errWord})`
  };
}

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u', 'á', 'é', 'í', 'ó', 'ú']);

/**
 * Validates a Bara triliteral root (e.g. @ktb is valid; @kt or @ktbl is invalid).
 * A valid root must have exactly 3 consonants.
 */
export function validateBaraRoot(rawRoot) {
  const cleaned = String(rawRoot || '').replace(/^@/, '').trim().toLowerCase();
  const letters = [...cleaned].filter(ch => /[a-zñáéíóú]/i.test(ch));
  const consonants = letters.filter(ch => !VOWELS.has(ch));
  if (consonants.length !== 3 || letters.length !== 3) {
    return {
      valid: false,
      kind: 'Diagnostic',
      severity: 'error',
      message: 'Raíz inválida: debe tener exactamente 3 consonantes'
    };
  }
  return { valid: true, kind: 'Root', severity: null, message: null };
}

/**
 * Validates a numeric literal in Bara (e.g. "10" or "0.2" valid; "1.2.3" invalid).
 */
export function validateBaraNumber(rawNumber) {
  const str = String(rawNumber || '').trim();
  if (/^\d+(\.\d+)?$/.test(str)) {
    return { valid: true, kind: 'Number', severity: null, message: null };
  }
  return {
    valid: false,
    kind: 'Diagnostic',
    severity: 'error',
    message: 'Número inválido'
  };
}

/**
 * Checks whether a line has an unclosed string literal.
 * Cuts off at the line break so subsequent lines continue coloring normally.
 */
export function detectUnclosedStringInLine(lineText) {
  let inString = false;
  let startCol = -1;
  for (let i = 0; i < lineText.length; i++) {
    const ch = lineText[i];
    const prev = i > 0 ? lineText[i - 1] : '';
    if (ch === '"' && prev !== '\\') {
      if (!inString) {
        inString = true;
        startCol = i + 1;
      } else {
        inString = false;
        startCol = -1;
      }
    }
  }
  if (inString) {
    return {
      hasUnclosed: true,
      kind: 'Diagnostic',
      severity: 'warn',
      column: startCol,
      token: lineText.slice(startCol - 1),
      message: 'Cadena sin cerrar'
    };
  }
  return { hasUnclosed: false, kind: null, severity: null, column: -1, token: null, message: null };
}

export const GENESIS_BARA_LINES = [
  '// samples/genesis.bara — módulo principal v0.5.0',
  'raiz @ktbl ContratoGenesis {',
  '  funcion iniciar() {',
  '    variables version_num = 1.2.3',
  '    variables saludo = "Bienvenido a Bara IDE',
  '    si version_num > 1 {',
  '      mostrar("kernel activo")',
  '      registrar("genesis listo")',
  '    }',
  '  }',
  '}'
];

export const BARA_DIAGNOSTICS = [
  {
    id: 'diag-root',
    file: OPEN_FILE_PATH,
    line: 2,
    column: 6,
    token: '@ktbl',
    severity: 'error',
    kind: 'TokenKind::Diagnostic',
    message: 'Raíz inválida: debe tener exactamente 3 consonantes'
  },
  {
    id: 'diag-num',
    file: OPEN_FILE_PATH,
    line: 4,
    column: 29,
    token: '1.2.3',
    severity: 'error',
    kind: 'TokenKind::Diagnostic',
    message: 'Número inválido'
  },
  {
    id: 'diag-str',
    file: OPEN_FILE_PATH,
    line: 5,
    column: 24,
    token: '"Bienvenido a Bara IDE',
    severity: 'warn',
    kind: 'TokenKind::Diagnostic',
    message: 'Cadena sin cerrar'
  }
];

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
