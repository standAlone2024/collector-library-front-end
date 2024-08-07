import React, { useState } from 'react';
import styled from 'styled-components';
import BasicButton from '@view/atoms/BasicButton';
import BasicImageButton from '@view/atoms/BasicImageButton';
import BasicLabel from '@view/atoms/BasicLabel';
import BasicInputTag from '@view/atoms/BasicInputTag';
// import { login } from '../../apis/LoginApi';
import { printLog } from '@util/Utils';
import { LOG_LEVEL } from '@util/constans';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%; 
  width: 100%; 
`;

const ChildComponent = styled.div`
  display: flex;
  flex-direction: row;
  background-color: lightblue;
  padding: 20px;
  border-radius: 10px;
`;

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = async() => {
    try{
      // const data = await login(email, password);

      // localStorage.setItem('token', data.token);
      //TODO mobx로 관리
      //TODO 이 전 화면으로 보내는 코드를 작성해야 함
    }catch(err)
    {
      printLog('Login failed '+ err , LOG_LEVEL.ERROR);
    }
  };
  return (
    <Container>
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
          value={password}
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
        onClick={handleClick}
      />
      <BasicButton
        label='비밀번호 찾기'
        background_color='green'
        // margin='10px 0px 0px 0px'
        onClick={handleClick}
      />  
      </ChildComponent>
      <BasicButton
        label='가입'
        background_color='green'
        margin='10px 0px 0px 0px'
        onClick={handleClick}
      />
      <BasicImageButton
        label='카카오 로그인'
        background_color='yellow'
        onClick={handleClick}
        img_path='/icons/kko_logo.png'
      />
      <BasicImageButton
        label='구글 로그인'
        background_color='white'
        onClick={handleClick}
        img_path='/icons/google_logo.png'
      />
    </Container>
  );
}

export default Login;