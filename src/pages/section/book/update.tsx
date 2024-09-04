import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { BasicContainer, BasicInput } from '@view/atoms';
import { fetchBook, IBookDeatil } from '@api/BookApi'
import { observer } from 'mobx-react-lite';
import { authStore, bookStore } from '@store';
import Router, { useRouter } from 'next/router';
import { useError } from '@view/etc';
import { S3_PATH } from '@util/constans';
import { printLog, swapOriginal } from '@/utils/Utils';

interface ContainerProps {
    $hasFloatingArea: boolean;
  }
  
  const Container = styled.div<ContainerProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    gap: 20px;
    padding-bottom: ${props => props.$hasFloatingArea ? '180px' : '0'}; // FloatingArea가 있을 때만 padding 적용
  `;

const ImageContainer = styled.div`
  width: 100%;
  height: 300px;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;
  position: relative; // 배경 이미지를 위해 추가
`;

const StyledImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; // 이미지 비율을 유지하면서 전체가 표시되도록 함
  position: relative; // 배경 이미지 위에 표시되도록 함
  z-index: 1; // 배경 이미지 위에 표시되도록 함
`;

const BackgroundImage = styled.div<{ src: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  filter: blur(10px); // 배경 흐림 효과
  opacity: 0.5; // 배경 투명도
`;

const LabelContainer = styled.div`
display: flex;
  flex-direction: row;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Label = styled.div`
  flex: 1;
  padding: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  resize: none;
  color: #333;
  cursor: default;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const FloatingArea = styled.div`
  position: fixed;
  bottom: 7vh; // BasicContainer의 bottom 값과 일치
  left: 0;
  right: 0;
  height: 150px;
  background-color: white;
  padding: 10px 15px;
  overflow-y: auto;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;

const ExtractedTextGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  padding: 10px 0;
`;

const ExtractedTextButton = styled.button`
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const handleUpdate = () => {
    alert('update api call');
}

const handleImageDelete = () => {
    alert('delete image api call');
}

const handleImageChange = () => {
    alert('change image api call');
}

const LibraryBookUpdate: React.FC = observer(() => {
    const router = useRouter();
    const { setErrorState } = useError();
    const [bookData, setBookData] = useState<IBookDeatil | null>(null);
    const [updatedBookData, setUpdatedBookData] = useState<IBookDeatil | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const [extractedText, setExtractedText] = useState<string[]>([]);

    const handleInputFocus = (inputName: string) => {
        setFocusedInput(inputName);
    };

    useEffect(() => {
        const initAllDate = async () => {
            if (!router.isReady) return;

            const bookId = router.query.bookId;

            if(!bookId || Array.isArray(bookId)) {
                setErrorState(new Error("잘못된 접근입니다."), "잘못된 접근입니다.");
                router.push('/section/list');
                return;
            }

            try{
                if(authStore.isLoading)
                    await authStore.loadUser();
                
                if(!authStore.isLoading && authStore.user)
                {
                    await fetchBook(Number(bookId));
                    setBookData(bookStore.getBookDetail());
                    const bookDetail = bookStore.getBookDetail();
                    if(bookDetail)
                    {
                        setUpdatedBookData(bookDetail);
                        if(bookDetail.extracted_text)
                            setExtractedText(bookDetail.extracted_text);
                    }
                    setIsLoading(false);
                }
            }catch(err) {
                if(err instanceof Error)
                    setErrorState(err, "데이터 로드 실패");
                else
                    setErrorState(new Error('An unknown error occurred'));
            }
        };

        initAllDate();
    }, [router, router.isReady, router.query.bookId, setErrorState]);

    let originPath = '';
    if(bookData?.book_thumb_path)
        originPath = swapOriginal(bookData?.book_thumb_path);

    const handleContentChange = (key: string, value: string) => {
        if (updatedBookData) {
            if (key === 'title') {
                setUpdatedBookData({
                    ...updatedBookData,
                    label_basic: { ...updatedBookData.label_basic, title: value }
                });
            } else {
                const updatedLabelExtra = updatedBookData.label_extra?.map(item =>
                    item.label_name === key ? { ...item, content: value } : item
                );
                setUpdatedBookData({ ...updatedBookData, label_extra: updatedLabelExtra });
            }
        }
    };

    const handleOnChangeContent = (newDescription: string) => {
        if (updatedBookData) {
            setUpdatedBookData({
              ...updatedBookData,
              label_basic: { ...updatedBookData.label_basic, description: newDescription }
            });
        }
    }

    const handleExtractedTextClick = (text: string) => {
        if (focusedInput && updatedBookData) {
            let currentValue = '';
            if (focusedInput === 'title') {
                currentValue = updatedBookData.label_basic.title;
            } else {
                const extraLabel = updatedBookData.label_extra?.find(item => item.label_name === focusedInput);
                if (extraLabel) {
                    currentValue = extraLabel.content;
                }
            }
            
            const newValue = currentValue.length > 0 ? `${currentValue} ${text}` : text;
            handleContentChange(focusedInput, newValue);
        }
    };

    const hasFloatingArea = extractedText.length > 0;
    
    if(isLoading || !bookData)
        return (<BasicContainer isAlignCenter={true}><p>Loading book info...</p></BasicContainer>);

    return (
            <BasicContainer>
                <Container $hasFloatingArea={hasFloatingArea}>
                    <ImageContainer>
                        {originPath.length > 0 ? (
                            <>
                                <BackgroundImage src={S3_PATH + (originPath)} />
                                <StyledImage src={S3_PATH + (originPath)} alt="Book" />
                            </>
                        ) : (
                            <>
                                <BackgroundImage src='/icons/no_photography.png' />
                                <StyledImage src='/icons/no_photography.png' alt="Book" />
                            </>
                        )}
                    </ImageContainer>
                    <ButtonContainer>
                        <Button onClick={handleImageChange}>이미지 변경</Button>
                        <Button onClick={handleImageDelete}>삭제</Button>
                    </ButtonContainer>
                    <LabelContainer>
                        <Label>제목</Label>
                        <BasicInput
                            value={updatedBookData?.label_basic.title || ''}
                            onChange={(value) => handleContentChange('title', value)}
                            onFocus={() => handleInputFocus('title')}
                        />
                    </LabelContainer>
                    {updatedBookData?.label_extra?.map((item, index) => (
                        <LabelContainer key={index}>
                            <Label>{item.label_name}</Label>
                            <BasicInput
                                value={item.content}
                                onChange={(value) => handleContentChange(item.label_name, value)}
                                onFocus={() => handleInputFocus(item.label_name)}
                            />
                        </LabelContainer>
                    ))}
                    <TextArea 
                        value={updatedBookData?.label_basic.description || ''} 
                        onChange={(e) => handleOnChangeContent(e.target.value)}
                    />
                    <Button onClick={handleUpdate}>완료</Button>
                </Container>
            {extractedText.length > 0 && (
                <FloatingArea>
                    <h4>추출된 텍스트:</h4>
                    <ExtractedTextGrid>
                        {extractedText.map((text, index) => (
                            <ExtractedTextButton 
                                key={index}
                                onClick={() => handleExtractedTextClick(text)} >
                                {text}
                            </ExtractedTextButton>
                        ))}
                    </ExtractedTextGrid>
                </FloatingArea>
            )}
        </BasicContainer>
    )
});

export default LibraryBookUpdate;