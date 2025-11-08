// Utility functions for tests

/**
 * Generate random email
 */
export const generateRandomEmail = () => {
  return `test${Math.random().toString(36).substring(7)}@example.com`;
};

/**
 * Generate random string
 */
export const generateRandomString = (length = 10) => {
  return Math.random().toString(36).substring(2, length + 2);
};

/**
 * Wait for element to be visible with retry
 */
export const waitForElement = (selector, timeout = 10000) => {
  cy.get(selector, { timeout }).should('be.visible');
};

/**
 * Format date
 */
export const formatDate = (date, format = 'YYYY-MM-DD') => {
  // Add date formatting logic here
  return date.toISOString().split('T')[0];
};

