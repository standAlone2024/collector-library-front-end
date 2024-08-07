import React, {useEffect} from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import BasicLabel from '../atoms/BasicLabel';

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

  // const location = useLocation();
  const router = useRouter();

  // let needMove = true;
  // if(location.pathname === '/' || location.pathname.startsWith('/user'))
  //   needMove = false;

  // useEffect(() => {
  //   if (!isLoggedIn && needMove) {
  //     navigate('/user/login'); 
  //   }
  //   else
  //   {
  //     printLog('logined');
  //   }
  // }, [isLoggedIn, navigate]);
  
  const handleButtonClick = () => {
    router.push('/user/login');
  };

  return (
    <MainContainer style={{ background: '#ccc', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <BasicLabel 
        description='여기가 화면 이름'
      />
      <ChildContainer>
        <button onClick={handleButtonClick} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <Icon src={"/icons/login.png"} alt="icon"/>
        </button>
        login
      </ChildContainer>
    </MainContainer>
  );
};

export default Top;