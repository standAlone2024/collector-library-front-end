import React, { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';

interface ImageSelectorModalProps {
  isVisible: boolean;
  title: string;
  onConfirm: (selectedImages: { path: string; name: string }[], inputValue: string) => void;
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

const ImageSelectorModal: React.FC<ImageSelectorModalProps> = ({ 
  isVisible, 
  title, 
  onConfirm, 
  onCancel,
  onDelete,
  setIsVisible 
}) => {
  const [images, setImages] = useState<{ path: string; name: string }[]>([]);
  const [selectedImages, setSelectedImages] = useState<{ path: string; name: string }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => ({
        path: URL.createObjectURL(file),
        name: file.name
      }));
      setImages(prevImages => [...prevImages, ...newImages]);
    }
  }, []);

  const handleImageSelect = useCallback((image: { path: string; name: string }) => {
    setSelectedImages(prev => {
      const isAlreadySelected = prev.some(img => img.path === image.path);
      if (isAlreadySelected) {
        return prev.filter(img => img.path !== image.path);
      } else {
        return [...prev, image];
      }
    });
  }, []);

  const handleConfirm = () => {
    onConfirm(selectedImages, inputValue);
    setIsVisible(false);
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
        <Button onClick={handleButtonClick}>Choose Images</Button>
        <FileInput
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        <ThumbnailGrid>
          {images.map((image, index) => (
            <Thumbnail
              key={index}
              style={{ backgroundImage: `url(${image.path})` }}
              onClick={() => handleImageSelect(image)}
              selected={selectedImages.some(img => img.path === image.path)}
            />
          ))}
        </ThumbnailGrid>
        <InputField
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter additional information"
        />
        <ButtonContainer>
          <Button onClick={handleConfirm}>확인</Button>
          <Button onClick={handleCancel}>취소</Button>
        </ButtonContainer>
        {(onDelete) && (
          <Button onClick={handleConfirm}>삭제</Button>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default ImageSelectorModal;