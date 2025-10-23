import { test, expect } from '@playwright/test';
import { AuthStateHelper } from '../utils/authStateHelper';

test.describe('SIP Group Tests', () => {
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

    test('should create a new SIP group', async ({ request }) => {
        const token = AuthStateHelper.getAuthToken();

        const sipGroupPayload = {
            group_name: "Test SIP Group",
            description: "Test group for API validation",
            group_id: "test_group_" + Date.now(), // Unique identifier for the group
            extension: "1000", // Default extension number
            sip_group_type: "internal", // internal or external
            participants: [] as string[]  // We'll get the user's ID and add it here
        };

        // First, get the current user's ID
        const userResponse = await request.get(`/auth/users`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        expect(userResponse.ok()).toBeTruthy();
        const userData = await userResponse.json();
        console.log('User data:', userData);

        // Add the current user as a participant
        if (userData.response?.id) {
            sipGroupPayload.participants.push(userData.response.id);
        }

        console.log('Creating SIP group with payload:', sipGroupPayload);

        const response = await request.post(`/calls/sip-groups/create/`, {
            data: sipGroupPayload,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok()) {
            const errorBody = await response.text();
            console.error('SIP group creation failed:', {
                status: response.status(),
                statusText: response.statusText(),
                body: errorBody
            });
        }

        expect(response.ok(), `SIP group creation should succeed. Status: ${response.status()}`).toBeTruthy();

        const responseBody = await response.json();
        console.log('SIP group creation response:', responseBody);

        // Verify the response
        expect(response.status()).toBe(200);
        expect(responseBody.response?.id).toBeTruthy();
    });
});