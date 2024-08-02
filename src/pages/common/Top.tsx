import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import BasicLabel from '../../atoms/BasicLabel';

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
    font-size: 12px;
    // background-color: red;
`;

const Icon = styled.img`
  width: 32px;
  height: 32px;
`;

const Top: React.FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/user/login'); // 이동하고자 하는 페이지 경로
  };
  return (
    <MainContainer style={{ background: '#ccc', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <BasicLabel 
        description='여기가 화면 이름'
      />
      <ChildContainer>
        <button onClick={handleButtonClick} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <Icon src={"/asserts/icons/login.png"} alt="icon"/>
        </button>
        login
      </ChildContainer>
    </MainContainer>
  );
}

export default Top;