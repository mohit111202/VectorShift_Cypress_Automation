describe('TC_002: Explore and Start a Featured Template/Journey', () => {
  beforeEach(() => {
    cy.login('fewikwi52t@gmail.com', '0ZfmSg@123'); // Custom command
    cy.visit('https://app.vectorshift.ai/home');
  });

  it('should let users browse templates and start guided journeys', () => {
    // Step 1: Click Marketplace
    cy.contains('Marketplace').click();
    cy.url().should('include', '/marketplace');

    // Step 2: Verify templates displayed
    cy.contains('Chatbot Template').should('be.visible');
    cy.contains('Knowledge Base Template').should('be.visible');
    cy.contains('Blog Generator').should('be.visible');

    // Step 3: Filter "Chatbot"
    cy.get('button').contains('Chatbot').click();
    cy.contains('Chatbot Template').should('be.visible');
    cy.contains('Knowledge Base Template').should('not.be.visible');

    // Step 4: Return to home
    cy.contains('Home').click();
    cy.url().should('include', '/home');

    // Step 5: Verify journeys section and metadata
    cy.contains('Journeys').parent().within(() => {
      cy.contains('Build an AI Knowledge assistant').should('exist');
      cy.contains('Create your first interface').should('exist');
      cy.contains('Create your first knowledge base').should('exist');
    });

    // Step 6: Check metadata
    cy.contains('Build an AI Knowledge assistant')
      .parent()
      .should('contain.text', '0/2 Credits')
      .and('contain.text', 'Not Started')
      .and('contain.text', '5 min')
      .and('contain.text', 'Pipeline');

    // Step 7: Begin Journey
    cy.contains('Begin Journey').first().click();
    cy.contains('Journey wizard').should('be.visible');

    // Step 8: Complete first step
    cy.get('[data-testid="step-complete"]').click(); // Example step
    cy.contains('1/2 Credits').should('exist');
  });
});
