import playwrightConfig from "../playwright.config";
import { test, expect, Browser, Page, Locator, BrowserContext } from '@playwright/test'
import { constants } from "buffer";
import { register } from "module";
import { chromium, webkit, firefox } from "playwright";

test.use(
  {actionTimeout:10000}
);

test('login test', async () => {
  const browser: Browser = await chromium.launch({ headless: true, channel: 'chrome' });
  //const browsweContext1:BrowserContext = await browser.newContext();
  const page: Page = await browser.newPage();
  await page.goto("https://classic.freecrm.com/register/");
  page.setDefaultTimeout(15000);

  //await page.locator("input[name='agreeTerms']").check();

  await page.locator("input[name='agreeTerms']").check({timeout: 5000});



});


