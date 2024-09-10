import React, { useContext } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '@page/_app';
import Router, { useRouter } from 'next/router';
import { FiLogIn, FiLogOut, FiBook } from 'react-icons/fi';

const TopContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${props => props.theme.sizes.headerHeight};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.background};
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Logo = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  font-size: 1.5rem;
  margin: 0;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.background};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.8rem;
  padding: 0.5rem;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }

  svg {
    font-size: 1.5rem;
    margin-bottom: 0.25rem;
  }
`;

export const Top: React.FC = observer(() => {
  const { authStore } = useContext(StoreContext);
  const router = useRouter();

  const handleButtonClick = () => {
    authStore.logout();
  };

  const handleMove = (path: string) => {
    Router.push(path);
  };

  return (
    <TopContainer>
      <Logo>Collector Library</Logo>
      {authStore.isAuthenticated ? (
        <NavButton onClick={handleButtonClick}>
          <FiLogOut />
          <span>Logout</span>
        </NavButton>
      ) : (
        !router.pathname.startsWith('/user') && (
          <NavButton onClick={() => handleMove('/user/login')}>
            <FiLogIn />
            <span>Login</span>
          </NavButton>
        )
      )}
    </TopContainer>
  );
});

export default Top;