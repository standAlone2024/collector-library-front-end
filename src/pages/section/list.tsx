import React, { Suspense, useState, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import authStore from '@/stores/authStore';
import styled from 'styled-components';
import { getList } from '@api/SectionApi';
import { ISection } from '@model/ISection';
import { BasicThumbnailProps } from '@/views/atoms';
import { ThumbListComponent } from '@/views/compoments';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 'calc(100% - 64px)'; 
  width: 100%; 
  overflow: 'auto',
`;

const BasicButton = React.lazy(() => import('@view/atoms/BasicButton'));

const List: React.FC = observer(() => {
  const [thumbnails, setThumbnails] = useState<BasicThumbnailProps[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSections = useCallback(async () => {
    try {
      const sections = await getList(authStore.user?.id || 0);
      if (sections) {
        setThumbnails(sectionToThumb(sections));
      }
    } catch (error) {
      console.error('Error fetching sections:', error);
    }
    finally {
      setLoading(false);
    }
  }, [authStore.user?.id]);

  const sectionToThumb = (sections: ISection[]):BasicThumbnailProps[] => {
    const thumbnailProps = sections.map((section: ISection): BasicThumbnailProps => ({
      label: section.label,
      img_url: section.sec_thumb_path,
      background_color: '#FFFFFF', // 또는 원하는 기본 색상 설정
    }));
    return thumbnailProps;
  }

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  const handleAddLibrary = () => {
    alert('추가 modal 생성 예정');
  };

  return (
    <Container>
      {authStore.user ? (
        <p>Welcome, {authStore.user.email}</p>
      ) : (
        <p>Loading...</p>
      )}
      {loading ? (
        <p>Loading sections...</p>
      ) : (
        <Suspense fallback={<div>Loading button...</div>}>
          <ThumbListComponent thumbnails={thumbnails} />
        </Suspense>
      )}
      <BasicButton background_color={'green'} label={'Library 추가'} onClick={handleAddLibrary} />
    </Container>
  );
});

export default List;