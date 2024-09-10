import React, { useState, useCallback, useRef } from 'react';
import styled, { css } from 'styled-components';
import { uploadImage } from '@api/ImageApi';
import { printLog } from '@util/Utils';
import { PATH_SECTION, S3_PATH } from '@util/constans';
import { ISection } from '@api/SectionApi';
import { FiUpload, FiEdit, FiTrash2 } from 'react-icons/fi';

interface ImageUpdateDeleteProps {
  isVisible: boolean;
  title: string;
  userId: number | undefined;
  section: ISection | undefined;
  onConfirm: (section: ISection) => void;
  onCancel: () => void;
  onDelete: (id: number) => void;
  setIsVisible: (isVisible: boolean) => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: ${props => props.theme.colors.background};
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-family: ${props => props.theme.fonts.heading};
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1.5rem;
  text-align: center;
`;

const ThumbnailContainer = styled.div`
  width: 200px;
  height: 200px;
  margin: 1.5rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.secondary};
  border-radius: 8px;
`;

const Thumbnail = styled.div<{ selected: boolean }>`
  width: 100%;
  height: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  border: 2px solid ${props => props.selected ? props.theme.colors.accent : 'transparent'};
  border-radius: 8px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    border-color: ${props => props.theme.colors.accent};
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
`;

const FileInput = styled.input`
  display: none;
`;

const Button = styled.button<{ $isDelete?: boolean }>`
  padding: 0.75rem 1rem;
  margin: 0.5rem;
  background-color: ${props => props.$isDelete ? props.theme.colors.secondary : props.theme.colors.primary};
  color: ${props => props.theme.colors.background};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: ${props => props.theme.fonts.body};
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${props => props.$isDelete ? props.theme.colors.primary : props.theme.colors.accent};
  }
  svg {
    margin-right: 0.5rem;
  }
`;

const InputField = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin: 1rem 0;
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: 4px;
  font-family: ${props => props.theme.fonts.body};
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

export const ImageUpdateDeleteModal: React.FC<ImageUpdateDeleteProps> = ({ 
  isVisible, 
  title, 
  userId,
  section,
  onConfirm, 
  onCancel,
  onDelete,
  setIsVisible 
}) => {
  const [selectedImage, setSelectedImage] = useState<{ file: File, preview: string } | null>(null);
  const [inputValue, setInputValue] = useState(section?.label);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage({
        file,
        preview: URL.createObjectURL(file)
      });
    }
  }, []);

  const handleUpdate = async (section: ISection | undefined) => {
    try {
      if(!section) return;
      let updatedSection = { ...section };
      if(selectedImage && userId){
        const imageResult = await uploadImage(selectedImage.file, userId, PATH_SECTION);
        if(imageResult){
          updatedSection.sec_thumb_path = imageResult.thumbnail_path;
        }
      }
      updatedSection.label = inputValue as string;
      onConfirm(updatedSection);
    } catch (error) {
      console.error("Section 업데이트 중 Error가 발생했습니다:", error);
    } finally {
      setIsVisible(false);
    }
  };

  const handleCancel = () => {
    onCancel();
    setIsVisible(false);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleDelete = (id: number | undefined) => {
    if(!id) return;
    onDelete(id);
  }

  if (!isVisible) return null;

  printLog(section);

  return (
    <ModalOverlay onClick={handleCancel}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <Title>{title}</Title>
        <Button onClick={handleButtonClick}>
          <FiUpload />
          이미지 선택
        </Button>
        <FileInput
          key={selectedImage ? selectedImage.preview : "fileInputKey"}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        {(selectedImage || section?.sec_thumb_path) && (
          <ThumbnailContainer>
            <Thumbnail
              style={{ 
                backgroundImage: selectedImage?.preview 
                  ? `url(${selectedImage.preview})` 
                  : `url(${(S3_PATH + section?.sec_thumb_path)})`
              }}
              selected={true}
            />
          </ThumbnailContainer>
        )}
        <InputField
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Section의 이름을 입력하세요"
        />
        <ButtonContainer>
          <Button onClick={handleCancel}>취소</Button>
          <Button onClick={() => handleUpdate(section)}>
            <FiEdit />
            수정
          </Button>
          <Button onClick={() => handleDelete(section?.id)} $isDelete>
            <FiTrash2 />
            삭제
          </Button>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ImageUpdateDeleteModal;