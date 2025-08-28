import { test, expect } from '@playwright/test';

test('Open Temenos Login Page', async ({ page }) => {
    // Launch browser and go to the login page with longer timeout
    await page.goto('https://teminfinityqa2.temenos-cloud.net/apps/spotlight/#_frmLogin', {
        timeout: 60000, // 60 seconds timeout
        waitUntil: 'networkidle' // wait until network is idle
    });
    
    // Take a screenshot of what we see
    await page.screenshot({ path: 'temenos-login.png', fullPage: true });
    
    // Wait for page to be stable
    await page.waitForLoadState('domcontentloaded');
    console.log('Page URL:', page.url());
});
