import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { uploadImage } from '@api/ImageApi';
import { PATH_BOOK } from '@util/constans'
import { printLog } from "@/utils/Utils";

interface BasicBookProps {
    userId: number,
    onCreate: (title: string, thumb_path?: string, description?: string) => Promise<void>;
    children?: React.ReactNode;
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
    userId, onCreate, children
}) => {
    const [selectedImage, setSelectedImage] = useState<{ file: File, preview: string } | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSelectorClick = () => {
        fileInputRef.current?.click();
    }

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          setSelectedImage({
            file,
            preview: URL.createObjectURL(file)
          });
        }
      }, []);

    const hanleModify = async() => {
        try{
            let s3Path = '';
            if(userId)
            {
                if (selectedImage?.file)
                {
                    const imageResult = await uploadImage(selectedImage.file, userId, PATH_BOOK);
                    if(imageResult){
                      printLog(imageResult.extracted_text);
                      s3Path = imageResult.thumbnail_path;
                    }
                    else
                        setError("이미지 업로드 실패");
                }
                await onCreate(title, s3Path, description);
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
                    ref={fileInputRef} />
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="이름을 입력하세요."
                />
            </ContainerImageArea>
            {children}
            <InputField
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="감상을 입력하세요."
            />
            <Button onClick={hanleModify}>완료</Button>
        </Container>
    );
}