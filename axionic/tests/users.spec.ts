import { test, expect } from '@playwright/test';
import { AuthStateHelper } from '../utils/authStateHelper';

test.describe('User Profile Tests', () => {
    const baseUrl = process.env.TEST_ENV === 'staging'
        ? 'https://wapis.discretal.com'
        : 'https://wapi.discretal.com';

    test('should get user profile', async ({ request }) => {
        const token = AuthStateHelper.getAuthToken();
        expect(token, 'Auth token is required. Run auth tests first.').toBeTruthy();

        const response = await request.get(`${baseUrl}/auth/users`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        expect(response.ok()).toBeTruthy();
        const responseBody = await response.json();
        expect(responseBody.httpStatusCode).toBe(200);
    });
});