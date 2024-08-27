import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import BasicLabel from '@view/atoms/BasicLabel';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '@page/_app';
import { printLog } from '@util/Utils';
import Router, { useRouter } from 'next/router';

const TopContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 50px; 
  background-color: #ccc;
  padding: 0.5rem;
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

export const Top: React.FC = observer(() => {
  const { authStore } = useContext(StoreContext);
  const router = useRouter();

  useEffect(() => {
    // printLog('isAuthenticated: ' + authStore.isAuthenticated);
    // printLog('isLoading: ' + authStore.isLoading);
  }, [authStore.isAuthenticated, authStore.isLoading]);

  const handleButtonClick = () => {
    authStore.logout();
  };

  const handleMove = (path: string) => {
    Router.push(path);
  };

  if (router.pathname !== '/' && authStore.isLoading) {
    return (
      <TopContainer>
        <BasicLabel description="Loading..." />
      </TopContainer>
    );
  }

  return (
    <TopContainer>
      <BasicLabel description="여기가 화면 이름" />
      <ChildContainer>
        {authStore.isAuthenticated ? (
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
});

export default Top;