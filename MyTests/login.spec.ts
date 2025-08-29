import playwrightConfig from "../playwright.config";
import { test, expect, Browser, Page, Locator, BrowserContext } from '@playwright/test'
import { constants } from "buffer";
import { register } from "module";
import { chromium, webkit, firefox } from "playwright";
test('login test', async () => {
  const browser: Browser = await chromium.launch({ headless: true, channel: 'chrome' });
  //const browsweContext1:BrowserContext = await browser.newContext();
  const page: Page = await browser.newPage()
  await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
  //const MyAccountDropdown: Locator = page.getByRole('combobox', { name: 'My Account' });
  // await page.getByRole('link', { name: ' My Account' }).click();
  // await page.getByRole('link', {name: 'Register'}).click();


  //await MyAccountDropdown.click();



  const emailID:Locator = await page.locator('#input-email');
  const password:Locator =  await page.locator('#input-password');
  const loginbutton = await page.locator ("[value='Login']");  

  await emailID.fill("bangarunaidu@gmail.com");
  await password.fill("Test@123");
  await loginbutton.click();
  const pagetitle = await page.title();
  console.log("The page title is", pagetitle);
  //await page.screenshot({path: 'homepage.png'});
  await expect(page).toHaveScreenshot();
  expect(pagetitle).toEqual('My Account');
  await browser.close();
  console.log("This is the last statement of the project");

})