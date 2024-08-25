import { BasicButton } from '@view/atoms';
import { ThumbListComponent } from '@view/compoments';
import { observer } from 'mobx-react-lite';
import React, { Suspense, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { printLog } from '@util/Utils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 'calc(100% - 64px)'; 
  width: 100%; 
  overflow: 'auto',
`;

const handleMove = () => {
// book/create.tsx로 이동
}

const LibraryBooks: React.FC = observer(() => {
    const router = useRouter();
    const { sectionId } = router.query;

    useEffect(() => {
        if (sectionId) {
            // sectionId를 사용하여 데이터 fetch
            printLog(sectionId);
        }
    }, [sectionId]);

    return (
        <Container>
            {/* TODO: 검색 UI 자리 */}
            <Suspense fallback={<div>Loading button...</div>}>
                {/* <ThumbListComponent thumbnails={} /> */}
            </Suspense>
            <BasicButton background_color={'green'} label={'Library 추가'} onClick={handleMove} />
        </Container>
    )
});

export default LibraryBooks;