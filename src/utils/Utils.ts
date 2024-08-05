import { IS_SERVICE, LOG_LEVEL } from "./constans";
export function isValidEmail(email: string): boolean {
    // 이메일 유효성 검사를 위한 정규 표현식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
export function printLog(log: any, log_level?: LOG_LEVEL){

    if(IS_SERVICE)
        return;

    switch(log_level)
    {
        case LOG_LEVEL.LOG : 
            console.log(log) ;
            break;
        case LOG_LEVEL.WARNING : 
            console.warn(log);
            break;
        case LOG_LEVEL.ERROR : 
            console.error(log);
            break;
        default : 
            console.log(log) ;
            break;
    }
}