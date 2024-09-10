import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    primary: '#1A365D',    // 차분한 네이비 블루
    secondary: '#718096',  // 중성 그레이
    background: '#F7FAFC', // 화이트에 가까운 밝은 회색
    accent: '#B7791F',     // 브론즈
    text: '#2D3748',       // 진한 그레이 (텍스트용)
  },
  fonts: {
    heading: "'Playfair Display', serif",
    body: "'Roboto', sans-serif",
  },
  sizes: {
    headerHeight: '60px',
    footerHeight: '40px',
  },
};

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${theme.fonts.body};
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    margin: 0;
    padding: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.heading};
  }
`;