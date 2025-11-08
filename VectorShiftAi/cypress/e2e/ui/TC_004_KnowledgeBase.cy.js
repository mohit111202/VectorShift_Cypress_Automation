describe('TC_004: Set Up a Knowledge Base', () => {
  beforeEach(() => {
    cy.login('fewikwi52t@gmail.com', '0ZfmSg@123');
    cy.visit('https://app.vectorshift.ai/home');
  });

  it('should create KB, upload file, and query assistant', () => {
    // Step 1: Click Knowledge Bases
    cy.contains('Knowledge Bases').click();
    cy.url().should('include', '/knowledge');

    // Step 2: Create KB
    cy.contains('Create a new Knowledge Base').click();
    cy.get('input[name="name"]').type('QA TestKnowledge Base');

    // Step 3-5: Upload test_document.pdf
    cy.contains('Upload Files').click();
    cy.get('input[type="file"]').attachFile('test_document.pdf');
    cy.contains('Upload').click();

    // Step 6-7: Wait for processing
    cy.contains('Processed').should('exist');

    // Step 8: Verify Files table
    cy.get('table').should('contain', 'test_document.pdf').and('contain', 'PDF').and('contain', 'Processed');

    // Step 9: Connect Google Drive (optional, if exists)
    // cy.contains('Google Drive').click();
    // cy.oauthGoogleDriveFlow(['test_document.pdf']);

    // Step 10-12: Test query
    cy.contains('Test').click();
    cy.get('input[name="query"]').type('What is this document about?');
    cy.contains('Submit').click();
    cy.contains('AI assistant returns relevant answer').should('exist');
  });
});
