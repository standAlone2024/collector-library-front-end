import React from 'react';
import styled from 'styled-components';
import BasicLabel from '../../atoms/BasicLabel';
import BasicInputTag from '../../atoms/BasicInputTag';
import BasicButton from '../../atoms/BasicButton';
import BasicImageButton from '../../atoms/BasicImageButton';

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

const Join: React.FC = () => {
  const handleClick = () => {
    alert('Request Join!');
  };
  return (
  <Container>
    <ChildComponent>
      <BasicLabel description={'이메일'}/>
      <BasicInputTag hint='이메일'/>
    </ChildComponent>
    <BasicLabel description={'email validation result'} />
    <ChildComponent>
      <BasicLabel description={'비밀번호'}/>
      <BasicInputTag hint='특수문자, 숫자, 영어를 합한 8자리 이상'/>
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
        img_path='/asserts/icons/kko_logo.png'
      />
      <BasicImageButton
        label='구글로 시작'
        background_color='white'
        onClick={handleClick}
        img_path='/asserts/icons/google_logo.png'
      />
  </Container>
  )
}

export default Join;