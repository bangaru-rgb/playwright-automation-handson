import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage';

test('locator test', async ({ page }) => {
  console.log("The sample test is running");

  const loginPage = new LoginPage(page);

  await loginPage.launchTheURL();

    // Option 1: Separate parameters
await loginPage.login("bangarunaidu@gmail.com", "Test@123");
  });

