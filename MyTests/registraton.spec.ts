import playwrightConfig from "../playwright.config";
import { test, expect, Browser, Page, Locator, BrowserContext } from '@playwright/test'
import { constants } from "buffer";
import { register } from "module";
import { chromium, webkit, firefox } from "playwright";
test('login test', async () => {
    const browser: Browser = await chromium.launch({ headless: false, channel: 'chrome' });
    //const browsweContext1:BrowserContext = await browser.newContext();
    const page: Page = await browser.newPage()
    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
    await page.getByText('My Account').first().click();
    await page.getByText('Register').first().click();
    await page.screenshot({ path: 'registrepage.png' });
    await page.waitForTimeout(5000);
<<<<<<< HEAD
    
=======
>>>>>>> d48ffc25704bd1a1285616b86ee091c1632a56b4
});