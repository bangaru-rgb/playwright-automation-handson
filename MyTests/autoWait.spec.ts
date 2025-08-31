import playwrightConfig from "../playwright.config";
import { test, expect, Browser, Page, Locator, BrowserContext } from '@playwright/test'
import { constants } from "buffer";
import { register } from "module";
import { chromium, webkit, firefox } from "playwright";
//test.setTimeout(60000);
// there is somthing called actiontimeout:1000 can be placed in palywright config under use functon 
test.use(
  {actionTimeout:10000} // this applicable for all the tests
);

test('login test', async () => {
  const browser: Browser = await chromium.launch({ headless: true, channel: 'chrome' });
  //const browsweContext1:BrowserContext = await browser.newContext();
  const page: Page = await browser.newPage();
  await page.goto("https://classic.freecrm.com/register/");
  page.setDefaultTimeout(60000);
  // though we set acton timeout 10000, still for all the statements in the 'login test' will have onlly 1000 as the timeout.
  //await page.locator("input[name='agreeTerms']").check();

  await page.locator("input[name='agreeTerms']").check({timeout: 5000});



});


