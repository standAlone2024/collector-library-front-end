import { IS_SERVICE, LOG_LEVEL } from "./constans";
export function isValidEmail(email: string): boolean {
    // 이메일 유효성 검사를 위한 정규 표현식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
export function printLog(...args: any[]){
    if(IS_SERVICE)
        return;
    console.log(...args);
}