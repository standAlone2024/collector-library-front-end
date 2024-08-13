import fs from 'fs';
import path from 'path';

export function handleError(error: Error) {
  // 콘솔에 스택 트레이스 출력
  console.error('Error stack trace:', error.stack);

  // 로그 파일에 스택 트레이스 저장
  const logDir = path.join(process.cwd(), 'logs');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }
  const logFile = path.join(logDir, 'error.log');
  const logMessage = `${new Date().toISOString()} - ${error.stack}\n`;
  fs.appendFileSync(logFile, logMessage);
}