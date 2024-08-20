import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import BasicLabel from '@view/atoms/BasicLabel';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '@page/_app';
import { printLog } from '@/utils/Utils';
import Router from 'next/router';

const TopContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 5vh; // 전체 화면 높이의 15% 사용
  background-color: #ccc;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChildContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
`;

const Icon = styled.img`
  width: 32px;
  height: 32px;
`;

export const Top: React.FC = () => {
  const { authStore } = useContext(StoreContext);
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLogged(authStore.isAuthenticated);
    printLog('isLogged: ' + authStore.isAuthenticated);
  }, [authStore.isAuthenticated]);

  const handleButtonClick = () => {
    authStore.logout();
  };

  const handleMove = (path: string) => {
    Router.push(path);
  };

  return (
    <TopContainer>
      <BasicLabel description="여기가 화면 이름" />
      <ChildContainer>
        {isLogged ? (
          <button
            onClick={handleButtonClick}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '5px',
            }}
          >
            <Icon src={'/icons/logout.png'} alt="icon" />
            <span>logout</span>
          </button>
        ) : (
          <button
            onClick={() => handleMove('/user/login')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '5px',
            }}
          >
            <Icon src={'/icons/login.png'} alt="icon" />
            <span>login</span>
          </button>
        )}
      </ChildContainer>
    </TopContainer>
  );
};

export default observer(Top);