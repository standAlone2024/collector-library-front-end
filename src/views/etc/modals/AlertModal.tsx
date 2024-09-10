import React from 'react';
import styled from 'styled-components';
import BaseModal from './BaseModal';

const Title = styled.h2`
  margin-top: 0;
`;

const Message = styled.p`
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

interface AlertModalProps {
  isVisible: boolean,
  title: string;
  message: string;
  onConfirm: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({ isVisible, title, message, onConfirm }) => {
  if (!isVisible) return null;

  return (
    <BaseModal onClose={onConfirm}>
      <Title>{title}</Title>
      <Message>{message}</Message>
      <Button onClick={onConfirm}>OK</Button>
    </BaseModal>
  );
};

export default AlertModal;