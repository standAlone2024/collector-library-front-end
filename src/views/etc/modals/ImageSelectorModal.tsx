import React, { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { createSection, uploadImage } from '@api/SectionApi';
import { printLog } from '@/utils/Utils';

interface ImageSelectorModalProps {
  isVisible: boolean;
  title: string;
  userId: number | undefined;
  sectionCount: number;
  onConfirm: (s3Path: string, inputValue: string) => void;
  onCancel: () => void;
  onDelete?: () => void;
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

const ThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
  margin-top: 20px;
`;

const Thumbnail = styled.div<{ selected: boolean }>`
  width: 100%;
  height: 100px;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  border: 2px solid ${props => props.selected ? '#007bff' : 'transparent'};
  &:hover {
    border-color: #007bff;
  }
`;

const FileInput = styled.input`
  display: none;
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

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;


// const upload = async (file: File, userId: number): Promise<{ originalPath: string, thumbnailPath: string }> => {
  
//   const response = await uploadImage(file, userId);
//   if (!response) {
//     throw new Error('Image upload failed');
//   }

//   return response.json();
// };

export const ImageSelectorModal: React.FC<ImageSelectorModalProps> = ({ 
  isVisible, 
  title, 
  userId,
  sectionCount,
  onConfirm, 
  onCancel,
  onDelete,
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
      if (!selectedImage) {
        throw new Error("이미지를 선택해주세요.");
      }

      if (userId) {
        // 이미지 업로드 및 처리
        const thumbnailPath = await uploadImage(selectedImage.file, userId);
        if(thumbnailPath)
        {
          // BE call
          await createSection({
            user_id: userId,
            order: (sectionCount + 1),
            label: inputValue,
            sec_thumb_path: thumbnailPath
          });
  
          onConfirm(thumbnailPath, inputValue);
        }
        else
          throw new Error("이미지 업로드 실패");
      }

      setIsVisible(false);
    } catch (error) {
      console.error("Section 생성 중 Error가 발생했습니다:", error);
      // 에러 처리 로직
    }
  };

  const handleCancel = () => {
    onCancel();
    setIsVisible(false);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleDelete = () => {
    if(onDelete)
      onDelete();
    setIsVisible(false);
  }

  if (!isVisible) return null;

  return (
    <ModalOverlay onClick={handleCancel}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <h2>{title}</h2>
        <Button onClick={handleButtonClick}>이미지 선택</Button>
        <FileInput
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        {selectedImage && (
          <ThumbnailGrid>
            <Thumbnail
              style={{ backgroundImage: `url(${selectedImage.preview})` }}
              selected={true}
            />
          </ThumbnailGrid>
        )}
        <InputField
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Section의 이름을 입력하세요"
        />
        <ButtonContainer>
          <Button onClick={handleConfirm}>확인</Button>
          <Button onClick={handleCancel}>취소</Button>
        </ButtonContainer>
        { onDelete && <Button onClick={handleDelete}>삭제</Button> }
      </ModalContent>
    </ModalOverlay>
  );
};

export default ImageSelectorModal;