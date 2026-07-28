const {
  reportRuntimeWindowError,
  reportUnhandledRejection,
} = require('./runtime-error-reporter');
const { iconDbRecovery } = require('./icon-db-recovery');
const { registerLazyCard } = require('./lazy-card');
const { getDwainsRuntimeState } = require('./runtime-state');

(function() {
  'use strict';
  // === Dwains reliability patches (v20) ===
  const runtimeState = getDwainsRuntimeState();
  if (runtimeState.bundleLoaded) {
    console.info('Dwains bundle already loaded; skipping second init');
    return;
  }
  runtimeState.bundleLoaded = true;

  iconDbRecovery.start();

  registerLazyCard();

  // Error handler: log diagnostics without suppressing browser error reporting.
  window.addEventListener('error', reportRuntimeWindowError, true);
  window.addEventListener('unhandledrejection', reportUnhandledRejection);

  console.log('Dwains runtime support loaded');
})();
