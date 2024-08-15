import React from 'react';
import { observer } from 'mobx-react-lite';
import authStore from '@/stores/authStore';
import styled from 'styled-components';
import BasicButton from '@view/atoms/BasicButton';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%; 
  width: 100%; 
`;

const List: React.FC = observer(() => {

  const handleAddLibrary = () => {
    alert('추가 modal 생성 예정');
  };
  
  return (
    <Container>
        {authStore.user && (
          <p>Welcome, {authStore.user.email}</p>
        )}
        {/* {thumbnails.length > 0 && <ThumbListComponent thumbnails={thumbnails} />}
        {sections && sections.length > 0 && <p>{sections.length}</p>} */}
        <BasicButton background_color={'green'} label={'Library 추가'} onClick={handleAddLibrary} />
    </Container>
  );
});

export default List;