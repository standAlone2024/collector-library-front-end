import React from 'react';
import styled from 'styled-components';
import { BasicLabel, BasicInputTag, BasicButton, BasicContainer } from '@view/atoms';

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
        <BasicContainer isAlignCenter={true}>
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
        </BasicContainer>
    )
}

export default FindPassWord;