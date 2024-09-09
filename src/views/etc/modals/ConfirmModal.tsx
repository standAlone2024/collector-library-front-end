import React from 'react';
import styled from 'styled-components';
import BaseModal from './BaseModal';

const ModalContent = styled.div`
  background-color: ${props => props.theme.colors.background};
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-family: ${props => props.theme.fonts.heading};
  color: ${props => props.theme.colors.primary};
  margin-top: 0;
  margin-bottom: 1rem;
  text-align: center;
`;

const Message = styled.p`
  font-family: ${props => props.theme.fonts.body};
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: ${props => props.theme.fonts.body};
  font-size: 1rem;
  transition: background-color 0.3s ease;
`;

const ConfirmButton = styled(Button)`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.background};
  &:hover {
    background-color: ${props => props.theme.colors.accent};
  }
`;

const CancelButton = styled(Button)`
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.background};
  &:hover {
    background-color: ${props => props.theme.colors.primary};
  }
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

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ 
  isVisible, 
  title, 
  message, 
  cancelName, 
  confirmName, 
  onConfirm, 
  onCancel 
}) => {
  if (!isVisible) return null;
  return (
    <BaseModal onClose={onCancel}>
      <ModalContent>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <ButtonContainer>
          <CancelButton onClick={onCancel}>{cancelName}</CancelButton>
          <ConfirmButton onClick={onConfirm}>{confirmName}</ConfirmButton>
        </ButtonContainer>
      </ModalContent>
    </BaseModal>
  );
};

export default ConfirmModal;