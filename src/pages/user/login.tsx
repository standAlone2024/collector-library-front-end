import React, { useState } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { BasicButton, BasicImageButton, BasicLabel, BasicInputTag, BasicContainer } from '@view/atoms';
import { printLog } from '@util/Utils';
import { LOG_LEVEL } from '@util/constans';
import { observer } from 'mobx-react-lite';
import { login } from '@api/AuthApi';
import { FiMail, FiLock } from 'react-icons/fi';

const LoginForm = styled.form`
  width: 100%;
  max-width: 300px;
  padding: 2rem;
  background-color: ${props => props.theme.colors.background};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
  width: 83%;
`;

const StyledIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.secondary};
  z-index: 1;
`;

const StyledInput = styled(BasicInputTag)`
  width: 100%;
  padding: 10;
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  width: 100%;
  gap: 0.5rem; // 버튼 사이의 간격
`;

const StyledBasicButton = styled(BasicButton)`
  flex: 1; // 버튼이 남은 공간을 균등하게 차지하도록 함
`;

const SocialLoginButtons = styled.div`
  margin-top: 2rem;
  width: 100%;
`;

const FullWidthButton = styled(BasicButton)`
  width: 100%;
  margin-top: 1rem;
`;

const StyledBasicImageButton = styled(BasicImageButton)`
  width: 100%;
  margin-top: 0.5rem;
`;

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [passwd, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    try {
      printLog('로그인 시도');
      const auth = await login(email, passwd);
      if (auth) Router.push('/section/list');
    } catch (err) {
      printLog('Login failed ' + err, LOG_LEVEL.ERROR);
    }
  };

  const handleMove = (path: string) => {
    Router.push(path);
  };

  return (
    <BasicContainer isAlignCenter={true}>
      <LoginForm onSubmit={handleLogin}>
        <BasicLabel
          description="Collector's Library에 오신 것을 환영합니다"
          font_size={24}
          font_color={(props) => props.theme.colors.primary}
        />
        <InputWrapper>
          <StyledIcon><FiMail /></StyledIcon>
          <StyledInput
            hint="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <StyledIcon><FiLock /></StyledIcon>
          <StyledInput
            hint="비밀번호"
            value={passwd}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </InputWrapper>
        <ButtonGroup>
          <StyledBasicButton
            label='로그인'
            background_color={props => props.theme.colors.primary}
            onClick={handleLogin}
          />
          <StyledBasicButton
            label='비밀번호 찾기'
            background_color={props => props.theme.colors.secondary}
            onClick={() => handleMove('/user/find-password')}
          />
        </ButtonGroup>
        <FullWidthButton
          label='회원가입'
          background_color={props => props.theme.colors.accent}
          onClick={() => handleMove('/user/join')}
        />
        <SocialLoginButtons>
          <StyledBasicImageButton
            label='카카오 로그인'
            background_color='#FEE500'
            onClick={() => {}}
            img_path='/icons/kko_logo.png'
          />
          <StyledBasicImageButton
            label='구글 로그인'
            background_color='#FFFFFF'
            onClick={() => {}}
            img_path='/icons/google_logo.png'
          />
        </SocialLoginButtons>
      </LoginForm>
    </BasicContainer>
  );
};

export default observer(Login);