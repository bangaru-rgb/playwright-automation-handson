// loginTest.spec.ts
import { test, expect, chromium, Page } from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage';
//import { homePage } from '../../Pages/homePage';

test('login using POM', async ({ page }) => {

  const loginPage = new LoginPage(page);
  console.log("Test started at:", new Date().toISOString());
  //console.log("You are calling Login function to enter credentails.");
  await loginPage.launchTheURL();


  const HP_LTP = await loginPage.login('bangarunaidu@gmail.com', 'Test@123');
  await HP_LTP.HomepageValidation();

});