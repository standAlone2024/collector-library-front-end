import React, { useContext, useState } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { BasicButton, BasicImageButton, BasicLabel, BasicInputTag, BasicContainer } from '@view/atoms';
import { printLog } from '@util/Utils';
import { LOG_LEVEL } from '@util/constans';
import { observer } from 'mobx-react-lite';
import { StoreContext } from '@page/_app';
import { login } from '@/apis/LoginApi';

const ChildComponent = styled.div`
  display: flex;
  flex-direction: row;
  background-color: lightblue;
  padding: 20px;
  border-radius: 10px;
`;

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [passwd, setPassword] = useState('');
  const { authStore } = useContext(StoreContext);

  const handleLogin = async() => {
    try{
      printLog('로그인 click');
      const auth = await login(email, passwd);
      if(auth)
        Router.push('/section/list');
    }catch(err)
    {
      printLog('Login failed '+ err , LOG_LEVEL.ERROR);
    }
  };
  const handleMove = (path: string) => {
    Router.push(path);
  }
  return (
    <BasicContainer isAlignCenter={true}>
      <ChildComponent>
        <BasicLabel 
          description={'email'}
        />
        <BasicInputTag 
          hint={'이메일'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </ChildComponent>
      <BasicLabel 
        description='email validation resule'
      />
      <ChildComponent>
      <BasicLabel 
          description={'passwd'}
        />
        <BasicInputTag 
          hint={'비밀번호'}
          value={passwd}
          onChange={(e) => setPassword(e.target.value)}
        />
      </ChildComponent>
      <BasicLabel 
        description='passwd validation resule'
      />
      <ChildComponent>
      <BasicButton
        label='로그인'
        background_color='green'
        margin='0px 10px 0px 0px'
        onClick={handleLogin}
      />
      <BasicButton
        label='비밀번호 찾기'
        background_color='green'
        // margin='10px 0px 0px 0px'
        onClick={() => handleMove('/user/find-password')}
      />  
      </ChildComponent>
      <BasicButton
        label='가입'
        background_color='green'
        margin='10px 0px 0px 0px'
        onClick={() => handleMove('/user/join')}
      />
      <BasicImageButton
        label='카카오 로그인'
        background_color='yellow'
        onClick={handleLogin}
        img_path='/icons/kko_logo.png'
      />
      <BasicImageButton
        label='구글 로그인'
        background_color='white'
        onClick={handleLogin}
        img_path='/icons/google_logo.png'
      />
    </BasicContainer>
  );
}

export default observer(Login);