import { API_BASE_URL, ENDPOINTS, getHeaders } from '../config/api';

interface RegisterData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

interface LoginResponse {
    tokens: {
        access: string;
        refresh: string;
    };
    user: {
        email: string;
        firstName: string;
        lastName: string;
    };
}

interface UserProfile {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
}

class ApiService {
    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || data.detail || 'Something went wrong');
        }

        return data;
    }
    
    // Auth methods
    async login(email: string, password: string): Promise<LoginResponse> {
        return this.request<LoginResponse>(ENDPOINTS.LOGIN, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
    }
    
    async register(data: RegisterData): Promise<LoginResponse> {
        return this.request<LoginResponse>(ENDPOINTS.REGISTER, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async refreshToken(refreshToken: string): Promise<{ token: string }> {
        return this.request<{ token: string }>(ENDPOINTS.TOKEN_REFRESH, {
            method: 'POST',
            body: JSON.stringify({ refresh: refreshToken }),
        });
    }

    async requestPasswordReset(email: string): Promise<void> {
        return this.request(ENDPOINTS.PASSWORD_RESET_REQUEST, {
            method: 'POST',
            body: JSON.stringify({ email }),
        });
    }

    async resetPassword(token: string, newPassword: string): Promise<void> {
        return this.request(ENDPOINTS.PASSWORD_RESET_CONFIRM, {
            method: 'POST',
            body: JSON.stringify({ 
                token, 
                new_password: newPassword 
            }),
        });
    }
    
    // Agent methods
    async getAgents<T>(token: string): Promise<T> {
        return this.request<T>(ENDPOINTS.AGENTS, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    }
    
    async sendMessage<T>(message: string, endpoint: string, token: string): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ message }),
        });
    }
    
    // User methods
    async getUserProfile(token: string): Promise<UserProfile> {
        return this.request<UserProfile>(ENDPOINTS.USER_PROFILE, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    }

    async updateUserProfile(token: string, data: Partial<UserProfile>): Promise<UserProfile> {
        return this.request<UserProfile>(ENDPOINTS.USER_PROFILE, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
    }
}

export const apiService = new ApiService(); 