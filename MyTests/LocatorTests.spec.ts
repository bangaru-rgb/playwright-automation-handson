import { test, expect, chromium, Browser, Page, Locator } from '@playwright/test';
test('locator test', async () => {
  console.log("The sample test is running");
 const browser:Browser = await chromium.launch({headless: false, channel:'chrome'});
 const page:Page = await browser.newPage();
await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');
const pagetitle = await page.title();
console.log ("The registation page title is:", pagetitle);
expect(pagetitle).toEqual ("Register Account");

// CSS locator test

const Fname: Locator = page.locator('id=input-firstname');
await Fname.fill("");
await Fname.fill("Fname1");

// Class selector
//const logo:Locator = page.locator('[class="img-responsive"]');
const logo:Locator = page.locator('.img-responsive');
 const LogoExist = await logo.isVisible();
console.log("The logo is visible", LogoExist);

// name selector

const header: Locator = page.locator('text=Register Account');
const headerexist = await header.isVisible();
console.log("The header is visible", headerexist);

const continueButton:Locator = page.locator('text=Continue');
const continueButtonExist = await continueButton.isVisible();
console.log("The continue is visible", continueButtonExist);

const Frgtpwd:Locator = page.locator('text=Forgotten Password');
const FrgtpwdExist = await Frgtpwd.isVisible();
console.log("The forget password is visible", FrgtpwdExist);


// CSS selecor  
// no need to mention CSS in the locator, but prefer to mention CSS.
const email:Locator = page.locator('css=input#input-email');
//const email:Locator = page.locator('css=input[id="input-email"]'); # this also works
await email.fill("abcd@mainModule.com")
console.log("The emal is entered");

const pnumber:Locator = page.locator('css=input[name="email"]');
await pnumber.fill("7698765");
console.log("The phone number is entered");

const privacycheckbox:Locator = page.locator('css=input[name="agree"]');
await privacycheckbox.click();
console.log("The privacy checkbox is clicked ");

//XPath
const pwd:Locator = page.locator('xpath=//input[@name="password"]');
await pwd.fill("Test@123");
console.log("The Paswowrd entered ");

const search:Locator = page.locator('xpath=//input[@type="text" and @placeholder="Search"]');
await search.fill("sometext");
console.log("searh text is entered ");

//input[@type="text" and @placeholder="Search"]


// get by Role

await expect(page.getByRole('heading',{name: 'Register Account'})).toBeVisible();
await expect(page.getByRole('radio',{name: 'Yes'})).toBeVisible();
await page.getByRole('radio',{name: 'Yes'}).click();
await expect(page.getByRole('link',{name: 'Forgotten Password'})).toBeVisible();
await page.getByRole('link',{name:'Forgotten Password'}).click();

await expect(page.getByRole('link',{name: 'Forgotten Password'})).toBeVisible();

//await browser.close();
console.log("This is the last statement of the project");
//await new Promise(resolve => setTimeout(resolve, 3 * 60 * 1000));
await page.waitForTimeout(5000);


});