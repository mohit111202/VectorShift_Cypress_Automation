# Cypress Test Structure

This directory contains all Cypress end-to-end tests and supporting files for the project.

## Folder Structure

```
cypress/
├── e2e/                    # End-to-end test files
│   ├── api/               # API tests
│   ├── ui/                # UI/functional tests
│   ├── smoke/             # Smoke tests (critical paths)
│   └── regression/        # Regression tests
│
├── page-objects/          # Page Object Model classes
│   ├── BasePage.js        # Base page class
│   └── LoginPage.js       # Example page object
│
├── fixtures/              # Test data and fixtures
│   ├── api/               # API response fixtures
│   └── test-data/         # Test data (users, products, etc.)
│
├── support/               # Support files
│   ├── commands/          # Custom Cypress commands
│   ├── utils/             # Utility functions
│   ├── constants/         # Constants and configuration
│   └── e2e.js             # Main support file
│
├── reports/               # Test reports (generated)
├── downloads/             # Downloaded files during tests
├── screenshots/           # Screenshots (auto-generated)
└── videos/                # Test videos (auto-generated)
```

## Running Tests

### Interactive Mode (UI)
```bash
npm run cypress:open
```

### Headless Mode (CI/CD)
```bash
npm run cypress:run
```

### Run Specific Test Suite
```bash
# Run only smoke tests
npm run cypress:run -- --spec "cypress/e2e/smoke/**/*.cy.js"

# Run only API tests
npm run cypress:run -- --spec "cypress/e2e/api/**/*.cy.js"

# Run only UI tests
npm run cypress:run -- --spec "cypress/e2e/ui/**/*.cy.js"
```

## Best Practices

### 1. Page Object Model (POM)
- Use Page Objects to encapsulate page-specific logic
- All page objects should extend `BasePage`
- Keep selectors and page interactions in page objects

### 2. Test Data
- Store test data in `fixtures/test-data/`
- Use JSON files for structured data
- Keep API responses in `fixtures/api/`

### 3. Custom Commands
- Add reusable commands in `support/commands/`
- Import commands in `support/e2e.js`
- Use commands for common operations (login, API calls, etc.)

### 4. Constants
- Store constants in `support/constants/`
- Use constants for endpoints, selectors, timeouts, etc.

### 5. Utilities
- Add helper functions in `support/utils/`
- Keep utilities pure and reusable

### 6. Test Organization
- **Smoke Tests**: Critical paths that must pass
- **UI Tests**: User interface and interaction tests
- **API Tests**: Backend API endpoint tests
- **Regression Tests**: Comprehensive test coverage

## Writing Tests

### Example: Using Page Objects
```javascript
import { LoginPage } from '../../page-objects/LoginPage';

describe('Login', () => {
  const loginPage = new LoginPage();
  
  it('should login successfully', () => {
    loginPage.login('username', 'password');
    cy.url().should('not.include', '/login');
  });
});
```

### Example: Using Fixtures
```javascript
import users from '../../fixtures/test-data/users.json';

it('should login with fixture data', () => {
  cy.visit('/login');
  cy.get('[data-testid="username"]').type(users.validUser.username);
  cy.get('[data-testid="password"]').type(users.validUser.password);
  cy.get('[data-testid="login-button"]').click();
});
```

### Example: Using Custom Commands
```javascript
it('should use custom login command', () => {
  cy.login('username', 'password');
  cy.visit('/dashboard');
});
```

## Configuration

Configuration is managed in `cypress.config.js` at the project root.

Key settings:
- `baseUrl`: Application base URL
- `defaultCommandTimeout`: Default timeout for commands
- `retries`: Number of retries for failed tests
- `video`: Enable/disable video recording

## CI/CD Integration

Tests are configured to run in headless mode for CI/CD pipelines. Use:
```bash
npm run cypress:run
```

For parallel execution in CI, consider using Cypress Dashboard or configure your CI to run tests in parallel.

