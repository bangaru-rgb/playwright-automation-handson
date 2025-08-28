import playwrightConfig from "../playwright.config";
import { test, expect, Browser, Page, Locator, BrowserContext } from '@playwright/test'
import { request } from "http";
import { chromium, webkit, firefox } from "playwright";

test('API monitoring', async () => {
  const browser: Browser = await chromium.launch({ headless: true, channel: 'chrome' });
  //const browsweContext1:BrowserContext = await browser.newContext();
  const page: Page = await browser.newPage();
  page.on("request",(request)=> {

    console.log("Reqeusted url  is ", request.url());
     console.log("Reqeusted method  is ", request.method());
    console.log("Reqeusted header  is ", request.headers());

  });
  page.on("response",(response)=> {

    console.log("Response status is ", response.status());
    console.log("Response body ", response.body());

  });
  await page.goto("https://demo.playwright.dev/api-mocking/");
});
