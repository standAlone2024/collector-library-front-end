import { makeAutoObservable } from 'mobx';
// import { login } from '../apis/LoginApi';

class AuthStore {
    token: string | null = null;
    message: string | null = null;

    constructor() {
        makeAutoObservable(this);
        this.loadToken();
    }

    setToken(token: string) {
        if (typeof window === 'undefined')
            return;
        this.token = token;
        localStorage.setItem('token', token);
    }

    loadToken() {
        if (typeof window === 'undefined')
            return;
        const token = localStorage.getItem('token');
        if (token) {
            this.token = token;
        }
    }

    // async fetchToken() {
    //     // API 호출 예시 (실제 API URL과 메서드를 사용하세요)
    //     const data = await login('aeca@naver.com', '1234');
    //     console.log('token: ' + data.token);
    //     if(data)
    //     {
    //         this.setToken(data.token);
    //         console.log('set token');
    //     }
    //     else
    //         console.error('Failed to fetch token');
    // }

    get isAuthenticated() {
        return !!this.token;
    }
}

const authStore = new AuthStore();
export default authStore;