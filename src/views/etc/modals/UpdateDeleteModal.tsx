import React, { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { printLog } from '@util/Utils';
import { IBook } from '@api/BookApi';

interface UpdateDeleteProps {
  isVisible: boolean;
  title: string;
  book: IBook | undefined;
  onUpdate: (book: IBook) => Promise<void>;
  onCancel?: () => void;
  onDelete: (id: number) => Promise<void>;
  onShare: () => Promise<void>;
  setIsVisible: (isVisible: boolean) => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 30%;
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
`;

const Button = styled.button`
  padding: 10px 15px;
  margin: 0 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

export const UpdateDeleteModal: React.FC<UpdateDeleteProps> = ({ 
  isVisible, 
  title, 
  book,
  onUpdate, 
  onCancel,
  onDelete,
  setIsVisible 
}) => {
  const handleUpdate = async (book: IBook | undefined) => {
    if(!book)
        return;
    onUpdate(book);
    setIsVisible(false);
  };

  const handleCancel = () => {
    if(onCancel)
      onCancel();
    setIsVisible(false);
  };

  const handleDelete = (id: number | undefined) => {
    if(!id)
      return;
    onDelete(id);
    setIsVisible(false);
  }

  if (!isVisible) return null;

  return (
    <ModalOverlay onClick={handleCancel}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <h2>{title}</h2>
        <ButtonContainer>
          <Button onClick={handleCancel}>취소</Button>
          <Button onClick={() => handleUpdate(book)}>수정</Button>
        </ButtonContainer>
        <Button onClick={() => handleDelete(book?.id)}>삭제</Button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default UpdateDeleteModal;