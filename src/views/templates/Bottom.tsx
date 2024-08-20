import React from 'react';
import styled from 'styled-components';

// const BottomContainer = styled.div`
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   background-color: #ccc;
//   padding: 1rem;
//   display: flex;
//   flex-direction: row;
// `;

const BottomContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3vh; // 전체 화면 높이의 10% 사용
  background-color: #ccc;
  padding: 1rem;
  display: flex;
  flex-direction: row;
`;

const FlexItem = styled.div`
  flex: 1;
  padding: 0.5rem;
  text-align: center;
`;

const Terms = styled(FlexItem)`
  flex: 0 0 15%;
`;

const Address = styled(FlexItem)`
  flex: 0 0 15%;
`;

const Ads = styled(FlexItem)`
  flex: 1;
`;

export const Bottom: React.FC = () => {
  return (
    <BottomContainer>
      <Terms>약관</Terms>
      <Ads>광고</Ads>
      <Address>주소</Address>
    </BottomContainer>
  );
};

export default Bottom;