import React from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeProvider as StyledComponentsProvider } from 'styled-components';
import { ErrorProvider } from '@/views/contexts/ErrorContext';
import { LoadingProvider } from '@/views/contexts/LoadingContext';

const theme = createTheme(); // MUI 테마 생성

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <StyledComponentsProvider theme={theme}>
        <ErrorProvider>
          <LoadingProvider>
            {children}
          </LoadingProvider>
        </ErrorProvider>
      </StyledComponentsProvider>
    </MuiThemeProvider>
  );
};