import { request } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

export class APIHelper {
    private static envConfig: any;
    private static authToken: string;

    static async init(environment: string = process.env.TEST_ENV || 'dev') {
        // Load environment configuration
        const configPath = path.join(__dirname, '..', 'config', 'environments.json');
        const envData = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        this.envConfig = envData[environment];

        if (!this.envConfig) {
            throw new Error(`Environment ${environment} not found in configuration`);
        }
    }

    static getBaseUrl(): string {
        return this.envConfig.baseUrl;
    }

    static setAuthToken(token: string) {
        this.authToken = token;
        this.envConfig.auth.token = token;
    }

    static getAuthToken(): string {
        return this.authToken;
    }

    static getHeaders() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.authToken}`
        };
    }

    // Save updated configuration (e.g., after getting new token)
    static async updateConfig() {
        const configPath = path.join(__dirname, '..', 'config', 'environments.json');
        const allConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        allConfig[process.env.TEST_ENV || 'dev'] = this.envConfig;
        fs.writeFileSync(configPath, JSON.stringify(allConfig, null, 2));
    }
}