import { test, expect } from '@playwright/test';
import { AuthStateHelper } from '../utils/authStateHelper';

test.describe('Meeting Tests', () => {
    test.describe.configure({ mode: 'serial' });

    test.beforeAll(async ({ request }) => {
        // Ensure we have a valid auth token
        const token = AuthStateHelper.getAuthToken();
        if (!token) {
            // Login and get new token
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

            expect(response.ok()).toBeTruthy();
            await AuthStateHelper.saveAuthState(response);
        }
    });
    test('should create a new meeting', async ({ request }) => {
        const token = AuthStateHelper.getAuthToken();

        // Get current user details
        const userResponse = await request.get(`/auth/users`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        expect(userResponse.ok()).toBeTruthy();
        const userData = await userResponse.json();
        console.log('Current user data:', userData);

        const meetingPayload = {
            title: "Test Meeting",
            description: "Test Description",
            start_time: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
            end_time: new Date(Date.now() + 7200000).toISOString()   // 2 hours from now
        }; console.log('Creating meeting with payload:', meetingPayload);
        const response = await request.post(`/meetings/create`, {
            data: meetingPayload,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok()) {
            const rawResponse = await response.text().catch(() => 'Failed to get response text');
            console.error('Raw response:', rawResponse);
        } if (!response.ok()) {
            const errorBody = await response.text();
            console.error('Meeting creation failed:', {
                status: response.status(),
                statusText: response.statusText(),
                body: errorBody
            });
        }

        expect(response.ok(), `Meeting creation should succeed. Status: ${response.status()}`).toBeTruthy();

        const responseBody = await response.json();
        console.log('Meeting creation response:', responseBody);

        // Check the actual HTTP status rather than a property in the response body
        expect(response.status()).toBe(200);
    });
});