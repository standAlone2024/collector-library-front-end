import type { AppProps } from 'next/app';
import { createContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import authStore from '@store/authStore';
import {Top, Bottom } from '@view/templates';
import axios from "axios";
import { useRouter } from 'next/router';
import { Providers } from '@view/templates';
import { printLog } from '@util/Utils';
import { useError } from '@view/etc'

//FE, BE간 cookie를 주고 받을때 필요
axios.defaults.withCredentials = true;

const stores = {
    authStore,
};

export const StoreContext = createContext(stores);


// export const useAuthCheck = () => {
  // const router = useRouter();
  // const { setErrorState } = useError();

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     if (router.pathname !== '/' && !(router.pathname.startsWith('/user'))) {
  //       const isAuthenticated = await authStore.checkAndRefreshAuth();
  //       if (!isAuthenticated) {
  //         router.push('/');
  //       printLog('refresh fail');
  //       }
  //     }
  //   };

  //   checkAuth();
  // }, [router, router.pathname]);

//   useEffect(() => {
//     const checkAuth = async () => {
//       if (router.pathname !== '/' && !(router.pathname.startsWith('/user'))) {
//         try {
//           const isAuthenticated = await authStore.checkAndRefreshAuth();
//           if (!isAuthenticated) {
//             router.push('/');
//             printLog('refresh fail');
//           }
//         } catch (error) {
//           if (error instanceof Error) {
//             setErrorState(error, 'Authentication failed. Please log in again.');
//             router.push('/');
//           }
//         }
//       }
//     };

//     checkAuth();
//   }, [router, router.pathname, setErrorState]);
// };

const MyApp = observer(({ Component, pageProps }: AppProps) => {

    // useAuthCheck();

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