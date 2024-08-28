import { BasicBook } from '@view/templates';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import styled from 'styled-components';
import { useError } from '@view/etc';
import { authStore } from '@/stores';

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
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAllData = async() => {
            if (!router.isReady) return;

            const bookId = router.query.bookId;
            if(!bookId || Array.isArray(bookId)) {
                setErrorState(new Error("잘못된 접근입니다."), "잘못된 접근입니다.");
                // TODO: 전화면으로 돌려야 할 듯
                router.push('/section/list');
                return;
            }
            try{
                if(authStore.isLoading)
                    await authStore.loadUser();
            }catch(err) {

            }
        }

        initAllData();
    }, [router, router.isReady, router.query.bookId, setErrorState]);


    const handleOnCreate = async(title: string, thumb_path?: string, description?: string) => {

    }

    if(authStore.isLoading)
        return <Container><p>Loading...</p></Container>;

    return (
        <Container>
            <BasicBook
                userId={authStore.user?.id as number}
                onCreate={handleOnCreate}
                //여기 OptLabel의 data를 받아서 넣어야 함
            />
        </Container>
    )
});

export default LibraryBookCreate;