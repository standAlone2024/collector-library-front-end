import { useEffect, useTransition } from 'react';
import { useRouter } from 'next/router';
import { useError } from '@view/etc';
import authStore from '@store/authStore';
import { printLog } from '@util/Utils';

export const AuthCheck: React.FC = () => {
  const router = useRouter();
  const { setErrorState } = useError();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const checkAuth = async () => {
      if (router.pathname !== '/' && !(router.pathname.startsWith('/user'))) {
        try {
          printLog('checkAuth checkAndRefreshAuth');
          const isAuthenticated = await authStore.checkAndRefreshAuth();
          if (!isAuthenticated) {
            startTransition(() => {
              router.push('/');
            });
            printLog('refresh fail');
          }
        } catch (error) {
          if (error instanceof Error) {
            setErrorState(error, 'Authentication failed. Please log in again.');
            startTransition(() => {
              router.push('/');
            });
          }
        }
      }
    };

    startTransition(() => {
      checkAuth();
    });
  }, [router, router.pathname, setErrorState, startTransition]);

  if (isPending) {
    return <div>Checking authentication...</div>; // 또는 로딩 인디케이터
  }

  // 이 컴포넌트는 UI를 렌더링하지 않습니다.
  return null;
};