import playwrightConfig from "../playwright.config";
import { test, expect, Browser, Page, Locator, BrowserContext } from '@playwright/test'
import { get, request } from "http";
import { chromium, webkit, firefox } from "playwright";

test('API Get request', async ({ request }) => {

    //this is the url: https://demo.playwright.dev/api-mocking/
    const response = await request.get('https://demo.playwright.dev/api-mocking/api/v1/fruits');
    const responseObject = await response.json();
    console.log("response of the Get request is ", responseObject);
    expect(responseObject[0].name).toEqual('Strawberry');
    expect(responseObject[1].id).toEqual(1);
    expect(responseObject.length).toBe(17);

});


test('API Post request', async ({ request }) => {

    //this is the url: https://demo.playwright.dev/api-mocking/
    const response = await request.post('https://naveenautomationlabs.com/opencart/index.php?route=account/register',

        {
            // headers: {
            //     origin: 'https://naveenautomationlabs.com',
            //     referer: 'https://naveenautomationlabs.com/opencart/index.php?route=account/registe'

            // },

            form: {
                customer_group_id: "1",
                firstname: "sdgfsdf",
                lastname: "sdfgsdf",
                email: "test2@adds.com",
                telephone: "98769876",
                password: "Test@123",
                confirm: "Test@123",
                newsletter: "0",
                agree: "1"
            }
        }
    );

    console.log("Status Code: ", response.status());

    const responseObject = await response.text();
    console.log("response of the Get request is ", responseObject);


});


