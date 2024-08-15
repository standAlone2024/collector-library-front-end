import type { AppProps } from 'next/app';
import { createContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import authStore from '@/stores/authStore';
import Top from '@view/templates/Top';
import Bottom from '@view/templates/Bottom';
import axios from "axios";
import { useRouter } from 'next/router';
import { Providers } from '@/views/templates/Providers';
import { printLog } from '@/utils/Utils';

//FE, BE간 cookie를 주고 받을때 필요
axios.defaults.withCredentials = true;

const stores = {
    authStore,
};

export const StoreContext = createContext(stores);


export const useAuthCheck = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      if (router.pathname !== '/' && !(router.pathname.startsWith('/user'))) {
        const isAuthenticated = await authStore.checkAndRefreshAuth();
        if (!isAuthenticated) {
          router.push('/');
        printLog('refresh fail');
        }
      }
    };

    checkAuth();
  }, [router.pathname]);
};

const MyApp = observer(({ Component, pageProps }: AppProps) => {
    useAuthCheck();

    return (
        <StoreContext.Provider value={stores}>
            <Providers>
                <Top />
                <Component {...pageProps} />
                <Bottom />
            </Providers>
        </StoreContext.Provider>
    );
});

export default MyApp;