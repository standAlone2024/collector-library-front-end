import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { uploadImage, storeExtractedText, getStoredExtractedText, IStoredImageData } from '@api/ImageApi';
import { PATH_BOOK } from '@util/constans'
import { printLog } from "@util/Utils";

interface BasicBookProps {
  userId: number,
  onCreate: (title: string, thumb_path?: string, description?: string, extracted_text?: string[]) => Promise<void>,
  onExtractedTextChange: (text: string[]) => void,
  onInputChange: (name: string, value: string) => void,
  onInputFocus: (name: string) => void,
  inputValues: {[key: string]: string},
  children: React.ReactNode,
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px; 
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

const ContainerImageArea = styled.div`
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

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const BasicBook: React.FC<BasicBookProps> = ({
  userId, onCreate, onExtractedTextChange, onInputChange, onInputFocus, inputValues, children
}) => {
  const [selectedImage, setSelectedImage] = useState<{ file: File, preview: string } | null>(null);
  const [uploadHistory, setUploadHistory] = useState<IStoredImageData | null>(null);
  const [isClickUpload, setIsClickUpload] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);



  const handleSelectorClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    printLog("click 이미지 선택");
    if(fileInputRef.current)
      fileInputRef.current.click();
  }

  const handleFileChange = useCallback(async(event: React.ChangeEvent<HTMLInputElement>) => {
    printLog("handleFileChange");
    setIsClickUpload(false);
    const file = event.target.files?.[0];
    if (file) {
      try{
        // const storeExtractedText = await getStoredExtractedText(file);
        const storedImageData = await getStoredExtractedText(file);
        if(storedImageData){
          printLog("Using stored extracted text");
          setUploadHistory(storedImageData);
          onExtractedTextChange(storedImageData.extractedText);
        }
        else{
          setUploadHistory(null);
          onExtractedTextChange([]);
        }
      }catch(err) {
        // printLog("Error getting stored extracted text:", error);
        setError("Error getting stored extracted text.");
        onExtractedTextChange([]);
        onExtractedTextChange([]);
      }finally{
        setSelectedImage({
          file,
          preview: URL.createObjectURL(file)
        });
      }
    }
  }, [onExtractedTextChange]);

  const onUploadImage = async(file: File, userId: number) => {
    try{
      const imageResult = await uploadImage(file, userId, PATH_BOOK);
      if(imageResult)
      {
        const extracted_text = (imageResult.extracted_text) ? imageResult.extracted_text : [];
        setUploadHistory({
          s3Path: imageResult.thumbnail_path, 
          extractedText: extracted_text,
        });
        onExtractedTextChange(extracted_text);
        storeExtractedText(file, imageResult.thumbnail_path, extracted_text);
      }
    }catch(err) {
      setUploadHistory(null);
      onExtractedTextChange([]);
      setError("이미지 업로드 실패");
    }
  }

  const handleUpload = async() => {
    try{
      if(userId && selectedImage?.file){
        const storedImageData = await getStoredExtractedText(selectedImage.file);
        if(storedImageData)
        {
          setUploadHistory(storedImageData);
          onExtractedTextChange(storedImageData.extractedText);
        }
        else
          await onUploadImage(selectedImage.file, userId);
      }
    }catch(err) {
      setUploadHistory(null);
      onExtractedTextChange([]);
      setError("이미지 업로드 handle 실패");
    }finally{
      setIsClickUpload(true);
    }
  }

  const hanleCreate = async() => {
      try{

        if(userId && selectedImage?.file){
          if(selectedImage)
            await onCreate(inputValues.title, uploadHistory?.s3Path, inputValues.description, uploadHistory?.extractedText);
          else{
            setError("선택된 이미지가 없습니다.");
          }
        }
      }catch(err) {
          setError("데이터 생성에 실패했습니다.");
      }
  }
    
  return (
      <Container>
        <ContainerImageArea onClick={e => e.stopPropagation()}>
          <Button onClick={handleSelectorClick}>이미지 선택</Button>
          <FileInput
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          {selectedImage && (
            <>
              <ThumbnailGrid>
                  <Thumbnail
                  style={{ backgroundImage: `url(${selectedImage.preview})` }}
                  selected={true}
                  />
              </ThumbnailGrid>
              <Button onClick={handleUpload}>이미지 업로드</Button>
            </>
          )}
          <InputField
            type="text"
            name="title"
            value={inputValues.title}
            onChange={(e) => onInputChange('title', e.target.value)}
            onFocus={() => onInputFocus('title')}
            placeholder="이름을 입력하세요."
          />
          </ContainerImageArea>
          {children}
          <InputField
            type="text"
            name="description"
            value={inputValues.description}
            onChange={(e) => onInputChange('description', e.target.value)}
            onFocus={() => onInputFocus('description')}
            placeholder="감상을 입력하세요."
          />
          {/* {isClickUpload && <Button onClick={hanleCreate}>완료</Button>} */}
          <Button onClick={hanleCreate}>완료</Button>
        </Container>
    );
}