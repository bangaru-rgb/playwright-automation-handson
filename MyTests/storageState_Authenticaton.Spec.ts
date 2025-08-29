import playwrightConfig from "../playwright.config";
import { test, expect, Browser, Page, Locator, BrowserContext } from '@playwright/test'
import { constants } from "buffer";
import { register } from "module";
import { chromium, webkit, firefox } from "playwright";
const authfile = "Testdata/auth.json";

test('login test', async () => {
  const browser: Browser = await chromium.launch({ headless: false, channel: 'chrome' });
 
  const page: Page = await browser.newPage()
  await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
  const emailID:Locator = await page.locator('#input-email');
  const password:Locator =  await page.locator('#input-password');
  const loginbutton = await page.locator ("[value='Login']");  

  await emailID.fill("bangarunaidu@gmail.com");
  await password.fill("Test@123");
  await loginbutton.click();
  //Storing the authentication information in a authfile.
  await page.context().storageState({path: authfile});
  const pagetitle = await page.title();
  console.log("The page title is", pagetitle);
  await page.screenshot({path: 'homepage.png'});
  expect(pagetitle).toEqual('My Account');
  await browser.close();
  console.log("This is the last statement of the project");

});

test('MyAccount test', async ({browser}) => {
  //const browser: Browser = await chromium.launch({ headless: false, channel: 'chrome' });
  const browsweContext1:BrowserContext = await browser.newContext({storageState: authfile});
  const page: Page = await browsweContext1.newPage()
  await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/account");
await page.getByRole('link', { name: 'Edit your account information' }).click();
await page.screenshot({ path: 'Account Info.png' });
  console.log("This is the last statement of MyAccount test");
});