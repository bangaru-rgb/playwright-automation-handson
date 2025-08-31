import playwrightConfig from "../playwright.config";
import{test, expect, Browser, Page, Locator, BrowserContext } from '@playwright/test'
import { constants } from "buffer";
import {chromium, webkit, firefox} from "playwright";
test('login test', async()=>
{
  const browser:Browser = await chromium.launch({headless: false, channel:'chrome'});
 //broswer context1
  const browserContext1:BrowserContext = await browser.newContext();
   const page1:Page = await browserContext1.newPage()

//browswer1
console.log("Browser context1 is execution initiated.");
await page1.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");

const emailID1:Locator = await page1.locator('#input-email');
const password1:Locator =  await page1.locator('#input-password');
const loginbutton1 = await page1.locator ("[value='Login']");

await emailID1.fill("");
await emailID1.fill("bangarunaidu@gmail.com");
await password1.fill("");
await password1.fill("Test@123");
await loginbutton1.click();
const pagetitle1 = await page1.title();
console.log("The page title is", pagetitle1);
await page1.screenshot({path: 'homepage1.png'});
expect(pagetitle1).toEqual('My Account');
// Edit Account1
//const editAccount1 = await page1.locator ("[Name='Edit Account']");
// const editAccount1 = await page1.getByRole('link', { name: 'Edit your account information' });

// await editAccount1.click();
// const editPageTitle1 = await page1.title();
// console.log("1st Edit account page titile is ", editPageTitle1);
// await page1.screenshot({path: 'editAccountPage1.png'});
// expect(editPageTitle1).toEqual('My Account Information');
// console.log("Browser context1 is execution completed.");

//browser2
//broswer context2

const browserContext2:BrowserContext = await browser.newContext();
   const page2:Page = await browserContext2.newPage()

console.log("Browser context2 is execution intitiated.");
await page2.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
const emailID2:Locator = await page2.locator('#input-email')

const password2:Locator =  await page2.locator('#input-password');
const loginbutton2 = await page2.locator ("[value='Login']");

await emailID2.fill("");
await emailID2.fill("soemthing@gmail.com");
await password2.fill("");
await password2.fill("Test@123");
await loginbutton2.click();
const pagetitle2 = await page2.title();
console.log("The 2nd page title is", pagetitle2);
await page2.screenshot({path: 'homepage2.png'});
expect(pagetitle2).toEqual('My Account');


//Edit Account2

//const editAccount2 = await page2.getByRole('link', { name: 'Edit your account information' });
//await expect(editAccount2).toBeVisible({ timeout: 10000 });

await page2.waitForSelector('text=Edit your account information', { timeout: 10000 });

const editAccount2 = await page2.getByRole('link', { name: 'Edit your account information' });
await expect(editAccount2).toBeVisible();

await Promise.all([
   page2.waitForSelector('h1:has-text("My Account Information")', { timeout: 10000 }),
  editAccount2.click()
]);

//await editAccount2.click();
const editPageTitle2 = await page2.title();
console.log("2nd Edit account page titile is ", editPageTitle2);
await page2.screenshot({path: 'editAccountPage2.png'});
console.log("Captured edit page title:", editPageTitle2);  // Debug log

expect(editPageTitle2).toEqual('My Account Information');
console.log("Assertion passed ✅");
console.log("Browser context2 is execution completed.");

await browserContext1.close();
await browserContext2.close();
//await browser.close();

console.log("This is the last statement of the project");
//await new Promise(resolve => setTimeout(resolve, 5 * 60 * 1000));



});


