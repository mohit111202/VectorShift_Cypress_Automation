describe('VectorShift Login Tests', () => {
  const loginUrl = 'https://login.vectorshift.ai/?client_id=client_01JWATY99B2FZYNEE9H72YG4J5&redirect_uri=https%3A%2F%2Fapp.vectorshift.ai';
  
  beforeEach(() => {
    // Use cy.session to cache the authentication state
    cy.session('vectorshift-login', () => {
      // Set Cloudflare cookie from environment variable
      cy.setCookie('cf_clearance', Cypress.env('cf_clearance'), {
        domain: '.vectorshift.ai',
        path: '/',
        secure: true,
        httpOnly: true,
        sameSite: 'None'
      });
      
      // Perform login
      cy.visit(loginUrl);
      cy.get('input[name="email"]').type('fewikwi52t@gmail.com');
      cy.contains('button', 'Continue').click();
      cy.get('input[type="password"]', { timeout: 10000 }).type('0ZfmSg@123');
      cy.contains('button', 'Sign in').click();
     cy.url({ timeout: 15000 }).should('include', '/home');
    }, {
      validate() {
        // Validate session is still valid
        cy.getCookie('cf_clearance').should('exist');
      }
    });
    cy.url({ timeout: 15000 }).should('include', '/home');
  });

  it('should successfully login with valid credentials', () => {
    cy.visit('https://app.vectorshift.ai/home');
    cy.contains('Home').should('be.visible');
    cy.contains('Pipelines').should('be.visible');
  });
});
