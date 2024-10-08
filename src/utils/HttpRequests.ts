import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { API_URL, CURRENT_HOMEPAGE_VERSION, AUTH_ERROR_CODE } from '@util/constans';
import { authStore } from '@store';

class HttpRequests {
  private static instance: HttpRequests;
  private axiosInstance: AxiosInstance;
  private accessToken: string | null = null;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'X-Client-Version': CURRENT_HOMEPAGE_VERSION,
      },
      withCredentials: true,
    });

    this.setupInterceptors();
    this.setupAuthStoreListener();
  }

  public static getInstance(): HttpRequests {
    if (!HttpRequests.instance) {
      HttpRequests.instance = new HttpRequests();
    }
    return HttpRequests.instance;
  }

  private setupAuthStoreListener() {
    authStore.addListener((token) => {
      this.accessToken = token;
    });
  }

  private setupInterceptors(): void {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers['Authorization'] = `Bearer ${this.accessToken}`;
        }
        config.headers['X-Client-Version'] = CURRENT_HOMEPAGE_VERSION;
        
        // FormData인 경우에만 Content-Type을 설정하지 않음
        if (config.data instanceof FormData) {
          delete config.headers['Content-Type'];
        }else if (!config.headers['Content-Type']) {
          config.headers['Content-Type'] = 'application/json';
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401
          && (error.response?.data?.error === AUTH_ERROR_CODE.REFRESH_TOKEN_MISSING 
            || error.response?.data?.error === AUTH_ERROR_CODE.ACCESS_TOKEN_MISSING)
        ) {
          await authStore.logout();
          return Promise.reject(error);
        }
        if (error.response?.status === 403 
          && error.response?.data?.error === AUTH_ERROR_CODE.ACCESS_TOKEN_INVALID 
          && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            await authStore.refreshToken();
            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            await authStore.logout();
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  public async get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(path, config);
    return response.data;
  }

  public async post<T>(path: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    let finalConfig: AxiosRequestConfig = { 
      ...config,
      headers: { ...config?.headers }  // config.headers가 undefined일 경우를 대비
    };
  
    if (data instanceof FormData) {
      // FormData의 경우 Content-Type을 설정하지 않음 (브라우저가 자동으로 설정)
      if (finalConfig.headers) {
        delete finalConfig.headers['Content-Type'];
      }
    } else {
      // FormData가 아닌 경우, Content-Type이 설정되지 않았다면 기본값 설정
      finalConfig.headers = finalConfig.headers || {};
      if (!finalConfig.headers['Content-Type']) {
        finalConfig.headers['Content-Type'] = 'application/json';
      }
    }
    const response = await this.axiosInstance.post<T>(path, data, finalConfig);
    return response.data;
  }

  public async put<T>(path: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.put<T>(path, data, config);
    return response.data;
  }

  public async delete<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(path, config);
    return response.data;
  }

  public async patch<T>(path: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.patch<T>(path, data, config);
    return response.data;
  }
}

export default HttpRequests;