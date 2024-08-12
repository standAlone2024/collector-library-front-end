import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import BasicLabel from '@view/atoms/BasicLabel';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '@page/_app';
import { printLog } from '@/utils/Utils';

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
  const { authStore } = useContext(StoreContext);
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    setIsLogged(authStore.isAuthenticated);
    printLog('isLogged: ' + authStore.isAuthenticated);
  }, [authStore.isAuthenticated]);
  
  const handleButtonClick = () => {
    router.push('/user/login');
  };

  return (
    <MainContainer style={{ background: '#ccc', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <BasicLabel 
        description='여기가 화면 이름'
      />
      
    <ChildContainer>
      {isLogged ? (
        <button 
          onClick={handleButtonClick} 
          style={{ 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '5px', 
          }}
        >
          <Icon src={"/icons/logout.png"} alt="icon"/>
          <span>logout</span>
        </button>
      ) : (
        <button 
          onClick={handleButtonClick} 
          style={{ 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '5px', 
          }}
        >
          <Icon src={"/icons/login.png"} alt="icon"/>
          <span>login</span>
        </button>
      )}
    </ChildContainer>
    </MainContainer>
  );
};

export default observer(Top);