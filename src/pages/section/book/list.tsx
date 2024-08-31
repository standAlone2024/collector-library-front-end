import React, { useEffect, useState } from 'react';
import { BasicButton, BasicContainer, BasicThumbnailProps } from '@view/atoms';
import { ThumbListComponent, SearchComponent } from '@view/compoments';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import Router, { useRouter } from 'next/router';
import { searchBooks, fetchBookList, deleteBook, updateBook } from '@api/BookApi';
import { authStore, bookStore } from '@store';
import { ConfirmModal, UpdateDeleteModal, useError } from '@view/etc';

const LibraryBooks: React.FC = observer(() => {
    const router = useRouter();
    const { setErrorState } = useError();
    const [isLoading, setIsLoading] = useState(true);
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);
    const [isUDModalVisible, setIsUDModalVisible] = useState(false);
    const [isUpdateMode, setUpdateMode] = useState<boolean | null>(null);
    const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

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
        Router.push(`/section/book/create?sectionId=${router.query.sectionId}`);
    };

    const handleMenu = (id: number) => {
        setSelectedBookId(id);
        setIsUDModalVisible(true);
    };

    if (isLoading) {
        return <BasicContainer><p>Loading...</p></BasicContainer>;
    }

    const thumbnails: BasicThumbnailProps[] = bookStore.books.map(book => ({
        label: book.title,
        target_id: book.id as number,
        menu_click_event: handleMenu,
        thumb_img_url: book.book_thumb_path,
        background_color: '#FFFFFF',
        move_to_where: `/section/book/read?bookId=${book.id}`,
    }));

    const handleUpdate = async() => {
        setUpdateMode(true);
        setIsConfirmVisible(true);
    }

    const handleDelete = async() => {
        setUpdateMode(false);
        setIsConfirmVisible(true);
    }

    const handleShare = async() => {
        alert("공유 버튼 Click");
    }

    const handleFinalConfirm = async() => {
        if(!selectedBookId) {
            setErrorState(new Error("Need selected book id"), "선택된 book id가 없습니다.");
            return;
        }
        if(isUpdateMode)
            await doUpdate(selectedBookId);
        else
            await doDelete(selectedBookId);
        setIsConfirmVisible(false);
    }

    const doUpdate = async(selectedBookId: number) => {
        alert('경로 이동');
        // const book = bookStore.getBook(selectedBookId);
        // if(book){
        //     try{
        //         await updateBook(book);
        //     }catch (err) {
        //         if (err instanceof Error) {
        //             setErrorState(err, `${book.title} 수정 중 오류가 발생했습니다.`);
        //         } else {
        //             setErrorState(new Error('An unknown error occurred'));
        //         }
        //     }
        // }
    }

    const doDelete = async(selectedBookId: number) => {
        try{
            await deleteBook(selectedBookId);
        } catch(err){
            if (err instanceof Error) {
                setErrorState(err, `삭제 중 오류가 발생했습니다.`);
            } else {
                setErrorState(new Error('An unknown error occurred'));
            }
        }
    }

    const handleFinalCancel = () => {
        setIsConfirmVisible(false);
        setIsUDModalVisible(true);
    }

    return (
        <BasicContainer>
            <SearchComponent 
                handleSearch={handleSearch}
                move_path='/section/book/read'
                condition={Number(router.query.sectionId as string)}
            />
            <ThumbListComponent thumbnails={thumbnails} />
            <BasicButton background_color={'green'} label={'Book 추가'} onClick={handleMove} />
            {selectedBookId !== null &&
                <>
                    <UpdateDeleteModal
                        key={`update-delete-${selectedBookId}`}
                        isVisible={isUDModalVisible}
                        title={`${bookStore.getBook(selectedBookId)?.title}의 수정 또는 삭제`}
                        book={bookStore.getBook(selectedBookId)}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                        onShare={handleShare}
                        setIsVisible={setIsUDModalVisible} />
                    <ConfirmModal 
                        key={`confirm-${selectedBookId}`}
                        isVisible={isConfirmVisible}
                        setIsVisible={setIsConfirmVisible} 
                        title={isUpdateMode ? 'Book 수정 확인' : 'Book 삭제 확인'}
                        message={isUpdateMode ? 'Book을 수정 하시겠습니까?' : 'Book을 삭제 하시겠습니까?'}
                        confirmName={isUpdateMode ? '수정' : '삭제'}
                        cancelName='취소'
                        onConfirm={handleFinalConfirm}
                        onCancel={handleFinalCancel} />
                </>
            }
        </BasicContainer>
    );
});

export default LibraryBooks;