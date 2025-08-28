import { test, expect } from '@playwright/test';
// This is using MCP server.
// Utility function to generate a random name with max 13 characters
function getRandomName(length = 13) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

test('Edit account information and verify success message', async ({ page }) => {
  // Step 1: Open the login page
  await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');

  // Step 2: Login
  await page.fill('input[name="email"]', 'test1@adds.com');
  await page.fill('input[name="password"]', 'Test@123');
  await page.click('input[value="Login"]');

  // Step 3: Click "Edit your account information"
  await page.click('a:text("Edit your account information")');

  // Step 4: Update the first name with a random name (max 13 chars)
  const randomName = getRandomName();
  await page.fill('input[name="firstname"]', randomName);

  // Step 5: Click Continue
  await page.click('input[value="Continue"]');

  // Step 6: Verify the success message
  await expect(page.locator('.alert-success')).toContainText('Success: Your account has been successfully updated.');
});
