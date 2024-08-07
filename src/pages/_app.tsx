// pages/_app.tsx
import type { AppProps } from 'next/app';
import { createContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import authStore from '@store/authStore';
import Top from '@view/templates/Top';
import Bottom from '@/views/templates/Bottom';

const stores = {
    authStore,
};

const StoreContext = createContext(stores);

const MyApp = ({ Component, pageProps }: AppProps) => {
    
    useEffect(() => {
        //TODO 여기서 path나 scroll을 기억해 뒀다가 setting
    }, []);

    return (
        <StoreContext.Provider value={stores}>
            <Top />
            <Component {...pageProps} />
            <Bottom />
        </StoreContext.Provider>
    );
};

export default observer(MyApp);