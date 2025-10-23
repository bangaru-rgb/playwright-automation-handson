import { test, expect } from '@playwright/test';

test.describe('Login API Tests', () => {
    const baseURL = 'https://naveenautomationlabs.com/opencart/index.php';

    test('Login via API', async ({ request }) => {
        // First get the login page to capture any necessary tokens/cookies
        const getLoginPage = await request.get(`${baseURL}?route=account/login`);
        expect(getLoginPage.ok()).toBeTruthy();

        // Extract any CSRF token if present in the response
        const loginPageHtml = await getLoginPage.text();
        const csrfMatch = loginPageHtml.match(/name="csrf_token" value="([^"]+)"/);
        const csrfToken = csrfMatch ? csrfMatch[1] : '';

        // Prepare login data
        const loginData = {
            email: 'bangarunaidu@gmail.com',  // Replace with your test email
            password: 'Test@123',             // Replace with your test password
            redirect: 'account/account',
            csrf_token: csrfToken
        };

        // Make the login request
        const loginResponse = await request.post(`${baseURL}?route=account/login`, {
            form: loginData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        // Verify successful login
        expect(loginResponse.ok()).toBeTruthy();

        // Additional verifications
        const responseUrl = loginResponse.url();
        expect(responseUrl).toContain('account/account');

        // Get account page to verify login state
        const accountPage = await request.get(`${baseURL}?route=account/account`);
        const accountPageHtml = await accountPage.text();

        // Verify we're logged in by checking for typical logged-in elements
        expect(accountPageHtml).toContain('My Account');
        expect(accountPageHtml).toContain('Logout');

        console.log('Login API Test completed successfully');
    });

    test('Login with invalid credentials', async ({ request }) => {
        // Prepare invalid login data
        const invalidLoginData = {
            email: 'invalid@email.com',
            password: 'wrongpassword',
            redirect: 'account/account'
        };

        // Make the login request
        const loginResponse = await request.post(`${baseURL}?route=account/login`, {
            form: invalidLoginData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        // Verify response
        expect(loginResponse.ok()).toBeTruthy(); // The request itself should succeed
        const responseHtml = await loginResponse.text();
        expect(responseHtml).toContain('Warning: No match for E-Mail Address and/or Password');
    });

    test('Login API response structure', async ({ request }) => {
        // Get the login page first
        const getLoginPage = await request.get(`${baseURL}?route=account/login`);
        expect(getLoginPage.status()).toBe(200);

        // Verify response headers
        const headers = getLoginPage.headers();
        expect(headers['content-type']).toContain('text/html');

        // Verify security headers if present
        if (headers['x-frame-options']) {
            expect(headers['x-frame-options']).toBeTruthy();
        }

        // Log response details for debugging
        console.log('Response Status:', getLoginPage.status());
        console.log('Content-Type:', headers['content-type']);
    });
});