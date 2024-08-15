import Router from 'next/router';
import { makeAutoObservable } from 'mobx';
import { IUser } from '@/apis/models/IUser';
import { IAuth } from '@/apis/models/IAuth';
import HttpRequests from '@/utils/HttpRequests';
import { AUTH_ERROR_CODE } from '@util/constans';

class AuthStore {
    accessToken: string | null = null;
    user: IUser | null = null;
    private listeners: ((token: string | null) => void)[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(token: string | null, user: IUser | null) {
        this.accessToken = token;
        this.user = user;
        this.notifyListeners();
    }

    addListener(listener: (token: string | null) => void) {
        this.listeners.push(listener);
    }

    private notifyListeners() {
        this.listeners.forEach(listener => listener(this.accessToken));
    }

    get isAuthenticated() {
        return !!this.accessToken && !!this.user;
    }

    async refreshToken() {
        try {
            const response = await HttpRequests.getInstance().post<{ auth: IAuth }>('/auth/silent-refresh', {}, {
                withCredentials: true
            });
            const auth = response.auth;
            this.setAuth(auth.token, auth.user);
            return true;
        } catch (error: any) {
            if (error.response?.status === 403 && error.response?.data?.error === AUTH_ERROR_CODE.REFRESH_TOKEN_INVALID) {
                console.error('Refresh token is invalid. Logging out.');
                await this.logout();
            } else {
                console.error('Failed to refresh token:', error);
                this.setAuth(null, null);
            }
            throw new Error('Token refresh failed: ' + error.message);
        }
    }

    async checkAndRefreshAuth() {
        if (!this.isAuthenticated) {
            return await this.refreshToken();
        }
        return true;
    }

    async logout() {
        try {
            await HttpRequests.getInstance().post('/auth/logout', {}, { withCredentials: true });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            this.setAuth(null, null);
            Router.push('/');
        }
    }
}

const authStore = new AuthStore();
export default authStore;