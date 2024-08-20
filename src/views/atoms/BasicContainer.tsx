import React, { ReactNode } from 'react';
import styled from 'styled-components';

const MiddleContainerAlignCenter = styled.div`
  position: absolute;
  top: 8vh; // Top 영역의 높이만큼 위에서 떨어짐
  left: 0;
  right: 0;
  bottom: 3vh; // Bottom 영역의 높이만큼 위에서 떨어짐
  overflow: auto; // 필요한 경우 스크롤 추가
  // background-color: red;
  //이 밑으로 중앙정렬  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MiddleContainer = styled.div`
  position: absolute;
  top: 8vh; // Top 영역의 높이만큼 위에서 떨어짐
  left: 0;
  right: 0;
  bottom: 3vh; // Bottom 영역의 높이만큼 위에서 떨어짐
  overflow: auto; // 필요한 경우 스크롤 추가
`;

export const BasicContainer: React.FC<{ children: ReactNode; isAlignCenter?: boolean }> = ({ children, isAlignCenter }) => {
    return isAlignCenter ? (
      <MiddleContainerAlignCenter>{children}</MiddleContainerAlignCenter>
    ) : (
      <MiddleContainer>{children}</MiddleContainer>
    );
};
  
export default BasicContainer;