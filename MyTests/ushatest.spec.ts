import playwrightConfig from "../playwright.config";
import{test, expect, Browser, Page, Locator, BrowserContext } from '@playwright/test'
import { constants } from "buffer";
import {chromium, webkit, firefox} from "playwright";


test('login test', async () => {
  const browser: Browser = await chromium.launch({ headless: false, channel: 'chrome' });
  const page: Page = await browser.newPage();

  const Username: Locator = page.locator('input[name="email"]');
  await Username.fill('');
  await page.waitForTimeout(5000);

  await browser.close();
});