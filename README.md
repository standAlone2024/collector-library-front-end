# 콜렉터 라이브러리 프론트엔드

이 프로젝트는 콜렉터들을 위한 디지털 라이브러리 시스템의 프론트엔드 부분입니다. React, TypeScript, Next.js를 기반으로 구축되었으며, 사용자 친화적인 인터페이스를 제공합니다.

## 주요 기능

- 사용자 인증 및 권한 관리
- 콜렉션 아이템 검색 및 필터링
- 개인 콜렉션 관리
- 반응형 디자인으로 모바일 지원
- Google Cloud Vision OCR 연계 기능
  - 이미지에서 텍스트 추출
  - 추출된 텍스트를 버튼 형태로 표시
  - 버튼 클릭으로 빠른 텍스트 입력 지원

## 기술 스택

- React
- TypeScript
- Next.js
- MobX (상태 관리)
- Styled-components (스타일링)
- Google Cloud Vision API (OCR)

## 요구사항

- Node.js 18.17.1
- Yarn Berry

## 설치 방법

1. 저장소를 클론합니다:
   ```
   git clone https://github.com/your-username/collector-library-frontend.git
   ```
2. 프로젝트 디렉토리로 이동합니다:
   ```
   cd collector-library-frontend
   ```
3. Yarn Berry를 활성화합니다:
   ```
   yarn set version berry
   ```
4. 의존성을 설치합니다:
   ```
   yarn install
   ```

## 주의사항

- 이 프로젝트는 Node.js 18.17.1 버전에서 테스트되었습니다. 다른 버전을 사용할 경우 호환성 문제가 발생할 수 있습니다.
- Yarn Berry를 사용하므로, npm이나 기존 Yarn을 사용하지 마세요.
- 다음 모듈들의 버전에 주의해주세요:
  - react: ^18.2.0
  - next: ^13.4.19
  - mobx: ^6.10.0
  - styled-components: ^6.0.7
- 의존성 설치 후 `yarn dlx @yarnpkg/doctor`를 실행하여 잠재적인 문제를 확인하세요.

## 사용 방법

개발 서버를 실행하려면:
```
yarn dev
```
이후 `http://localhost:3000`에서 애플리케이션에 접근할 수 있습니다.

... (이하 생략)

---

# Collector Library Frontend

This project is the frontend part of a digital library system for collectors. It is built using React, TypeScript, and Next.js, providing a user-friendly interface.

## Key Features

- User authentication and authorization
- Collection item search and filtering
- Personal collection management
- Responsive design with mobile support
- Google Cloud Vision OCR Integration
  - Text extraction from images
  - Extracted text displayed as buttons
  - Quick text input support via button clicks

## Tech Stack

- React
- TypeScript
- Next.js
- MobX (State Management)
- Styled-components (Styling)
- Google Cloud Vision API (OCR)

## Requirements

- Node.js 18.17.1
- Yarn Berry

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/collector-library-frontend.git
   ```
2. Navigate to the project directory:
   ```
   cd collector-library-frontend
   ```
3. Enable Yarn Berry:
   ```
   yarn set version berry
   ```
4. Install dependencies:
   ```
   yarn install
   ```

## Important Notes

- This project has been tested with Node.js 18.17.1. Using other versions may cause compatibility issues.
- Use Yarn Berry for package management. Do not use npm or classic Yarn.
- Pay attention to the following module versions:
  - react: ^18.2.0
  - next: ^13.4.19
  - mobx: ^6.10.0
  - styled-components: ^6.0.7
- After installing dependencies, run `yarn dlx @yarnpkg/doctor` to check for potential issues.

## Usage

To run the development server:
```
yarn dev
```
Then access the application at `http://localhost:3000`.

... (rest of the content remains the same)