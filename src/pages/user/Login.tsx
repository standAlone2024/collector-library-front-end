import React from 'react';
import styled from 'styled-components';
import BasicButton from '../../atoms/BasicButton';
import BasicImageButton from '../../atoms/BasicImageButton';
import BasicLabel from '../../atoms/BasicLabel';
import BasicInputTag from '../../atoms/BasicInputTag';

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
  const handleClick = () => {
    alert('Request Login!');
  };
  return (
    <Container>
      <ChildComponent>
        <BasicLabel 
          description={'email'}
        />
        <BasicInputTag 
          hint={'이메일'}
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
        />
      </ChildComponent>
      <BasicLabel 
        description='passwd validation resule'
      />
      <BasicButton
        label='가입'
        background_color='green'
        // margin='10px 0px 0px 0px'
        onClick={handleClick}
      />
      <BasicImageButton
        label='카카오 로그인'
        background_color='yellow'
        onClick={handleClick}
        img_path='/asserts/icons/kko_logo.png'
      />
      <BasicImageButton
        label='구글 로그인'
        background_color='white'
        onClick={handleClick}
        img_path='/asserts/icons/google_logo.png'
      />
    </Container>
  );
}

export default Login;