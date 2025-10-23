import { test, expect } from '@playwright/test';

test('login test', async ({ page }) => {
    await test.step('Open login page', async () => {
        await page.goto('https://example.com/login');
    });
    await test.step('Enter credentials', async () => {
        await page.fill('#username', 'user');
        await page.fill('#password', 'pass');
    });
    await test.step('Click login and verify', async () => {
        await page.click('#loginBtn');
        await expect(page).toHaveURL('https://example.com/home');
    });
});
