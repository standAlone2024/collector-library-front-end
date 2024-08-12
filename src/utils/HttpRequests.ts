import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import Router from 'next/router';
import {API_URL, CURRENT_HOMEPAGE_VERSION} from '@util/constans';

class HttpRequests {
  private static instance: HttpRequests;
  private axiosInstance: AxiosInstance;
  private accessToken: string | null = null;
  private tokenChangeListeners: ((token: string | null) => void)[] = [];

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'X-Client-Version': CURRENT_HOMEPAGE_VERSION,
      },
      withCredentials: true, // 쿠키를 포함하여 요청을 보내도록 설정
    });

    this.setupInterceptors();
  }

  public static getInstance(): HttpRequests {
    if (!HttpRequests.instance) {
      HttpRequests.instance = new HttpRequests();
    }
    return HttpRequests.instance;
  }

  public addTokenChangeListener(listener: (token: string | null) => void) {
    this.tokenChangeListeners.push(listener);
  }

  private notifyTokenChange(token: string | null) {
    this.tokenChangeListeners.forEach(listener => listener(token));
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
        if (error.response?.status === 401) {
          try {
            await this.refreshToken('/auth/silent-refresh');
            // 원래의 요청 재시도
            const originalRequest = error.config;
            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            // 리프레시 토큰도 만료된 경우 로그아웃 처리
            this.logout();
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  private async refreshToken(path:string): Promise<void> {
    try {
      const response = await this.axiosInstance.post<{ accessToken: string }>('/auth/silent-refresh', {}, {
        withCredentials: true
      });
      this.setAccessToken(response.data.accessToken);
    } catch (error) {
      console.error('Failed to refresh token:', error);
      throw error;
    }
  }

  private logout(): void {
    this.accessToken = null;
    Router.push('/login');
  }

  public setAccessToken(token: string): void {
    this.accessToken = token;
    this.notifyTokenChange(token);
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