// Custom Cypress commands
// Import all custom commands here

// Example: Custom login command

Cypress.Commands.add('login', (email, password) => {
  cy.visit('https://login.vectorshift.ai/'); // Navigate to login page
  cy.get('input[type="email"]').type(email); // Enter email
  cy.contains('Continue').click(); // Continue to password step
  cy.get('input[type="password"]', { timeout: 10000 }).should('be.visible');
  cy.get('input[type="password"]').type(password); // Enter password
cy.contains('button', 'Sign in').click();
  cy.url({ timeout: 20000 }).should('include', '/home');
});


// Example: Custom API command
Cypress.Commands.add('apiRequest', (method, endpoint, body = {}) => {
  return cy.request({
    method,
    url: endpoint,
    body,
    headers: {
      'Authorization': `Bearer ${window.localStorage.getItem('token')}`
    }
  });
});

// In your test file or commands.js
Cypress.Commands.add('getAuthToken', () => {
  // Method 1: Check localStorage
  cy.window().then((win) => {
    const localStorageKeys = Object.keys(win.localStorage);
    console.log('LocalStorage Keys:', localStorageKeys);
    
    localStorageKeys.forEach(key => {
      console.log(`${key}:`, win.localStorage.getItem(key));
    });
  });

  // Method 2: Check sessionStorage
  cy.window().then((win) => {
    const sessionStorageKeys = Object.keys(win.sessionStorage);
    console.log('SessionStorage Keys:', sessionStorageKeys);
    
    sessionStorageKeys.forEach(key => {
      console.log(`${key}:`, win.sessionStorage.getItem(key));
    });
  });

  // Method 3: Check cookies
  cy.getCookies().then((cookies) => {
    console.log('Cookies:', cookies);
  });
});

Cypress.Commands.add('apiLogin', (email, password) => {
  cy.session([email, password], () => {
    // Try to login via API directly
    cy.request({
      method: 'POST',
      url: 'https://login.vectorshift.ai/api/auth/login', // Adjust URL
      body: {
        email: email,
        password: password
      },
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 200) {
        // Set auth cookies/tokens
        if (response.body.token) {
          cy.setCookie('auth_token', response.body.token);
        }
        // Set any session cookies
        Object.keys(response.body.cookies || {}).forEach(key => {
          cy.setCookie(key, response.body.cookies[key]);
        });
      } else {
        throw new Error(`API Login failed: ${response.status}`);
      }
    });
  });
  
  // Visit the app
  cy.visit(`${appUrl}/home`);
});

// Usage in test:
// it('should login via API', () => {
//   cy.apiLogin(testEmail, testPassword);
//   cy.contains('Home').should('be.visible');
// });
// Utility commands to save and restore localStorage
let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add('saveLocalStorage', () => {
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add('restoreLocalStorage', () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });

});


