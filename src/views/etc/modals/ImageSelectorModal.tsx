import React, { useState, useCallback, useRef } from 'react';
import styled, { css } from 'styled-components';
import { uploadImage } from '@api/ImageApi';
import { PATH_SECTION } from '@util/constans';
import { FiUpload, FiX } from 'react-icons/fi';

interface ImageSelectorModalProps {
  isVisible: boolean;
  title: string;
  userId: number | undefined;
  sectionCount: number;
  onConfirm: (s3Path: string, inputValue: string, user_id: number, order: number) => void;
  onCancel: () => void;
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
  align-items: center;
  justify-content: center;
`;

const ModalTitle = styled.h2`
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
  background-color: #f0f0f0; // 배경색 추가
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

const InputField = styled.input`
  width: 90%;
  padding: 0.75rem;
  margin: 1.5rem 0;
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: 4px;
  font-family: ${props => props.theme.fonts.body};
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const buttonStyles = css`
  padding: 0.75rem 1rem;
  background-color: ${props => props.theme.colors.primary};
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
    background-color: ${props => props.theme.colors.accent};
  }
  svg {
    margin-right: 0.5rem;
  }
`;

const ImageUploadButton = styled.button`
  ${buttonStyles}
  align-self: center;
  margin-bottom: 1.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  width: 95%;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  ${buttonStyles}
  flex: 1; 
  align-self: center;
  margin-bottom: 1.5rem;
`;

export const ImageSelectorModal: React.FC<ImageSelectorModalProps> = ({ 
  isVisible, 
  title, 
  userId,
  sectionCount,
  onConfirm, 
  onCancel,
  setIsVisible 
}) => {
  const [selectedImage, setSelectedImage] = useState<{ file: File, preview: string } | null>(null);
  const [inputValue, setInputValue] = useState('');
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

  const handleConfirm = async () => {
    try {
      if (!inputValue) {
        throw new Error("섹션 이름은 필수값입니다.");
      }

      let thumbnailPath = '';
      if (userId) {
        if (selectedImage?.file) {
          const imageResult = await uploadImage(selectedImage.file, userId, PATH_SECTION);
          if (imageResult) {
            thumbnailPath = imageResult.thumbnail_path;
          } else {
            throw new Error("이미지 업로드 실패");
          }
        }
        onConfirm(thumbnailPath, inputValue, userId, (sectionCount+1));
      }
    } catch (error) {
      console.error("섹션 생성 중 오류가 발생했습니다:", error);
    }
  };

  const handleCancel = () => {
    onCancel();
    setIsVisible(false);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  if (!isVisible) return null;

  return (
    <ModalOverlay onClick={handleCancel}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ModalTitle>{title}</ModalTitle>
        <ImageUploadButton onClick={handleButtonClick}>
          <FiUpload />
          이미지 선택
        </ImageUploadButton>
        <FileInput
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        {selectedImage && (
          <ThumbnailContainer>
            <Thumbnail
              style={{ backgroundImage: `url(${selectedImage.preview})` }}
              selected={true}
            />
          </ThumbnailContainer>
        )}
        <InputField
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="섹션의 이름을 입력하세요"
        />
        <ButtonContainer>
          <ActionButton onClick={handleCancel}><FiX />취소</ActionButton>
          <ActionButton onClick={handleConfirm}>확인</ActionButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ImageSelectorModal;