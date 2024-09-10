import axios from 'axios';
import { printLog } from '@util/Utils';
import HttpRequests from '@util/HttpRequests';
import { authStore } from '@store';
import { ROLE } from "@util/constans";

export const register = async(email: string, password: string) => {
    try{
        printLog(email + " " +  password);
        const response = await HttpRequests.getInstance().post<{ auth: IAuth }>('/auth/register', {email, password});
        printLog(response);
        if (!response ||!response.auth) 
            throw new Error('Registration failed');
        return response.auth;
    }catch (err) {
        if (axios.isAxiosError(err)) {  
            if (err.response) {
                throw err.response;  
            } else {
                throw err;
            }
        } else {
            printLog(err);
            throw new Error('An unknown error occurred');
        }
    }
}

export const login = async(email: string, password: string) => {
    printLog(email + " " +  password);
    try{
        // printLog(API_URL);
        const response = await HttpRequests.getInstance().post<{ auth: IAuth }>('/auth/login', {email, password});
        printLog(response);
        if (!response ||!response.auth) 
            throw new Error('Registration failed');
        authStore.setAuth(response.auth.token, response.auth.user);
        return response.auth;
    }catch (err) {
        if (axios.isAxiosError(err)) {  
            if (err.response) {
                throw err.response;  
            } else {
                throw err;
            }
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}

export interface IUser {
    id?: number;
    role: ROLE;
    email: string;
    password: string;
    name?: string;
    phone?: string;
    date: Date;
}

export interface IAuth {
    token: string,
    user: IUser
}