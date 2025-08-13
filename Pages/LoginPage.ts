import playwrightConfig from "../playwright.config";
import { test, expect, Browser, Page, Locator, BrowserContext } from '@playwright/test'
import { constants } from "buffer";
import { register } from "module";
import { chromium, webkit, firefox } from "playwright";
import { homePage } from '../Pages/homePage';
import { error } from "console";

export class LoginPage {

  constructor(private page: Page) { }

  async launchTheURL() {
   
    console.log("Page is launching, hang on!!!")
    await this.page.goto("./index.php?route=account/login");

    await this.page.screenshot({path: 'Landingpage.png'});


  }

  async login(username: string, password: string) {
    console.log("You are about to enter login ID and password.");
    await this.page.locator('#input-email').fill(username);
    await this.page.locator('#input-password').fill(password);
      await this.page.screenshot({path: 'AfterEnteringCredentials.png'});
    try{
    await this.page.locator('input[type="submit"]').click();
    }
    catch(error){
      console.error("Error @ clicking submit button");
      throw error;
    };
    console.log("It just clicked on Submit button.")
    
     const hp = new homePage(this.page);
     return hp;
     }
   
}


