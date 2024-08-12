import axios from 'axios';
import Cookies from 'universal-cookie';
import moment from 'moment';
import {CURRENT_HOMEPAGE_VERSION} from '@util/constans';
import {API_URL} from '@util/constans';
import { printLog } from '@util/Utils';
import HttpRequests from '@/utils/HttpRequests';

export const register = async(email: string, password: string) => {
    try{
        printLog(email + " " +  password);
        // const response = await axios.post('/authregister', { email, password });
        const response = await HttpRequests.getInstance().post<{ token: string }>('/auth/register', {email, password});
        printLog(response);
        if (!response ||!response.token ) 
            throw new Error('Registration failed');
        return response.token;
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
        const response = await HttpRequests.getInstance().post<{ token: string }>('/auth/login', {email, password});
        printLog(response);
        if (!response ||!response.token ) 
            throw new Error('Registration failed');
        return response.token;
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

// export const postRefreshToken = async (param?: IUserSession): Promise<any> => {
//     try {
//         if (!param) {
//             throw new Object({response: {status: 404}});
//         }
//         let tokenData = {refreshToken: param.refreshToken};
//         return await axios.post(`${API_URL}/user/v1/token`, tokenData, {
//             headers: {
//                 Authorization: 'Bearer ' + (param.accessToken || ''),
//                 client_version: CURRENT_HOMEPAGE_VERSION,
//                 client_path: param.client_path || '',
//             },
//         });
//     } catch (err) {
//         if (axios.isAxiosError(err)) {  
//             if (err.response) {
//                 throw err.response;  
//             } else {
//                 throw err;
//             }
//         } else {
//             throw new Error('An unknown error occurred');
//         }
//     }
// };