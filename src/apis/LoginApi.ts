import axios from 'axios';
import Cookies from 'universal-cookie';
import moment from 'moment';
import {CURRENT_HOMEPAGE_VERSION} from '../App';
import {API_URL} from '../utils/constans';

const cookie = new Cookies();

export interface IUserSession {
    isLogin?: boolean;
    accessToken?: string;
    refreshToken?: string;
    client_path?: string;
}

export const postRefreshToken = async (param?: IUserSession): Promise<any> => {
    try {
        if (!param) {
            throw new Object({response: {status: 404}});
        }
        let tokenData = {refreshToken: param.refreshToken};
        return await axios.post(`${API_URL}/user/v1/token`, tokenData, {
            headers: {
                Authorization: 'Bearer ' + (param.accessToken || ''),
                client_version: CURRENT_HOMEPAGE_VERSION,
                client_path: param.client_path || '',
            },
        });
    } catch (err) {
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
};

export const setCookieCSR = (
    param: {fieldName: string; value: any},
    opt?: {expires?: Date; domain?: string; path?: string},
) => {
    let expires = moment().add('1', 'hour').toDate();
    let domain = window.location.hostname;
    let path = '/';
    if (opt && opt.expires) {
        expires = opt.expires;
    }
    if (opt && opt.domain) {
        domain = opt.domain;
    }
    if (opt && opt.path) {
        path = opt.path;
    }
    
    cookie.set(param.fieldName, param.value || '', {
        path: '/',
        expires,
        domain,
        ...opt,
    });
};