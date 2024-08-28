import React, { useEffect, useState } from 'react';
import { BasicButton, BasicThumbnailProps } from '@view/atoms';
import { ThumbListComponent, SearchComponent } from '@view/compoments';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import Router, { useRouter } from 'next/router';
import { searchBooks, fetchBookList } from '@api/BookApi';
import { authStore, bookStore } from '@store';
import { useError } from '@view/etc';

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

const LibraryBooks: React.FC = observer(() => {
    const router = useRouter();
    const { setErrorState } = useError();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAllData = async () => {
            if (!router.isReady) return;

            const sectionId = router.query.sectionId;
            if (!sectionId || Array.isArray(sectionId)) {
                setErrorState(new Error("잘못된 접근입니다."), "잘못된 접근입니다.");
                router.push('/section/list');
                return;
            }

            try {
                if (authStore.isLoading) {
                    await authStore.loadUser();
                }
                if (!authStore.isLoading && authStore.user) {
                    await fetchBookList(Number(sectionId));
                    setIsLoading(false);
                }
            } catch (error) {
                setErrorState(error as Error, "데이터를 불러오는데 실패했습니다.");
                router.push('/section/list');
            }
        };

        initAllData();
    }, [router, router.isReady, router.query.sectionId, setErrorState]);

    const handleSearch = async (keyword: string, condition?: number) => {
        if(!condition) return;
        return await searchBooks(condition, keyword);
    };

    const handleMove = () => {
        Router.push('/section/book/create');
    };

    const handleMenu = () => {
        alert("Show Modal");
    };

    if (isLoading) {
        return <Container><p>Loading...</p></Container>;
    }

    const thumbnails: BasicThumbnailProps[] = bookStore.books.map(book => ({
        label: book.title,
        target_id: book.id as number,
        menu_click_event: handleMenu,
        thumb_img_url: book.book_thumb_path,
        background_color: '#FFFFFF',
        move_to_where: `/section/book/read?bookId=${book.id}`,
    }));

    return (
        <Container>
            <SearchComponent 
                handleSearch={handleSearch}
                move_path='/section/book/read'
                condition={Number(router.query.sectionId as string)}
            />
            <ThumbListComponent thumbnails={thumbnails} />
            <BasicButton background_color={'green'} label={'Book 추가'} onClick={handleMove} />
        </Container>
    );
});

export default LibraryBooks;