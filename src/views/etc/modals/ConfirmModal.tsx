import React from 'react';
import styled from 'styled-components';
import BaseModal from './BaseModal';

const Title = styled.h2`
  margin-top: 0;
`;

const Message = styled.p`
  margin-bottom: 20px;
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

const ConfirmButton = styled(Button)`
  background-color: #28a745;
  color: white;
`;

const CancelButton = styled(Button)`
  background-color: #dc3545;
  color: white;
`;

interface ConfirmModalProps {
  isVisible: boolean;
  title: string;
  message: string;
  cancelName: string;
  confirmName: string;
  onConfirm: () => void;
  onCancel: () => void;
  setIsVisible: (isVisible: boolean) => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ isVisible, title, message, cancelName, confirmName, onConfirm, onCancel }) => {
  if (!isVisible) return null;
  return (
    <BaseModal onClose={onCancel}>
      <Title>{title}</Title>
      <Message>{message}</Message>
      <ButtonContainer>
        <CancelButton onClick={onCancel}>{cancelName}</CancelButton>
        <ConfirmButton onClick={onConfirm}>{confirmName}</ConfirmButton>
      </ButtonContainer>
    </BaseModal>
  );
};

export default ConfirmModal;