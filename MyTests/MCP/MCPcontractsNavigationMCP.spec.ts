import { test, expect } from '@playwright/test';

test('Login and navigate to Contracts, verify SEARCH CONTRACTS BY label', async ({ page, context }) => {
  // Step 1: Launch browser and go to the login page
  await page.goto('https://teminfinityqa2.temenos-cloud.net/apps/spotlight/#_frmLogin');
  await page.screenshot({ path: 'debug-1-initial.png', fullPage: true });
  console.log('Navigated to initial URL');

  // Step 2: Wait for navigation to Keycloak login page (dynamic URL)
  await page.waitForURL(url => url.href.includes('/realms/') && url.href.includes('/protocol/openid-connect/auth'), { timeout: 60000 });
  await page.screenshot({ path: 'debug-2-keycloak-redirect.png', fullPage: true });
  console.log('Redirected to Keycloak login page:', page.url());

  // Step 3: Wait for login form to appear and fill credentials on Keycloak page
  await page.waitForSelector('input[name="username"], input[name="email"]', { timeout: 60000 });
  await page.screenshot({ path: 'debug-3-login-form.png', fullPage: true });
  console.log('Login form detected');
  const usernameSelector = (await page.$('input[name="username"]')) ? 'input[name="username"]' : 'input[name="email"]';
  await page.fill(usernameSelector, 'maker');
  console.log('Filled username');
  await page.waitForSelector('input[name="password"]', { timeout: 30000 });
  await page.fill('input[name="password"]', 'Konyadmin@1');
  console.log('Filled password');
  await page.waitForSelector('button:has-text("Sign In")', { timeout: 30000 });
  await page.click('button:has-text("Sign In")');
  await page.screenshot({ path: 'debug-4-after-login-click.png', fullPage: true });
  console.log('Clicked Sign In');

  // Step 4: Wait for redirect back to app after login
  await page.waitForURL('https://teminfinityqa2.temenos-cloud.net/apps/spotlight/**', { timeout: 60000 });
  await page.waitForLoadState('networkidle', { timeout: 60000 });
  await page.screenshot({ path: 'debug-5-after-login-redirect.png', fullPage: true });
  console.log('Redirected back to app after login');

  // Step 3: Wait for redirect back to app after login
  await page.waitForURL('https://teminfinityqa2.temenos-cloud.net/apps/spotlight/**', { timeout: 60000 });
  await page.waitForLoadState('networkidle', { timeout: 60000 });

  // Step 6: Click on "Contracts" in the left-hand side menu
  await page.click('text=Contracts', { timeout: 20000 });

  // Step 7: Wait for navigation to contracts page
  await page.waitForURL('**/#_frmContractSearch', { timeout: 30000 });

  // Step 8: Verify the label 'SEARCH CONTRACTS BY' is present
  await expect(page.locator('text=SEARCH CONTRACTS BY')).toBeVisible();
});
