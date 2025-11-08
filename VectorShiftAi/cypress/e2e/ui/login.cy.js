describe('VectorShift Login Flow', () => {
  const baseUrl = 'https://vectorshift.ai';
  const loginUrl = 'https://login.vectorshift.ai';
  const appUrl = 'https://app.vectorshift.ai';

  beforeEach(() => {
    // Clear cookies before each test to ensure clean state
    // cy.clearCookies();
  });



  it.only('should successfully login with valid credentials starting from homepage', () => {
    // Step 1: Visit the VectorShift homepage
    // cy.visit(baseUrl);
    
    // // Step 2: Click the "Get started" button (opens in new tab by default)
    // cy.contains('Get started').then($link => {
    //   const href = $link.attr('href');
    //   cy.visit(href);
    // });
  //   cy.get('h1', { timeout: 10000 }).should('be.visible').and('contain', 'Sign in');
  // // .then($link => {
  //   //   const href = $link.attr('href');
  //   //   cy.visit(href);
  //   // });
  //   // Step 3: Wait for redirect to login page
  cy.visit(loginUrl);
    cy.url().should('include', loginUrl);
    
    // Step 4: Enter email address
    cy.get('input[name="email"]').type('fewikwi52t@gmail.com');
    
    // Step 5: Click Continue button to proceed to password step
    cy.contains('button', 'Continue').click();
    
    // Step 6: Wait for password field to appear and enter password
    cy.get('input[type="password"]', { timeout: 10000 }).should('be.visible');
    cy.get('input[type="password"]').type('0ZfmSg@123');
    
    // Step 7: Click Sign in button
    cy.contains('button', 'Sign in').click();
    cy.pause()//claude here I want to implement a captcha solver , i have ttached the kind of captcha I get
    // Step 8: Verify successful login and redirect to home page
    cy.url({ timeout: 10000 }).should('include', '/home');
    cy.contains('Home').should('be.visible');
    cy.contains('Pipelines').should('be.visible');
  });

  it('should redirect to login when accessing app home without authentication', () => {
    // Try to access protected route without login
    cy.visit(`${appUrl}/home`);
    
    // Should redirect to login page
    cy.url().should('include', loginUrl);
    cy.contains('Sign in').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
  });

  it('should show error for invalid credentials', () => {
    // Visit homepage and click Get Started
    cy.visit(baseUrl);
  cy.contains('Get started').then($link => {
      const href = $link.attr('href');
      cy.visit(href);
    });
    
    // Enter invalid email
    cy.get('input[name="email"]').type('invalid@test.com');
    cy.contains('button', 'Continue').click();
    
    // Enter invalid password
    cy.get('input[type="password"]', { timeout: 10000 }).type('wrongpassword123');
    cy.contains('button', 'Sign in').click();
    
    // Should show error message or remain on login page
    cy.url().should('include', loginUrl);
  });
});
