// This file is processed and loaded automatically before your test files.
// You can use this file to set up global configuration and behaviors that
// modify Cypress.

// Import custom commands
import './commands';

// Import utilities (if needed globally)
// import * as helpers from './utils/helpers';

// Import constants (if needed globally)
// import * as constants from './constants';

// You can read more here:
// https://on.cypress.io/configuration

// Example: Set default viewport
// Cypress.config('defaultCommandTimeout', 10000);

// Example: Handle uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  // return false;
  
  // Or handle specific errors
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false;
  }
  return true;
});

