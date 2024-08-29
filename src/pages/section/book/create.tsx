import { BasicBook } from '@view/templates';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import styled from 'styled-components';
import { useError } from '@view/etc';
import { authStore, bookStore } from '@/stores';
import { createBook, IBook } from '@/apis/BookApi';
import AlertModal from '@view/etc/modals/AlertModal';
import { printLog } from '@/utils/Utils';

const Container = styled.div`
  position: absolute;
  top: 55px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;
  margin: 0.5rem;
  overflow: auto;
`;

const LibraryBookCreate: React.FC = observer(() => {
    const router = useRouter();
    const { setErrorState } = useError();
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [sectionId, setSectionId] = useState(0);

    useEffect(() => {
        const initAllData = async() => {
            if (!router.isReady) return;

            const sectionId = router.query.sectionId;
            if (!sectionId || Array.isArray(sectionId)) {
                setErrorState(new Error("잘못된 접근입니다."), "잘못된 접근입니다.");
                router.push('/section/list');
                return;
            }
            setSectionId(Number(sectionId));
            try{
                if(authStore.isLoading)
                    await authStore.loadUser();
            }catch(err) {

            }
        }

        initAllData();
    }, [router, router.isReady, router.query.sectionId, setErrorState]);


    const handleOnCreate = async(title: string, thumb_path?: string, description?: string) => {
        printLog('Click 완료 ' + title.length);
        if(!title || title.length === 0)
            setErrorState(new Error("No title"), "제목은 필수값입니다.");
        setIsLoading(true);
        const numberOfBook = bookStore.getBooks.length;
        printLog(sectionId, numberOfBook, title);
        const book = makeBook(sectionId, numberOfBook, title, thumb_path, description);
        if(book)
        {
            try{
                const id = await createBook(book);
                if(id)
                    setIsModalVisible(true);
            }catch (err) {
                if(err instanceof Error)
                    setErrorState(err, "데이터 생성 실패");
                else
                    setErrorState(new Error('An unknown error occurred'));
            }
        }
        setIsLoading(false);
    }

    const handleConfirm = () => {
        Router.push(`/section/book/list?sectionId=${sectionId}`);
        setIsModalVisible(false);
    }

    const makeBook = (sectionId: number, numberOfBook: number, title: string, thumb_path?: string, description?: string) => {
        printLog(sectionId, numberOfBook, title);
        //주의! JavaScript에서 0은 falsy 값입니다. 따라서 !0은 true가 된다.
        if(!sectionId || typeof numberOfBook !== 'number' || !title)
        {
            setErrorState(new Error("Book need more information"), "필수값이 모두 입력되지 않았습니다.");
            return null;
        }
        const book: IBook = {
            section_id: sectionId,
            order: (numberOfBook + 1),
            title,
            book_thumb_path: thumb_path,
            description,
        };
        return book;
    }

    if(authStore.isLoading || isLoading)
        return <Container><p>Loading...</p></Container>;

    return (
        <Container>
            <BasicBook
                userId={authStore.user?.id as number}
                onCreate={handleOnCreate}
                //여기 OptLabel의 data를 받아서 넣어야 함
            />
            <AlertModal 
                isVisible={isModalVisible}
                title='데이터 생성'
                message='데이터 생성이 완료되었습니다.'
                onConfirm={handleConfirm}
            />
        </Container>
    )
});

export default LibraryBookCreate;