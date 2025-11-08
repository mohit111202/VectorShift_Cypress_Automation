describe('TC_003: Create a New AI Workflow (Pipeline)', () => {
  beforeEach(() => {
    cy.login('fewikwi52t@gmail.com', '0ZfmSg@123');
    cy.visit('https://app.vectorshift.ai/home');
  });

  it('should create, connect, and save a new pipeline', () => {
    // Step 1: Click Pipelines
    cy.contains('Pipelines').click();
    cy.url().should('include', '/pipelines');

    // Step 2: Create new pipeline
    cy.contains('Create new Pipeline').click();
    cy.url().should('include', '/pipelines/new');

    // Step 3: Start Blank
    cy.contains('Start Blank').click();

    // Step 4: Verify editor interface
    cy.get('[data-testid="node-library"]').should('exist');
    cy.get('[data-testid="canvas"]').should('exist');
    cy.get('[data-testid="toolbar"]').should('exist');

    // Step 5-10: Add and connect nodes
    cy.dragNodeToCanvas('Input');
    cy.dragNodeToCanvas('OpenAI');
    cy.connectNodes('Input', 'OpenAI');
    cy.dragNodeToCanvas('Transformation');
    cy.connectNodes('OpenAI', 'Transformation');
    cy.dragNodeToCanvas('Output');
    cy.connectNodes('Transformation', 'Output');

    // Step 11: Configure nodes (example selectors)
    cy.get('.node').contains('Input').click();
    cy.get('[data-testid="properties-panel"]').type('User Input');
    // Repeat for other nodes if required

    // Step 12: Name pipeline
    cy.get('[data-testid="pipeline-name"]').type('QA TestPipeline');

    // Step 13: Save
    cy.contains('Save').click();
    cy.contains('Success').should('be.visible');

    // Step 14-15: Back to listing and verify
    cy.contains('Back to Pipelines').click();
    cy.contains('QA TestPipeline').should('exist');
  });
});
