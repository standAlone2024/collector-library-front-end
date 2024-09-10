import React, { Suspense } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeProvider as StyledComponentsProvider } from 'styled-components';
import { ErrorProvider, LoadingProvider, ErrorBoundary, ErrorModal} from '@view/etc';
import { AuthCheck } from '@view/compoments';
// import { ErrorBoundary } from 'next/dist/client/components/error-boundary';

const theme = createTheme(); // MUI 테마 생성

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <StyledComponentsProvider theme={theme}>
        <ErrorProvider>
          <ErrorBoundary>
            <AuthCheck /> 
            <LoadingProvider>
              {children}
            </LoadingProvider>
          </ErrorBoundary>
          <ErrorModal />
        </ErrorProvider>
      </StyledComponentsProvider>
    </MuiThemeProvider>
  );
};