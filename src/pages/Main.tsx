import React from 'react';
import styled from 'styled-components';
import BasicButton from '../Views/atoms/BasicButton';
import BasicImageButton from '../Views/atoms/BasicImageButton';
import BasicInputTag from '../Views/atoms/BasicInputTag';
import BasicLabel from '../Views/atoms/BasicLabel';
import BasicThumbnail from '../Views/atoms/BasicThumbnail';
import { DESCRIPTION_FONT_SML } from '../utils/constans';

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
  const handleClick = () => {
    alert('Basic Button Clicked!');
  };

  return (
    <MainContainer>
        <ChildContainer>
            <p>내 컬렉션을 모두 기억하고 있나요?</p>
            <p>오늘 또 사신건 아니죠?</p>
            <Icon src={"/asserts/icons/library_books.png"} alt="icon" />
            <p>이제 정리 한 번 하시죠!</p>
        </ChildContainer>
        <div style={{
          display: 'flex',
          flexDirection: 'column', // 세로 방향으로 배치
          justifyContent: 'center', // 세로 가운데 정렬
          alignItems: 'center', // 수평 가운데 정렬
        }}>
        <BasicButton 
          background_color="green"
          label="확인"
          onClick={handleClick}
        />
        <BasicImageButton
          background_color='yellow'
          label='카카오'
          onClick={handleClick}
          img_path='/asserts/icons/library_books.png'
        />
        <BasicInputTag
          hint='테스트'
          // tag_color='brown'
          value=''
          onChange={(e) => handleClick}
        />
        <BasicLabel
        description='테스트'
        font_color='gray'
        font_size={DESCRIPTION_FONT_SML}
        />
        <BasicThumbnail
        img_url='/asserts/icons/settings.png'
        />
        </div>
    </MainContainer>
  );
}

export default Main;