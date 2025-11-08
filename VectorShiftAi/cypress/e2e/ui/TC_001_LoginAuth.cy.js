describe('TC_001: Login/Authentication Flow', () => {
  it('should successfully log in and restrict unauthorized access', () => {
    // Step 1: Navigate to homepage
    cy.visit('https://login.vectorshift.ai/');

    // Step 3: Enter valid email and continue
    cy.get('input[type="email"]').type('fewikwi52t@gmail.com');
    cy.contains('Continue').click();
    cy.get('input[type="password"]').should('be.visible');

    // Step 4: Enter valid password and sign in
    cy.get('input[type="password"]').type('0ZfmSg@123');
    cy.contains('button', 'Sign in').click();
  cy.url({ timeout: 20000 }).should('include', '/home');
    cy.contains('Home').should('be.visible');
    cy.contains('Pipelines').should('be.visible');
    // Step 5: Verify dashboard elements
    cy.contains('Welcome to Vectorshift').should('be.visible');
    cy.get('[data-testid="sidebar-navigation"]').should('exist');
    cy.contains('Journeys').should('be.visible');

    // Step 6: Clear cookies, try direct access to /home
    cy.clearCookies();
    cy.visit('https://app.vectorshift.ai/home');
    cy.url().should('include', 'login.vectorshift.ai');

    // Step 7: Verify unauthorized access protection
    cy.get('[data-testid="protected-content"]').should('not.exist');
  });
});


