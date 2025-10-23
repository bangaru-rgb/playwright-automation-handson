import { test, expect } from '@playwright/test';
import { AuthStateHelper, AuthResponse } from '../utils/authStateHelper';

test.describe('Authentication Tests', () => {

        test('Login and save auth state', async ({ request }) => {
        const loginPayload = {
            email: 'akashajay.dev@gmail.com',
            password: 'password'
        };

        const response = await request.post(`/auth/signin`, {
            data: loginPayload,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Verify successful login
        expect(response.ok()).toBeTruthy();

        // Parse and validate response
        const responseData = await response.json() as AuthResponse;
        expect(responseData.httpStatusCode).toBe(202); // Assuming 202 is the success code
        expect(responseData.response.access_token).toBeTruthy();
        expect(responseData.response.refresh_token).toBeTruthy();

        // Save auth state
        const savedState = await AuthStateHelper.saveAuthState(response);
        console.log('Auth state saved:', {
            userId: savedState.user.id,
            email: savedState.user.email,
            role: savedState.user.role,
            tokenExpiry: new Date(savedState.expiresAt * 1000).toISOString()
        });

        // Verify saved state
        const storedToken = AuthStateHelper.getAuthToken();
        expect(storedToken).toBe(responseData.response.access_token);
    });

    test('Verify stored auth token', async ({ request }) => {
        const storedToken = AuthStateHelper.getAuthToken();
        if (!storedToken) {
            console.log('No stored token found, skipping test.');
            test.skip();
        }

        // Try to use the stored token
        const response1 = await request.get(`/auth/users`, {
            headers: {
                'Authorization': `Bearer ${storedToken}`,
                'Content-Type': 'application/json'
            }

        });

        expect(response1.ok()).toBeTruthy();

        // Print response details to verify it's working
    const responseBody = await response1.json();
    console.log('API Response with stored token:', {
        status: response1.status(),
        headers: response1.headers(),
        body: responseBody
    });
      console.log('Response Body:', JSON.stringify(responseBody, null, 2));
    
     //console.log('Raw Response:', await response1.text());
    
    });
});