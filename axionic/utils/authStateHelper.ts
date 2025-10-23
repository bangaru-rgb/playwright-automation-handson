import { APIResponse } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

export interface AuthResponse {
    httpStatusCode: number;
    message: string;
    response: {
        access_token: string;
        token_type: string;
        expires_in: number;
        expires_at: number;
        refresh_token: string;
        user: {
            id: string;
            email: string;
            role: string;
        }
    }
}

export class AuthStateHelper {
    private static readonly authStateFile = path.join(__dirname, '..', 'state', 'auth.json');

    static async saveAuthState(response: APIResponse) {
        const authData = await response.json() as AuthResponse;

        // Ensure directory exists
        const stateDir = path.dirname(this.authStateFile);
        if (!fs.existsSync(stateDir)) {
            fs.mkdirSync(stateDir, { recursive: true });
        }

        // Save auth state
        const stateToSave = {
            token: authData.response.access_token,
            refreshToken: authData.response.refresh_token,
            expiresAt: authData.response.expires_at,
            user: authData.response.user
        };

        fs.writeFileSync(this.authStateFile, JSON.stringify(stateToSave, null, 2));
        return stateToSave;
    }

    static getAuthState() {
        if (!fs.existsSync(this.authStateFile)) {
            return null;
        }
        return JSON.parse(fs.readFileSync(this.authStateFile, 'utf8'));
    }

    static getAuthToken() {
        const state = this.getAuthState();
        return state?.token;
    }

    static clearAuthState() {
        if (fs.existsSync(this.authStateFile)) {
            fs.unlinkSync(this.authStateFile);
        }
    }
}