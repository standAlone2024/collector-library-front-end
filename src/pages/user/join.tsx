import React, {useContext, useState, useEffect} from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { BasicLabel, BasicInputTag, BasicButton, BasicImageButton, BasicContainer } from '@view/atoms';
import { StoreContext } from '@page/_app';
import { register } from '@api/LoginApi';
import { useLoading, useError } from '@view/etc';

const ChildComponent = styled.div`
  display: flex;
  flex-direction: row;
  background-color: lightblue;
  padding: 20px;
  border-radius: 10px;
`;

const Join: React.FC = () => {

  const [email, setEmail] = useState('');
  const [passwd, setPassword] = useState('');
  const { authStore } = useContext(StoreContext);
  const [isLogged, setIsLogged] = useState(false);
  const { setIsLoading } = useLoading();
  const { setErrorState } = useError();

  useEffect(() => {
    setIsLogged(authStore.isAuthenticated);
  }, [authStore.isAuthenticated]);

  const handleClick = async() => {
    setIsLoading(true);
    try{
      const auth = await register(email, passwd);
      authStore.setAuth(auth.token, auth.user);
      Router.push('/seciton/list');
    }catch(err)
    {
      //타입 가드
      if (err instanceof Error) {
        setErrorState(err, 'Failed to fetch data. Please try again later.');
      } else {
        setErrorState(new Error('An unknown error occurred'), 'Failed to fetch data. Please try again later.');
      }
    }finally {
      setIsLoading(false);
    }
  };
  return (
    <BasicContainer isAlignCenter={true}>
    {isLogged ? (<p>로그인 됨</p>) : (<p>로그인 안됨</p>)}
    <ChildComponent>
      <BasicLabel description={'이메일'}/>
      <BasicInputTag 
      hint='이메일'
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      />
    </ChildComponent>
    <BasicLabel description={'email validation result'} />
    <ChildComponent>
      <BasicLabel description={'비밀번호'}/>
      <BasicInputTag 
      hint='특수문자, 숫자, 영어를 합한 8자리 이상'
      value={passwd}
      onChange={(e) => setPassword(e.target.value)}
      />
    </ChildComponent>
    <BasicLabel description={'passwd validation result'} />
    <BasicButton
        label='가입'
        background_color='green'
        // margin='10px 0px 0px 0px'
        onClick={handleClick}
      />
      <BasicImageButton
        label='카카오로 시작'
        background_color='yellow'
        onClick={handleClick}
        img_path='/icons/kko_logo.png'
      />
      <BasicImageButton
        label='구글로 시작'
        background_color='white'
        onClick={handleClick}
        img_path='/icons/google_logo.png'
      />
  </BasicContainer>
  )
}

export default observer(Join);