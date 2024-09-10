// InputModal.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import BaseModal from './BaseModal';

const Title = styled.h2`
  margin-top: 0;
`;

const Message = styled.p`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-left: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const SubmitButton = styled(Button)`
  background-color: #28a745;
  color: white;
`;

const CancelButton = styled(Button)`
  background-color: #dc3545;
  color: white;
`;

interface InputModalProps {
  isVisible: boolean,
  title: string;
  message: string;
  onSubmit: (input: string) => void;
  onCancel: () => void;
}

const InputModal: React.FC<InputModalProps> = ({ isVisible, title, message, onSubmit, onCancel }) => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    onSubmit(input);
    setInput('');
  };

  if (!isVisible) return null;

  return (
    <BaseModal onClose={onCancel}>
      <Title>{title}</Title>
      <Message>{message}</Message>
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="여기에 입력해 주세요"
      />
      <ButtonContainer>
        <CancelButton onClick={onCancel}>취소</CancelButton>
        <SubmitButton onClick={handleSubmit}>확인</SubmitButton>
      </ButtonContainer>
    </BaseModal>
  );
};

export default InputModal;