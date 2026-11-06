import test from 'node:test';
import assert from 'node:assert/strict';
import {
  APP_VERSION,
  DEFAULT_TRUSTED_FOLDER,
  SHOW_ADVANCED_DEFAULT,
  HIDDEN_ADVANCED_COMPONENTS,
  MORE_TABS_ITEMS,
  getVisibleMoreTabs,
  INITIAL_PROBLEMS,
  computeProblemsSummary,
  filterProblems,
  filterRegistros,
  computeAcceptButtonState,
  validateGithubUrl,
  ERROR_BANNER_TEXT
} from './bara-logic.js';

test('version, trusted folder and hidden advanced constants match v0.5.0 spec', () => {
  assert.equal(APP_VERSION, 'v0.5.0');
  assert.equal(DEFAULT_TRUSTED_FOLDER, 'C:/Users/Vexor/Downloads/bara-ide');
  assert.equal(SHOW_ADVANCED_DEFAULT, false);
  assert.ok(HIDDEN_ADVANCED_COMPONENTS.belnapBilattice.hiddenByDefault);
  assert.ok(HIDDEN_ADVANCED_COMPONENTS.aetherHeader.hiddenByDefault);
  assert.ok(HIDDEN_ADVANCED_COMPONENTS.kernelInternals.hiddenByDefault);
});

test('more tabs menu hides Bilattice, Telemetría, Ledger and Núcleo when showAdvanced = false, and keeps them in code for showAdvanced = true', () => {
  assert.equal(MORE_TABS_ITEMS.length, 6);
  const defaultVisible = getVisibleMoreTabs(false).map(i => i.label);
  assert.deepEqual(defaultVisible, [
    'Problemas',
    'Registros',
    'Terminal kernel',
    'Topología',
    'Lienzo'
  ]);

  const advancedVisible = getVisibleMoreTabs(true).map(i => i.label);
  assert.deepEqual(advancedVisible, [
    'Problemas',
    'Registros',
    'Terminal kernel',
    'Bilattice',
    'Telemetría',
    'Topología',
    'Ledger',
    'Lienzo',
    'Núcleo'
  ]);
});

test('single source of truth for problems computes coherent counters with info level and updates when dismissing', () => {
  const initialSummary = computeProblemsSummary(INITIAL_PROBLEMS);
  assert.equal(initialSummary.total, 3);
  assert.equal(initialSummary.warnings, 1);
  assert.equal(initialSummary.errors, 1);
  assert.equal(initialSummary.infos, 1);
  assert.equal(initialSummary.statusText, '3 problemas · ⚠ 1 aviso · ✖ 1 error · ℹ 1 info');
  assert.equal(initialSummary.badgeText, 'Σ 3');
  assert.equal(initialSummary.totalTooltip, '3 problemas en total (1 aviso, 1 error, 1 info)');

  const afterDismiss = INITIAL_PROBLEMS.slice(1);
  const nextSummary = computeProblemsSummary(afterDismiss);
  assert.equal(nextSummary.total, 2);
  assert.equal(nextSummary.warnings, 0);
  assert.equal(nextSummary.errors, 1);
  assert.equal(nextSummary.infos, 1);
  assert.equal(nextSummary.statusText, '2 problemas · ⚠ 0 avisos · ✖ 1 error · ℹ 1 info');
  assert.equal(nextSummary.badgeText, 'Σ 2');
  assert.equal(nextSummary.totalTooltip, '2 problemas en total (0 avisos, 1 error, 1 info)');
});

test('filterProblems filters by todos, error, aviso, and info', () => {
  assert.equal(filterProblems(INITIAL_PROBLEMS, 'todos').length, 3);
  assert.equal(filterProblems(INITIAL_PROBLEMS, 'error').length, 1);
  assert.equal(filterProblems(INITIAL_PROBLEMS, 'aviso').length, 1);
  assert.equal(filterProblems(INITIAL_PROBLEMS, 'info').length, 1);
  assert.equal(filterProblems(INITIAL_PROBLEMS, 'info')[0].id, 'prob-3');
});

test('filterRegistros combines level chip and text search', () => {
  const sampleLogs = [
    { time: '10:31:02', level: 'INFO', text: 'Carpeta abierta: genesis_engine' },
    { time: '10:31:40', level: 'AVISO', text: 'Parche no verificado rechazado' },
    { time: '10:32:05', level: 'ERROR', text: 'Sin conexión con el proveedor' },
    { time: '10:33:00', level: 'INFO', text: 'Cambio aceptado en HELLO.bara · respaldo 2026-11-06_1033' }
  ];
  assert.equal(filterRegistros(sampleLogs, 'todo', '').length, 4);
  assert.equal(filterRegistros(sampleLogs, 'errores', '').length, 1);
  assert.equal(filterRegistros(sampleLogs, 'avisos', '').length, 1);
  assert.equal(filterRegistros(sampleLogs, 'info', 'HELLO.bara').length, 1);
  assert.equal(filterRegistros(sampleLogs, 'errores', 'HELLO.bara').length, 0);
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
