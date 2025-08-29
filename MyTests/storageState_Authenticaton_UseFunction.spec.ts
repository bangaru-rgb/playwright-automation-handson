import playwrightConfig from "../playwright.config";
import { test, expect, Browser, Page, Locator, BrowserContext } from '@playwright/test'
import { constants } from "buffer";
import { register } from "module";
import { chromium, webkit, firefox } from "playwright";
const authfile = "Testdata/auth.json";

//use: {storageState: authfile}; this can be used in playwright.config.ts
test.skip('login test', async () => {
  const browser: Browser = await chromium.launch({ headless: false, channel: 'chrome' });

  const page: Page = await browser.newPage()
  await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
  const emailID: Locator = await page.locator('#input-email');
  const password: Locator = await page.locator('#input-password');
  const loginbutton = await page.locator("[value='Login']");

  await emailID.fill("bangarunaidu@gmail.com");
  await password.fill("Test@123");
  await loginbutton.click();
  //Storing the authentication information in a authfile.
  await page.context().storageState({ path: authfile });
  const pagetitle = await page.title();
  console.log("The page title is", pagetitle);
  await page.screenshot({ path: 'homepage.png' });
  expect(pagetitle).toEqual('My Account');
  await browser.close();
  console.log("This is the last statement of the project");

});
test.use({ storageState: authfile });
// the above statement means, all the tests in this page can use this authfile. if you want only the below test has too use this auth file  then you have  to use the below code.
// test.describe('Authenticated tests', () => {
//   test.use({ storageState: authfile });

//   test('MyAccount test', async ({ page }) => {
//     // logged in
//   });
// });

test('MyAccount test', async ({ page }) => {
  //const browser: Browser = await chromium.launch({ headless: false, channel: 'chrome' });
  // const browsweContext1:BrowserContext = await browser.newContext({storageState: authfile});
  // const page: Page = await browsweContext1.newPage()
  console.log ("We are in my account test ok");
  await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/account");
  await page.getByRole('link', { name: 'Edit your account information' }).click();
  await page.screenshot({ path: 'Account Info.png' });
  console.log("This is the last statement of MyAccount test");
});