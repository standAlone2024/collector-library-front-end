import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import icon from '../../asserts/icons/login.png'; // 아이콘 파일 경로

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
      <h1>Top Area</h1>
      <ChildContainer>
        <button onClick={handleButtonClick} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <Icon src={icon} alt="icon"/>
        </button>
        login
      </ChildContainer>
    </MainContainer>
  );
}

export default Top;