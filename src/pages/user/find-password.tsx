import React from 'react';
import styled from 'styled-components';
import BasicLabel from '@view/atoms/BasicLabel';
import BasicInputTag from '@view/atoms/BasicInputTag';
import BasicButton from '@view/atoms/BasicButton';

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

const FindPassWord: React.FC = () => {
    const handleClick = () => {
        alert();
    };
    return (
        <Container >
            <BasicLabel description={'가입시 사용하신 이메일을 입력해 주세요'} />
            <ChildComponent>
                <BasicLabel description={'이메일'} />
                <BasicInputTag 
                hint='이메일 입력 칸'
                value=''
                onChange={(e) => handleClick}
                />
            </ChildComponent>
            <BasicButton background_color={'green'} label={'임시 비밀번호 발급'} onClick={handleClick} />
        </Container>
    )
}

export default FindPassWord;