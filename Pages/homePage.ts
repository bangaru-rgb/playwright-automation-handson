import { expect, Page } from '@playwright/test';

export class homePage {

  constructor(private page: Page) { }

  async HomepageValidation() {
  const pagetitle = await this.page.title();
  console.log("The page title is", pagetitle);
     await this.page.waitForTimeout(5000);
  
  
  }
 
  }