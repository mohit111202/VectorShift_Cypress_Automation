const { defineConfig } = require('cypress');

module.exports = defineConfig({
  // E2E Testing configuration
  e2e: {
    // Test file patterns
    specPattern: 'cypress/e2e/**/*.cy.js',
    
    // Support file
    supportFile: 'cypress/support/e2e.js',
    
    // Base URL for your application
    baseUrl: 'https://app.vectorshift.ai',
    
    // Setup node events
    setupNodeEvents(on, config) {
      // Modify browser launch arguments to bypass bot detection
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          // Remove automation flags that Cloudflare detects
          launchOptions.args = launchOptions.args.filter(arg => 
            arg !== '--enable-automation' && 
            !arg.startsWith('--disable-blink-features=AutomationControlled')
          );
          
          // Add arguments to appear more human-like
          launchOptions.args.push('--disable-blink-features=AutomationControlled');
          launchOptions.args.push('--disable-features=IsolateOrigins,site-per-process');
          launchOptions.args.push('--disable-web-security');
          launchOptions.args.push('--disable-site-isolation-trials');
          
          // Set realistic user agent
          launchOptions.args.push(
            '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
          );
          
          // Add window size to avoid headless detection
          launchOptions.args.push('--window-size=1920,1080');
          
          // Additional flags to reduce bot detection
          launchOptions.args.push('--disable-dev-shm-usage');
          launchOptions.args.push('--no-sandbox');
          launchOptions.args.push('--disable-setuid-sandbox');
          
          console.log('✅ Browser launch args modified for bot detection bypass');
        }
        
        return launchOptions;
      });

      // Optional: Add task for logging
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });
      
      return config;
    },
    
    // Viewport settings - use common desktop resolution
    viewportWidth: 1920,
    viewportHeight: 1080,
    
    // Increased timeouts for Cloudflare challenges
    defaultCommandTimeout: 15000,
    requestTimeout: 15000,
    responseTimeout: 30000,
    pageLoadTimeout: 90000,
    
    // Retry configuration
    retries: {
      runMode: 2,
      openMode: 0,
    },
    
    // Video recording
    video: true,
    videosFolder: 'cypress/videos',
    videoCompression: 32,
    
    // Screenshots
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    
    // Downloads folder
    downloadsFolder: 'cypress/downloads',
    
    // Trash assets before runs
    trashAssetsBeforeRuns: true,
    
    // CRITICAL: Disable Chrome Web Security to avoid CORS issues
    chromeWebSecurity: false,
    
    // Modify obstructive third party code (helps with Cloudflare)
    experimentalModifyObstructiveThirdPartyCode: true,
    
    // Don't clear cookies between tests - preserves Cloudflare clearance
    testIsolation: false,
    
    // Experimental features
    experimentalStudio: false,
  },

  // Environment variables - NEVER commit sensitive data
  env: {
    // Test credentials (use cypress.env.json instead for sensitive data)
    TEST_EMAIL: 'fewikwi52t@gmail.com',
    TEST_PASSWORD: '0ZfmSg@123',
    
    // Cloudflare clearance cookie (optional - will be obtained automatically)
    // This is just a fallback if needed
    CF_CLEARANCE: '',
    
    // API keys for CAPTCHA solving services (if using)
    CAPTCHA_API_KEY: '',
    
    // Feature flags
    SKIP_LOGIN: false,
    USE_API_LOGIN: false,
  },

  // Component Testing configuration (if using)
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
    specPattern: 'cypress/component/**/*.cy.{js,jsx,ts,tsx}',
  },
});