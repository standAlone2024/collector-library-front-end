import React, { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { uploadImage } from '@api/ImageApi';
import { printLog } from '@util/Utils';
import { ISection } from '@api/SectionApi';

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
      if(!section)
        return;
      let updatedSection = { ...section }; // 섹션의 복사본 생성
      if(selectedImage && userId){
        // 이미지 업로드 및 처리
        const imageResult = await uploadImage(selectedImage.file, userId);
        if(imageResult){
          updatedSection.sec_thumb_path = imageResult.thumbnail_path;
        }
      }
      updatedSection.label = inputValue as string;
      onConfirm(updatedSection);
    } catch (error) {
      console.error("Section 업데이트 중 Error가 발생했습니다:", error);
      // 에러 처리 로직
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
    if(!id)
      return;
    printLog('id ' + id);
    onDelete(id);
    // setIsVisible(false);
  }

  if (!isVisible) return null;

  printLog(section?.sec_thumb_path);

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
        {(selectedImage || section?.sec_thumb_path) && (
          <ThumbnailGrid>
            <Thumbnail
              style={{ 
                backgroundImage: selectedImage?.preview 
                  ? `url(${selectedImage.preview})` 
                  : `url(${section?.sec_thumb_path})`
              }}
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
          <Button onClick={handleCancel}>취소</Button>
          <Button onClick={() => handleUpdate(section)}>변경</Button>
        </ButtonContainer>
        <Button onClick={() => handleDelete(section?.id)}>삭제</Button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ImageUpdateDeleteModal;