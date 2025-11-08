// Login Page Object Model
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor() {
    super();
    this.url = '';
    this.selectors = {
      usernameInput: '[data-testid="username-input"]',
      passwordInput: '[data-testid="password-input"]',
      loginButton: '[data-testid="login-button"]',
      errorMessage: '[data-testid="error-message"]',
    };
  }

  /**
   * Navigate to login page
   */
  navigate() {
    this.visit(this.url);
    return this;
  }

  /**
   * Enter username
   */
  enterUsername(username) {
    cy.get(this.selectors.usernameInput).type(username);
    return this;
  }

  /**
   * Enter password
   */
  enterPassword(password) {
    cy.get(this.selectors.passwordInput).type(password);
    return this;
  }

  /**
   * Click login button
   */
  clickLogin() {
    cy.get(this.selectors.loginButton).click();
    return this;
  }
}

