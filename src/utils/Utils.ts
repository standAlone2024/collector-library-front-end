import { IS_SERVICE, LOG_LEVEL, PATH_ORIGIN } from "./constans";
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

//File 비교를 위한 해시 값 생성
export const calculateFileHash = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const buffer = event.target?.result as ArrayBuffer;
        const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        resolve(hashHex);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
};

export const swapOriginal = (imgPath: string) => {
  const pathParts = imgPath.split('/');
  // printLog(pathParts);
  if(pathParts.length >= 4 && pathParts[3] === 'thumbnail')
    pathParts[3] = PATH_ORIGIN;
  return pathParts.join('/');
}