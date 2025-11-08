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
