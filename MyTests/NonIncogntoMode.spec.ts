import playwrightConfig from "../playwright.config";
import { test, expect, Browser, Page, Locator, BrowserContext, chromium } from '@playwright/test'
import { constants } from "buffer";
//import {chromium, webkit, firefox} from 'playwright';
import { log } from 'console';
import { Channel } from "diagnostics_channel";
test('Non Incognito', async () => {

    // const browser:Browser = await chromium.launch({headless: false, channel:'chrome'});
    //  const page:Page = await browser.newPage();
    // await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');

    const browser: BrowserContext = await chromium.launchPersistentContext ('./session', 
        { 
            headless: false, 
            channel: 'chrome' 
        }    );

    // const page:Page= await browser.newPage();
    // await page.goto("https://naveenautomationlabs.com/opencart/index.php");

    const pages: Page[] = await browser.pages();
    const page0 = pages[0];
    //const page0 = await browser.newPage();
    await page0.goto("https://naveenautomationlabs.com/opencart/index.php");

    // expect (page.locator('.img-responsive')).toBeVisible();
    //const logo:Locator = page.locator('.img-responsive');
    //const LogoExist = await logo.isVisible();
    await expect(page0.getByRole('img', { name: 'naveenopencart' })).toBeVisible();
    //console.log("The logo is visible", LogoExist);
    page0.screenshot({ path: 'homepage.png' });

    await page0.waitForTimeout(5000);

    //const page1 =pages[1];
    const page1 = await browser.newPage();
    await page1.goto("https://www.google.com/");
    //await page0.waitForTimeout(5000);
    await page1.waitForTimeout(5000);

});
