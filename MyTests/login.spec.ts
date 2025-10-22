import playwrightConfig from "../playwright.config";
import { test, expect, Browser, Page, Locator, BrowserContext, } from "@playwright/test";
import { constants } from "buffer";
import { chromium, webkit, firefox } from "playwright";
import { defineConfig } from "@playwright/test";

// test.use({
//   video: "retain-on-failure",
//   screenshot: "on",
//   trace: "on",
// });

test("login test", async ({ }) => {
  console.log("Welcome to Playwright Automation 🎭");
  console.log("\nthe current dirctory of the test file is: ", __dirname);
  console.log("\nName of the  file is: ", __filename);
  const browser: Browser = await chromium.launch({
    headless: process.env.CI ? true : false, // headless in CI, non-headless locally
    channel: process.env.CI ? undefined : 'chrome' // use default chromium in CI, chrome locally
  });
  //const browsweContext1:BrowserContext = await browser.newContext();
  const page: Page = await browser.newPage()
  await page.goto(
    "https://naveenautomationlabs.com/opencart/index.php?route=account/login"
  );
  //const MyAccountDropdown: Locator = page.getByRole('combobox', { name: 'My Account' });
  // await page.getByRole('link', { name: ' My Account' }).click();
  // await page.getByRole('link', {name: 'Register'}).click();
  //await MyAccountDropdown.click();
  //await page.pause();
  
  const emailID: Locator = await page.locator("#input-email")
    .describe("This is input email field");
  const password: Locator = page.locator("#input-password").describe("This is input password field");
  const loginbutton: Locator = page.locator("[value='Login']").describe("This is login button");
  await emailID.fill("bangarunaidu@gmail.com"); await password.fill("Test@123");
  await loginbutton.click();
  const pagetitle = await page.title();
  console.log("The page title is", pagetitle);
  await page.screenshot({ path: "homepage.png" });
  //  await expect(page).toHaveScreenshot();
  // await page.waitForTimeout(60000);
  //expect(pagetitle).toEqual('My Account');

  //await page.waitForTimeout(10000);
  //await browser.close();
  console.log("This is the last statement of the project");
});
