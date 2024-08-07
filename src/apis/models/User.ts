export interface IUserSession {
    isLogin?: boolean;
    accessToken?: string;
    refreshToken?: string;
    client_path?: string;
}