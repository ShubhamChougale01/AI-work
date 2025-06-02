// API Configuration
export const API_BASE_URL = 'http://localhost:8000/api/agents';

// API Endpoints
export const ENDPOINTS = {
    // Auth endpoints
    LOGIN: '/auth/login/',
    REGISTER: '/auth/register/',
    PASSWORD_RESET_REQUEST: '/auth/password/reset/',
    PASSWORD_RESET_CONFIRM: '/auth/password/reset/confirm/',
    TOKEN_REFRESH: '/auth/token/refresh/',
    
    // Agent endpoints
    MEMORY: '/memory/',
    GOALS: '/goals/',
    REMINDERS: '/reminders/',
    
    // User endpoints
    USER_PROFILE: '/users/profile/',
};

// Request headers
export const getHeaders = (token?: string) => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
}; 