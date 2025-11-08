describe('VectorShift Login Flow', () => {
  const loginUrl = 'https://login.vectorshift.ai';
  const appUrl = 'https://app.vectorshift.ai';
  
  const testEmail = Cypress.env('TEST_EMAIL');
  const testPassword = Cypress.env('TEST_PASSWORD');

  before(() => {
    // Set cookies to bypass initial bot detection
    cy.setCookie('cf_clearance', 'dummy'); // Will be replaced by real cookie
  });

  beforeEach(() => {
    // Don't clear cookies - preserve Cloudflare tokens
    cy.clearLocalStorage();
  });

  it('should successfully login with bot detection bypass', () => {
    // Visit with custom headers
    cy.visit(loginUrl, {
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1'
      }
    });
    
    // Add realistic delay before interaction
    cy.wait(2000);
    
    cy.url().should('include', loginUrl);
    
    // Simulate human-like typing
    cy.get('input[name="email"]', { timeout: 10000 })
      .should('be.visible')
      .click() // Click first like a human
      .wait(300)
      .type(testEmail, { delay: 100 }); // Slower typing
    
    // Random mouse movement simulation
    cy.get('body').trigger('mousemove', { clientX: 100, clientY: 200 });
    cy.wait(500);
    
    cy.contains('button', 'Continue')
      .should('be.enabled')
      .click();
    
    cy.wait(1500);
    
    // Enter password with human-like behavior
    cy.get('input[type="password"]', { timeout: 10000 })
      .should('be.visible')
      .click()
      .wait(400)
      .type(testPassword, { delay: 120 });
    
    // More mouse movement
    cy.get('body').trigger('mousemove', { clientX: 200, clientY: 300 });
    cy.wait(800);
    
    // Intercept the login request to check for 401
    cy.intercept('POST', '**/api/auth/**').as('loginRequest');
    
    cy.contains('button', 'Sign in')
      .should('be.enabled')
      .click();
    
    // Check the response
    cy.wait('@loginRequest', { timeout: 15000 }).then((interception) => {
      if (interception.response.statusCode === 401) {
        cy.log('⚠️ 401 Error - Bot detected or invalid credentials');
        cy.log('Response:', interception.response.body);
        
        // Check if it's Cloudflare blocking
        if (interception.response.body?.includes('cloudflare') || 
            interception.response.body?.includes('challenge')) {
          cy.log('🛡️ Cloudflare challenge required');
          // Wait for manual intervention
          cy.pause();
        }
      } else {
        cy.log('✅ Login request successful');
      }
    });
    
    // Verify successful login
    cy.url({ timeout: 20000 }).should('include', '/home');
    cy.contains('Home', { timeout: 10000 }).should('be.visible');
  });
});