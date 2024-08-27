import React, { Suspense, useEffect, useState } from 'react';
import { BasicButton, BasicThumbnailProps } from '@view/atoms';
import { ThumbListComponent, SearchComponent } from '@view/compoments';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import Router, { useRouter } from 'next/router';
import { searchBooks, fetchBookList } from '@api/BookApi';
import { authStore, bookStore } from '@store';
import { useError } from '@view/etc';
import { printLog } from '@/utils/Utils';

const Container = styled.div`
  position: absolute;
  top: 55px; // Top 영역의 높이만큼 내림
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 1rem; // Top 영역과의 여백 확보
  margin: 0.5rem;
  overflow: auto;
//   background-color: red;
`;

const handleMove = () => {
    Router.push('/section/book/create');
}

const handleSearch = async(keyword: string, condition?: number) => {
    if(!condition)
        return;
    return await searchBooks(condition, keyword);
}

const LibraryBooks: React.FC = observer(() => {
    const router = useRouter();
    const { setErrorState } = useError();
    const { sectionId } = router.query;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAllData = async() => {
            if (!router.isReady) 
                return;

            if(authStore.isLoading)
                await authStore.loadUser();

            if(!authStore.isLoading && authStore.user)
            {
                if(!sectionId)
                {
                    setErrorState(new Error("잘못된 접근입니다."), "잘못된 접근입니다.");
                    router.push('/section/list');
                    return;                    
                }
                // printLog('sectionId: ' + sectionId);
                try {
                    await fetchBookList(Number.parseInt(sectionId as string));
                } catch (error) {
                    setErrorState(error as Error, "책 목록을 불러오는데 실패했습니다.");
                }
            }
            setIsLoading(false);
        }
        initAllData();
    }, [sectionId, router, setErrorState]);

    const handleMenu = () => {
        //수정, 취소, 삭제 Modal
        alert("Show Modal");
    }
    const thumbnails: BasicThumbnailProps[] = bookStore.books.map(book => ({
        label: book.title,
        target_id: book.id as number,
        menu_click_event: handleMenu,
        thumb_img_url: book.book_thumb_path,
        background_color: '#FFFFFF',
        move_to_where: `/section/book/read?bookId=${book.id}`,
    }));

    if (isLoading) {
        return <Container><p>Loading...</p></Container>;
    }

    return (
        <Container>
            {authStore.user ? (
                <>
                    <p>Welcome, {authStore.user.email}</p>
                    {bookStore.loading ? (
                        <p>Loading sections...</p>
                    ) : (
                        <>
                            {/* <SearchComponent 
                                handleSearch={ handleSearch }
                                move_path='/section/book/read'
                                condition={Number.parseInt(sectionId as string)}
                            /> */}
                            <Suspense fallback={<div>Loading button...</div>}>
                                <ThumbListComponent thumbnails={thumbnails} />
                            </Suspense>
                            <BasicButton background_color={'green'} label={'Book 추가'} onClick={handleMove} />
                        </>
                    )}
                </>
                
            ) : (
                <p>Loading...</p>
            )}
            
        </Container>
    )
});

export default LibraryBooks;