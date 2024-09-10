import type { AppProps } from 'next/app';
import { createContext } from 'react';
import { observer } from 'mobx-react-lite';
import { authStore, sectionStore, bookStore, labelStore } from '@store';
import { Top, Bottom } from '@view/templates';
import axios from "axios";
import { Providers } from '@view/templates';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from '@view/etc';
import styled from 'styled-components';

axios.defaults.withCredentials = true;

const stores = {
    authStore,
    sectionStore,
    bookStore,
    labelStore,
};

export const StoreContext = createContext(stores);

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  padding-top: ${theme.sizes.headerHeight};
  padding-bottom: ${theme.sizes.footerHeight};
`;

const MyApp = observer(({ Component, pageProps }: AppProps) => {
    return (
        <StoreContext.Provider value={stores}>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Providers>
                    <Layout>
                        <Top />
                        <Main>
                            <Component {...pageProps} />
                        </Main>
                        <Bottom />
                    </Layout>
                </Providers>
            </ThemeProvider>
        </StoreContext.Provider>
    );
});

export default MyApp;