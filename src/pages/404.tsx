import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const StyledLink = styled.a`
  color: #0070f3;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const Custom404: React.FC = () => {
  return (
    <Container>
      <Title>404 - 페이지를 찾을 수 없습니다</Title>
      <Message>죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</Message>
      <Link href="/" passHref>
        <StyledLink>홈페이지로 돌아가기</StyledLink>
      </Link>
    </Container>
  );
};

export default Custom404;