describe('TC_006: Use Observability & Analytics', () => {
  beforeEach(() => {
    cy.login('fewikwi52t@gmail.com', '0ZfmSg@123');
    cy.visit('https://app.vectorshift.ai/home');
  });

  it('should show usage analytics after pipeline/chatbot run', () => {
    // Step 1: Run a pipeline / send chatbot message
    cy.runDemoPipelineOrChatbot(); // Custom command
    
    // Step 2-3: Expand Observability and click Analytics
    cy.contains('Observability').click();
    cy.contains('Analytics').click();
    cy.url().should('include', '/analytics');

    // Step 4-5: Verify analytics dashboard and recent activity
    cy.get('[data-testid="analytics-dashboard"]').should('be.visible');
    cy.contains('Total runs').should('exist');
    cy.contains('Success rate').should('exist');
    cy.contains('Errors').should('exist');
    cy.contains('Usage by pipeline').should('exist');

    // Step 6-8: Date filters and verify metrics update
    cy.get('[data-testid="date-filter"]').select('Last 7 days');
    cy.get('[data-testid="date-filter"]').select('Last 30 days');
    cy.get('[data-testid="chart"]').should('exist');

    // Step 9-11: Pipeline-specific analytics and run history
    cy.contains('Pipelines').click();
    cy.contains('Analytics').click();
    cy.get('[data-testid="run-history"]').click();
    cy.get('table').should('contain', 'Timestamp').and('contain', 'Status');

    // Step 12: Verify run logs
    cy.get('table').should('contain', 'Duration').and('contain', 'Input').and('contain', 'Output');
  });
});
