import React from 'react';
import { NextPage, NextPageContext } from 'next';
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

interface ErrorProps {
  statusCode?: number;
}

const Error: NextPage<ErrorProps> = ({ statusCode }) => {
  return (
    <Container>
      <Title>오류가 발생했습니다</Title>
      <Message>
        {statusCode
          ? `서버에서 ${statusCode} 에러가 발생했습니다.`
          : '클라이언트에서 오류가 발생했습니다.'}
      </Message>
      <Message>잠시 후 다시 시도해 주세요.</Message>
    </Container>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext): ErrorProps => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;