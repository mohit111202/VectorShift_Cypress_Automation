describe('TC_007: Access and Use Help Resources', () => {
  beforeEach(() => {
    cy.login('fewikwi52t@gmail.com', '0ZfmSg@123');
  });

  it('should open docs, tutorials, and guides, and check contextual help', () => {
    // Step 1: Look for help
    cy.get('[data-testid="help-menu"]').should('exist');

    // Step 2-3: Documentation link
    cy.contains('Documentation').invoke('removeAttr', 'target').click();
    cy.url().should('include', 'docs.vectorshift.ai');
    cy.contains('Getting Started').should('exist');

    // Step 4: Check docs sections
    cy.contains('Pipelines').should('exist');
    cy.contains('Knowledge Bases').should('exist');
    cy.contains('Interfaces').should('exist');
    cy.contains('API Reference').should('exist');

    // Step 5: Search docs
    cy.get('input[type="search"]').type('pipeline{enter}');
    cy.contains('Results').should('be.visible');

    // Step 7-9: Video tutorials
    cy.visit('https://vectorshift.ai/tutorials');
    cy.get('[data-testid="video-library"]').should('be.visible');

    // Step 11: Guides/help center
    cy.visit('https://vectorshift.ai/blog');
    cy.contains('Guides').should('be.visible');
    
    // Step 13: Contextual Learn More
    cy.visit('https://app.vectorshift.ai/pipelines');
    cy.contains('Learn More').click();
    cy.url().should('include', 'docs.vectorshift.ai');

    // Step 15: In-app help (tooltips, explanations)
    cy.get('[data-testid="info-icon"]').trigger('mouseover');
    cy.get('[data-testid="tooltip"]').should('be.visible');
  });
});
