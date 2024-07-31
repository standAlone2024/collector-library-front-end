import React from 'react';
import styled from 'styled-components';
import icLibrary from '../asserts/icons/library_books.png';

// Styled components 정의
const MainContainer = styled.div`
    height : 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    // background-color: blue;
`;
const ChildContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;  
    // background-color: red;
`;
const Icon = styled.img`
  width: 100px;
  height: 100px;
`;

const Main: React.FC = () => {
  return (
    <MainContainer>
        <ChildContainer>
            <p>내 컬렉션을 모두 기억하고 있나요?</p>
            <p>오늘 또 사신건 아니죠?</p>
            <Icon src={icLibrary} alt="icon" />
            <p>이제 정리 한 번 하시죠!</p>
        </ChildContainer>
    </MainContainer>
  );
}

export default Main;