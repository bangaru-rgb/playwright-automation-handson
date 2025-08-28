import { test, expect, request } from '@playwright/test';
import fs from 'fs';

// Utility to generate a random email for registration
function getRandomEmail() {
  const rand = Math.random().toString(36).substring(2, 10);
  return `testuser_${rand}@example.com`;
}

test('Register a new user via API', async ({ request }) => {
  // Read registration data from JSON file
  const data = JSON.parse(fs.readFileSync('c:/PlaywrightDemo/Testdata/registrationdata.json', 'utf-8'));
  const email = getRandomEmail();
  const registrationData = { ...data, email };
  console.log('Registering with email:', email);

  // Send POST request to registration endpoint
  const response = await request.post(
    'https://naveenautomationlabs.com/opencart/index.php?route=account/register',
    {
      form: registrationData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  // Expect a redirect or success message in the response
  expect(response.status()).toBeGreaterThanOrEqual(200);
  expect(response.status()).toBeLessThan(400);
  const body = await response.text();
  //console.log('Response body:', body);
  expect(body).toContain('Your Account Has Been Created!');
});
