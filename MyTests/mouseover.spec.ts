import playwrightConfig from "../playwright.config";
import { test, expect, Browser, Page, Locator, BrowserContext } from '@playwright/test'
import { constants } from "buffer";
import { register } from "module";
import { chromium } from "@playwright/test";
import path from "path";


test('dropdownList', async () => {
  const browser: Browser = await chromium.launch({
    headless: false,
    channel: 'chrome'
  });

  //const browsweContext1:BrowserContext = await browser.newContext();
  const page: Page = await browser.newPage();
  await page.goto("https://www.icicibank.com/");
      await page.waitForTimeout(4000);
  await page.getByRole('link', { name: 'Explore Now', exact: true }).click();
    await page.waitForTimeout(4000);

  page.getByText('Resources').first().hover();
  page.getByText('Calculators').first().click();
  await page.waitForTimeout(4000);
  //page.getByText('Tax Payments').first().click;
  page.screenshot({path: 'mousehover.png'});
  await page.waitForTimeout(5000);

});


