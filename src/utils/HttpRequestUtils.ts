import axios from 'axios';
import Cookie from 'universal-cookie';
import {setCookieCSR, postRefreshToken, IUserSession} from '../apis/LoginApi';
import {API_URL} from './constans';
import {CURRENT_HOMEPAGE_VERSION} from '../App';

const cookies = new Cookie();

export const httpGetRequests = async <T>(pathname: string, session?: IUserSession): Promise<T> => {
    if (!session) session = getUserCookies();
    try {
        const {data} = await axios.get(`${API_URL}${pathname}`, {
            headers: getDefaultHeader(session),
            timeout: 10000,
        });
        return data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            if (err.response) {
                if (err.response.status === 412) {
                    let {data, status} = await postRefreshToken(session);
                    setUserCookies(status, data);
                    return httpGetRequests(pathname, {...session, accessToken: data.accessToken});
                }
                else
                    throw err.response;  
            } else {
                throw err;
            }
        } else {
            throw new Error('An unknown get error occurred');
        }
    }
};

export const httpPostRequest = async <T>(pathname: string, param: any, session?: IUserSession): Promise<T> => {
    if (!session) session = getUserCookies();
    try {
        return await axios.post(`${API_URL}${pathname}`, param, {
            headers: getDefaultHeader(session),
            timeout: 10000,
        });
    } catch (err) {
        if (axios.isAxiosError(err)) {
            if (err.response) {
                if (err.response.status === 412) {
                    let {status, data} = await postRefreshToken(session);
                    setUserCookies(status, data);
                    return httpPostRequest(pathname, param, {...session, accessToken: data.accessToken});
                }
                else
                    throw err.response;  
            } else {
                throw err;
            }
        } else {
            throw new Error('An unknown Post error occurred');
        }
    }
};

export const httpPatchRequest = async <T>(pathname: string, param: any,session?: IUserSession): Promise<T> => {
    if (!session) session = getUserCookies();
    try {
        const {data} = await axios.patch(`${API_URL}${pathname}`, param, {
            headers: getDefaultHeader(session),
            timeout: 10000,
        });
        return data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            if (err.response) {
                if (err.response.status === 412) {
                    let {status, data} = await postRefreshToken(session);
                    setUserCookies(status, data);
                    return httpPatchRequest(pathname, param, {...session, accessToken: data.accessToken});
                }
                else
                    throw err.response;  
            } else {
                throw err;
            }
        } else {
            throw new Error('An unknown Post error occurred');
        }
    }
};

export const httpPutRequest = async <T>(pathname: string, param: any, session?: IUserSession): Promise<T> => {
    if (!session) session = getUserCookies();
    try {
        const {data} = await axios.put(`${API_URL}${pathname}`, param, {
            headers: getDefaultHeader(session),
            timeout: 10000,
        });
        return data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            if (err.response) {
                if (err.response.status === 412) {
                    let {status, data} = await postRefreshToken(session);
                    setUserCookies(status, data);
                    return httpPutRequest(pathname, param, {...session, accessToken: data.accessToken});
                }
                else
                    throw err.response;  
            } else {
                throw err;
            }
        } else {
            throw new Error('An unknown Put error occurred');
        }
    }
};

export const httpDeleteRequest = async <T>(pathname: string, session?: IUserSession): Promise<T> => {
    if (!session) session = getUserCookies();
    try {
        const {data} = await axios.delete(`${API_URL}${pathname}`, {
            headers: getDefaultHeader(session),
            timeout: 10000,
        });
        return data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            if (err.response) {
                if (err.response.status === 412) {
                    let {status, data} = await postRefreshToken(session);
                    setUserCookies(status, data);
                    return httpDeleteRequest(pathname, {...session, accessToken: data.accessToken});
                }
                else
                    throw err.response;  
            } else {
                throw err;
            }
        } else {
            throw new Error('An unknown Delete error occurred');
        }
    }
};



export const getUserCookies = (): IUserSession => {
    return {
        accessToken: cookies.get('accessToken') || '',
        refreshToken: cookies.get('refreshToken') || '',
    };
};

export const setUserCookies = (status: number, session: IUserSession): void => {
    setCookieCSR({fieldName: 'accessToken', value: session.accessToken});
    if (status !== 208) {
        setCookieCSR({fieldName: 'refreshToken', value: session.refreshToken});
    }
};

const getDefaultHeader = (session: IUserSession) => {
    let obj = {client_path: window.location.pathname};
    // if (!IS_SERVER) {
    //     obj = {client_path: window.location.pathname || ''};
    return {
        Authorization: 'Bearer ' + (session.accessToken || ''),
        client_version: CURRENT_HOMEPAGE_VERSION,
        ...obj,
    };
};
