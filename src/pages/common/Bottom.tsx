import React from 'react';
import styled from 'styled-components';

// MainContainer의 스타일 정의
const MainContainer = styled.div`
    display: flex;
    flex-direction: row;
    background-color: #ccc;
    padding: 1rem;
`;

// Flex 컨테이너의 자식 요소 스타일 정의
const FlexItem = styled.div`
    flex: 1;
    padding: 0.5rem;
    text-align: center;
`;

const Terms = styled(FlexItem)`
    flex: 0 0 15%;
    // background-color: red;
`;

const Address = styled(FlexItem)`
    flex: 0 0 15%;
    // background-color: blue;
`;

const Ads = styled(FlexItem)`
    flex: 1;
    // background-color: green;
`;

const Bottom: React.FC = () => {
  return (
    <MainContainer>
      <Terms>약관</Terms>
      <Ads>광고</Ads>
      <Address>주소</Address>
    </MainContainer>
  );
}

export default Bottom;