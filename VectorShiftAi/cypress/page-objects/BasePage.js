// Base Page Object Model class
// All page objects should extend this class

export class BasePage {
  /**
   * Visit a page
   */
  visit(url) {
    cy.visit(url);
    return this;
  }

  /**
   * Get element by data-testid
   */
  getElement(testId) {
    return cy.get(`[data-testid="${testId}"]`);
  }

  /**
   * Click element by data-testid
   */
  clickElement(testId) {
    this.getElement(testId).click();
    return this;
  }

  /**
   * Type into element by data-testid
   */
  typeIntoElement(testId, text) {
    this.getElement(testId).type(text);
    return this;
  }

  /**
   * Assert element is visible
   */
  assertElementVisible(testId) {
    this.getElement(testId).should('be.visible');
    return this;
  }

  /**
   * Assert element contains text
   */
  assertElementContains(testId, text) {
    this.getElement(testId).should('contain', text);
    return this;
  }
}

