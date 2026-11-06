import test from 'node:test';
import assert from 'node:assert/strict';
import {
  APP_VERSION,
  OPEN_FILE_PATH,
  DEFAULT_TRUSTED_FOLDER,
  SHOW_ADVANCED_DEFAULT,
  HIDDEN_ADVANCED_COMPONENTS,
  MORE_TABS_ITEMS,
  INITIAL_PROBLEMS,
  computeProblemsSummary,
  BARA_DIAGNOSTICS,
  validateBaraRoot,
  validateBaraNumber,
  detectUnclosedStringInLine,
  computeAcceptButtonState,
  validateGithubUrl,
  ERROR_BANNER_TEXT
} from './bara-logic.js';

test('version, trusted folder and hidden advanced constants match v0.5.0 spec', () => {
  assert.equal(APP_VERSION, 'v0.5.0');
  assert.equal(OPEN_FILE_PATH, 'samples/genesis.bara');
  assert.equal(DEFAULT_TRUSTED_FOLDER, 'C:/Users/Vexor/Downloads/bara-ide');
  assert.equal(SHOW_ADVANCED_DEFAULT, false);
  assert.ok(HIDDEN_ADVANCED_COMPONENTS.belnapBilattice.hiddenByDefault);
  assert.ok(HIDDEN_ADVANCED_COMPONENTS.aetherHeader.hiddenByDefault);
  assert.ok(HIDDEN_ADVANCED_COMPONENTS.kernelInternals.hiddenByDefault);
});

test('more tabs menu contains the 6 required items in order', () => {
  const labels = MORE_TABS_ITEMS.map(item => item.label);
  assert.deepEqual(labels, [
    'Bilattice',
    'Telemetría',
    'Topología',
    'Ledger',
    'Lienzo',
    'Núcleo'
  ]);
});

test('single source of truth for problems computes coherent counters and updates when dismissing', () => {
  const initialSummary = computeProblemsSummary(INITIAL_PROBLEMS);
  assert.equal(initialSummary.total, 3);
  assert.equal(initialSummary.warnings, 1);
  assert.equal(initialSummary.errors, 2);
  assert.equal(initialSummary.statusText, '3 problemas · ⚠ 1 aviso · ✖ 2 errores');
  assert.equal(initialSummary.badgeText, 'Σ 3');
  assert.equal(initialSummary.totalTooltip, '3 problemas en total (1 aviso, 2 errores)');

  const afterDismiss = INITIAL_PROBLEMS.slice(1);
  const nextSummary = computeProblemsSummary(afterDismiss);
  assert.equal(nextSummary.total, 2);
  assert.equal(nextSummary.warnings, 0);
  assert.equal(nextSummary.errors, 2);
  assert.equal(nextSummary.statusText, '2 problemas · ⚠ 0 avisos · ✖ 2 errores');
  assert.equal(nextSummary.badgeText, 'Σ 2');
  assert.equal(nextSummary.totalTooltip, '2 problemas en total (0 avisos, 2 errores)');
});

test('TokenKind::Diagnostic validates 3-consonant roots', () => {
  const badShort = validateBaraRoot('kt');
  assert.equal(badShort.valid, false);
  assert.equal(badShort.message, 'Raíz inválida: debe tener exactamente 3 consonantes');

  const badLong = validateBaraRoot('@ktbl');
  assert.equal(badLong.valid, false);
  assert.equal(badLong.message, 'Raíz inválida: debe tener exactamente 3 consonantes');

  const goodRoot = validateBaraRoot('@ktb');
  assert.equal(goodRoot.valid, true);
});

test('TokenKind::Diagnostic validates numbers and flags 1.2.3', () => {
  const badNum = validateBaraNumber('1.2.3');
  assert.equal(badNum.valid, false);
  assert.equal(badNum.message, 'Número inválido');

  const goodInt = validateBaraNumber('4096');
  assert.equal(goodInt.valid, true);
});

test('TokenKind::Diagnostic detects unclosed string cutting at line break', () => {
  const line5 = '    variables saludo = "Bienvenido a Bara IDE';
  const res = detectUnclosedStringInLine(line5);
  assert.equal(res.hasUnclosed, true);
  assert.equal(res.message, 'Cadena sin cerrar');
  assert.equal(res.column, 24);

  const line7 = '      mostrar("kernel activo")';
  const resClosed = detectUnclosedStringInLine(line7);
  assert.equal(resClosed.hasUnclosed, false);
});

test('BARA_DIAGNOSTICS has the 3 canonical diagnostics in samples/genesis.bara', () => {
  assert.equal(BARA_DIAGNOSTICS.length, 3);
  assert.equal(BARA_DIAGNOSTICS[0].message, 'Raíz inválida: debe tener exactamente 3 consonantes');
  assert.equal(BARA_DIAGNOSTICS[1].message, 'Número inválido');
  assert.equal(BARA_DIAGNOSTICS[2].message, 'Cadena sin cerrar');
});

test('strict mode blocks Aceptar on unverified changes with exact message', () => {
  const unverifiedNormal = computeAcceptButtonState({ patchVerified: false, strictMode: false });
  assert.equal(unverifiedNormal.disabled, false);

  const unverifiedStrict = computeAcceptButtonState({ patchVerified: false, strictMode: true });
  assert.equal(unverifiedStrict.disabled, true);
  assert.equal(unverifiedStrict.explanation, 'Modo estricto: verifica antes de aceptar');

  const verifiedStrict = computeAcceptButtonState({ patchVerified: true, strictMode: true });
  assert.equal(verifiedStrict.disabled, false);
});

test('GitHub URL validator returns canonical error banner message', () => {
  const bad = validateGithubUrl('http://gitlab.com/user/repo');
  assert.equal(bad.valid, false);
  assert.equal(bad.error, ERROR_BANNER_TEXT);

  const goodHttps = validateGithubUrl('https://github.com/user/bara-ide');
  assert.equal(goodHttps.valid, true);

  const goodSsh = validateGithubUrl('git@github.com:user/bara-ide.git');
  assert.equal(goodSsh.valid, true);
});
