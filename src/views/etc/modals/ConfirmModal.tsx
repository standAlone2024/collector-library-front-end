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
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ title, message, onConfirm, onCancel }) => {
  return (
    <BaseModal onClose={onCancel}>
      <Title>{title}</Title>
      <Message>{message}</Message>
      <ButtonContainer>
        <CancelButton onClick={onCancel}>Cancel</CancelButton>
        <ConfirmButton onClick={onConfirm}>Confirm</ConfirmButton>
      </ButtonContainer>
    </BaseModal>
  );
};

export default ConfirmModal;