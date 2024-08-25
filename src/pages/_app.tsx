import type { AppProps } from 'next/app';
import { createContext } from 'react';
import { observer } from 'mobx-react-lite';
import authStore from '@store/authStore';
import sectionStore from '@store/sectionStore';
import {Top, Bottom } from '@view/templates';
import axios from "axios";
import { Providers } from '@view/templates';

//FE, BE간 cookie를 주고 받을때 필요
axios.defaults.withCredentials = true;

const stores = {
    authStore,
    sectionStore,
};

export const StoreContext = createContext(stores);


const MyApp = observer(({ Component, pageProps }: AppProps) => {

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