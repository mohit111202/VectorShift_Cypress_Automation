describe('TC_005: Deploy and Test a Chatbot Interface', () => {
  beforeEach(() => {
    cy.login('fewikwi52t@gmail.com', '0ZfmSg@123');
    cy.visit('https://app.vectorshift.ai/home');
  });

  it('should create, link, deploy and interact with chatbot', () => {
    // Step 1: Interfaces dropdown
    cy.contains('Interfaces').trigger('mouseover');
    cy.contains('Chatbots').click();

    // Step 2-4: Create new chatbot
    cy.contains('Create new Chatbot').click();
    cy.get('input[name="name"]').type('QA Test Chatbot');

    // Step 5: Link to pipeline/KB
    cy.get('select[name="linked"]').select('QA TestPipeline');
    
    // Step 6: Configure settings
    cy.get('input[name="welcomeMessage"]').type('Welcome!');
    cy.get('input[name="placeholderText"]').type('Type your query...');

    // Step 7: Deployment options
    cy.get('[data-testid="deployment-options"]').should('exist');
    
    // Step 8: Deploy chatbot
    cy.contains('Deploy').click();
    cy.contains('Success').should('be.visible');
    
    // Step 9-13: Interact and test
    cy.contains('Copy Link').click();
    cy.visitCopiedLink(); // Custom command to visit link
    cy.get('input[type="text"]').type('Hello{enter}');
    cy.contains('Welcome!').should('exist');
    
    cy.get('input[type="text"]').type('What can you help me with?{enter}');
    cy.contains('expected response').should('be.visible');
    
    // Test more interactions (loop or repeat)
    ['Help', 'Guide', 'Info'].forEach(msg => {
      cy.get('input[type="text"]').type(`${msg}{enter}`);
      cy.contains('expected').should('exist');
    });

    // Step 14-15: Verify chatbot in list
    cy.visit('https://app.vectorshift.ai/chatbots');
    cy.contains('QA Test Chatbot').should('exist').and('contain.text', 'Active');
  });
});
