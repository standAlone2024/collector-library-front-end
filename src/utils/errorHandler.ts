export function handleError(error: Error) {
  // 콘솔에 스택 트레이스 출력
  console.error('Error stack trace:', error.stack);

  // TODO: FE에서 발생한 Error를 BE로 보내서 log를 남기던지 해야 함
}