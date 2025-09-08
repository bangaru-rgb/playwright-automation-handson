import { test, expect } from '@playwright/test';

// Utility to generate random data
function generateRandomData() {
    const timestamp = new Date().getTime();
    return {
        firstName: `Test${timestamp}`,
        lastName: 'User',
        email: `testuser${timestamp}@example.com`,
        telephone: '1234567890',
        password: `Test@${timestamp}`
    };
}

test('Register new user', async ({ page }) => {
    // Store generated data to use in form and print later
    const userData = generateRandomData();

    // Navigate to the login page
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
    
    // Click My Account and then Register
    await page.click('a[title="My Account"]');
    await page.click('a:has-text("Register")');

    // Wait for registration form
    await expect(page.locator('#content h1')).toHaveText('Register Account');

    // Fill in registration form
    await page.fill('input#input-firstname', userData.firstName);
    await page.fill('input#input-lastname', userData.lastName);
    await page.fill('input#input-email', userData.email);
    await page.fill('input#input-telephone', userData.telephone);
    await page.fill('input#input-password', userData.password);
    await page.fill('input#input-confirm', userData.password);

    // Accept privacy policy
    await page.check('input[type="checkbox"][name="agree"]');

    // Print credentials before submitting
    console.log('Registration Details:');
    console.log('Email:', userData.email);
    console.log('Password:', userData.password);

    // Click Continue to submit the form
    await page.click('input[type="submit"][value="Continue"]');

    // Verify successful registration
    await expect(page.locator('#content h1')).toHaveText('Your Account Has Been Created!');
});
