import playwrightConfig from "../playwright.config";
import { test, expect, Browser, Page, Locator, BrowserContext } from '@playwright/test'
import { constants } from "buffer";
import { register } from "module";
import { chromium } from "@playwright/test";


test('dropdownList', async () => {
  const browser: Browser = await chromium.launch({
    headless: false,
    channel: 'chrome'
  });

  //const browsweContext1:BrowserContext = await browser.newContext();
  const page: Page = await browser.newPage();
  await page.goto("https://www.magupdate.co.uk/reader-enquiry/PATI/241");

  const CountryDropDown = 'select#Contact_CountryCode';
  //await page.selectOption(CountryDropDown,{value: 'AD'});
  //await page.selectOption(CountryDropDown,{label: 'India'});
  //await page.selectOption(CountryDropDown,{index: 6});
  const Totalcountries = await page.$$(CountryDropDown + '> Option');
  console.log("total number of dropdown items ", Totalcountries.length);

  for (const i of Totalcountries) {
    const country = await i.textContent();
    console.log(country);
    if (country==='India')
    {
      await page.selectOption(CountryDropDown,{label: 'India' });
    }
  }

  await page.waitForTimeout(5000);

});


