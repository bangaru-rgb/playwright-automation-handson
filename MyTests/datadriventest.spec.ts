// loginTest.spec.ts
import { test, expect, chromium, Page } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { homePage } from '../Pages/homePage';
import cdata from '../Testdata/logindata.json';

for(const LoginCreds of cdata)
{
test('login using POM_datadrvien for ${LoginCreds.userid}', async ({ page }) => {

  const loginPage = new LoginPage(page);
  console.log("Test started at:", new Date().toISOString());
  //console.log("You are calling Login function to enter credentails.");
  await loginPage.launchTheURL();


  const HP_LTP = await loginPage.login('bangarunaidu@gmail.com', 'Job@2022');
  await HP_LTP.HomepageValidation();


})
};