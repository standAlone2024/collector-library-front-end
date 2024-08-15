import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { API_URL, CURRENT_HOMEPAGE_VERSION, AUTH_ERROR_CODE } from '@util/constans';
import authStore from '@/stores/authStore';

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
    const response = await this.axiosInstance.post<T>(path, data, config);
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