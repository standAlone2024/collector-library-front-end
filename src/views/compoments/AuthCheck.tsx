// components/AuthCheck.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useError } from '@view/etc';
import authStore from '@/stores/authStore';
import { printLog } from '@/utils/Utils';

export const AuthCheck: React.FC = () => {
  const router = useRouter();
  const { setErrorState } = useError();

  useEffect(() => {
    const checkAuth = async () => {
      if (router.pathname !== '/' && !(router.pathname.startsWith('/user'))) {
        try {
          const isAuthenticated = await authStore.checkAndRefreshAuth();
          if (!isAuthenticated) {
            router.push('/');
            printLog('refresh fail');
          }
        } catch (error) {
          if (error instanceof Error) {
            setErrorState(error, 'Authentication failed. Please log in again.');
            router.push('/');
          }
        }
      }
    };

    checkAuth();
  }, [router, router.pathname, setErrorState]);

  return null; // 이 컴포넌트는 UI를 렌더링하지 않습니다.
};