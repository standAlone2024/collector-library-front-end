import { makeAutoObservable } from 'mobx';
import HttpRequests from '@/utils/HttpRequests';

class AuthStore {
    accessToken: string | null = null;

    constructor() {
        makeAutoObservable(this);
        // this.loadToken();
        this.setupTokenListener();
    }

    setToken(accessToken: string) {
        if (typeof window === 'undefined') return;
        this.accessToken = accessToken;
    }

    setupTokenListener() {
        HttpRequests.getInstance().addTokenChangeListener((token) => {
            this.setToken(token || '');
        });
    }

    get isAuthenticated() {
        return !!this.accessToken;
    }
}

const authStore = new AuthStore();
export default authStore;