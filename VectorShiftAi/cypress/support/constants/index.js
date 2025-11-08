// Constants used across tests

export const API_ENDPOINTS = {
  LOGIN: '/api/login',
  LOGOUT: '/api/logout',
  USERS: '/api/users',
  PRODUCTS: '/api/products',
};

export const TEST_USERS = {
  ADMIN: {
    username: 'admin',
    password: 'admin123',
  },
  REGULAR: {
    username: 'user',
    password: 'user123',
  },
};

export const TIMEOUTS = {
  SHORT: 5000,
  MEDIUM: 10000,
  LONG: 30000,
};

export const SELECTORS = {
  LOGIN_FORM: '[data-testid="login-form"]',
  LOGIN_BUTTON: '[data-testid="login-button"]',
  NAVIGATION: '[data-testid="navigation"]',
};

