

# 🎭 Playwright Automation Project

## 📘 Overview
This project automates end-to-end testing of a web application using **Playwright** with **TypeScript**.

## 🧩 Project Structure
playwright.config.ts → Global config (browsers, retries, reports)
tests/ → Test scripts
pages/ → Page Object Model (POM) classes
fixtures/ → Test data / reusable fixtures
utils/ → Helper functions
reports/ → Test results & traces


## ⚙️ Setup
```bash
# Install dependencies
npm install

# Headless mode
npx playwright test

# With browser visible
npx playwright test --headed

# Run specific test
npx playwright test tests/login.spec.ts

npx playwright show-report

# Generate new test
npx playwright codegen https://example.com

# Run tests in a specific browser
npx playwright test --project=chromium

# Generate new test
npx playwright codegen https://example.com

# Run tests in a specific browser
npx playwright test --project=chromium



# Copilot Instructions
Write automated tests in Playwright following these guidelines:

- Follow Playwright best practices
- Do not add comments to each fine of code
- Write only the Playwright test steps for the scenario
- Read and analyze the provided DOM context from the browser
- Create one test at a time unless specifically asked for multiple tests
- Prioritize `getByRole()`getByText()' selectors over 'locator()' when possible
- Keep test code clean and focused .on the test scenario
- Don't add assertions unless asked
- For the .random .test data, keep it short and .compact. Don't write .long.texts.