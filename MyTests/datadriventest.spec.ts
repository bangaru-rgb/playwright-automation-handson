import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { homePage } from '../Pages/homePage';
import userdata from '../Testdata/logindata.json';

test.describe.configure({ mode: 'serial' }); // This step is to run the scripts in sequencal.

for(const LoginCreds of userdata)
{
test(`login using POM_datadrvien for ${LoginCreds.userid}`, async ({ page }) => {

  const loginPage = await new LoginPage(page);
  console.log("Test started at:", new Date().toISOString());
  //console.log("You are calling Login function to enter credentails.");
  await loginPage.launchTheURL();

  const HP_LTP = await loginPage.login(LoginCreds.userid, LoginCreds.password);
  await HP_LTP.HomepageValidation();

});
}