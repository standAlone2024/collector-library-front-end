import React from 'react';
import styled from 'styled-components';
import BasicButton from '../../atoms/BasicButton';
import ThumbListComponent from '../../compoments/ThumbListComponent';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%; 
  width: 100%; 
`;

const thumbnails = [
    { img_url: '/asserts/icons/game_thumb.png', background_color: 'lightblue' },
    { img_url: '/asserts/icons/tv_thumb.png', background_color: 'lightpink' },
    // 필요한 만큼 추가
  ];

const LibraryList: React.FC = () => {
    const handleAddLibrary = () => {

    };
    return (
        <Container>
            <ThumbListComponent thumbnails={thumbnails} />
            <BasicButton background_color={'green'} label={'Library 추가'} onClick={handleAddLibrary} />
        </Container>
    )
}

export default LibraryList;