import React from 'react';
import styled from 'styled-components';
import { FiBookOpen } from 'react-icons/fi';
import Router from 'next/router';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  height: calc(100vh - ${props => props.theme.sizes.headerHeight} - ${props => props.theme.sizes.footerHeight});
`;

const Title = styled.h1`
  font-family: ${props => props.theme.fonts.heading};
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 2rem;
`;

const IconWrapper = styled.div`
  margin: 2rem 0;
  position: relative;
`;

const StartButton = styled.button`
  background-color: ${props => props.theme.colors.accent};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 4px;

  &:hover {
    background-color: ${props => props.theme.colors.primary};
  }
`;

const handleMove = () => {
  Router.push('/user/login');
}

const Main: React.FC = () => {
  return (
    <MainContainer>
      <Title>Collector&apos;s Haven</Title>
      <Subtitle>당신의 컬렉션을 정리하고 공유하세요</Subtitle>
      <IconWrapper>
        <FiBookOpen style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '4rem', color: '#1A365D' }} />
      </IconWrapper>
      <StartButton onClick={handleMove}>컬렉션 정리 시작하기</StartButton>
    </MainContainer>
  );
}

export default Main;