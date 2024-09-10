import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BasicContainer } from '@view/atoms';
import { fetchBook, IBookDeatil } from '@api/BookApi'
import { observer } from 'mobx-react-lite';
import { authStore, bookStore } from '@store';
import Router, { useRouter } from 'next/router';
import { useError } from '@view/etc';
import { S3_PATH } from '@util/constans';
import { printLog, swapOriginal } from '@/utils/Utils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  gap: 20px;
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

const Content = styled.div`
  flex: 2;
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
  background-color: #f0f0f0;
  color: #333;
  cursor: default;

  &:focus {
    outline: none;
    box-shadow: none;
  }
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

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;
interface ReadOnlyTextAreaProps {
    value: string;
}
  
const ReadOnlyTextArea: React.FC<ReadOnlyTextAreaProps> = ({ value }) => {
    return <TextArea value={value} readOnly />;
};

const handleMove = (bookId: number) => {
    Router.push(`/section/book/update?bookId=${bookId}`);
}

const LibraryBookRead: React.FC = observer(() => {
    const router = useRouter();
    const { setErrorState } = useError();
    const [bookData, setBookData] = useState<IBookDeatil | null>(null);
    const [isLoading, setIsLoading] = useState(true);

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
    
    if(isLoading || !bookData)
        return (<BasicContainer isAlignCenter={true}><p>Loading book info...</p></BasicContainer>);

    return (
        <BasicContainer isAlignCenter={true}>
            <Container>
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
                <LabelContainer>
                    <Label>제목</Label>
                    <Content>{bookData.label_basic.title}</Content>
                </LabelContainer>
                {bookData.label_extra?.map((item, index) => (
                    <LabelContainer key={index}>
                        <Label>{item.label_name}</Label>
                        <Content>{item.content}</Content>
                    </LabelContainer>
                ))}
                <ReadOnlyTextArea value={bookData.label_basic.description || ''} />
                <ButtonContainer>
                    <Button onClick={() => handleMove(bookData.id)}>수정</Button>
                    <Button>인스타 공유</Button>
                </ButtonContainer>
            </Container>
        </BasicContainer>
    )
});

export default LibraryBookRead;