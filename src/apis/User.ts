export interface IUserSession {
    isLogin?: boolean;
    visitorId?: string;
    accessToken?: string;
    refreshToken?: string;
    client_path?: string;
}