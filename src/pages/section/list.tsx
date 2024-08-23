import React, { Suspense, useState, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import authStore from '@/stores/authStore';
import styled from 'styled-components';
import { getList } from '@api/SectionApi';
import { ISection } from '@model/ISection';
import { BasicThumbnailProps } from '@view/atoms';
import { ThumbListComponent } from '@view/compoments';
import { ImageSelectorModal } from '@view/etc';
import { printLog } from '@/utils/Utils';

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
  const [loading, setLoading] = useState(true); // section list loading 중

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState<{ path: string; name: string }[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState('');

  const handleOpenModal = () => setIsModalVisible(true);

  const handleCancel = () => {
    console.log('Modal cancelled');
  };

  const handleConfirm = (s3Path: string, inputValue: string) => {
    //일단 새로고침하여 data를 다시 가져오도록
    //TODO Mobx로 수정해야 함
    window.location.reload();
  };

  const fetchSections = useCallback(async () => {
    if (!authStore.isLoading && authStore.user) {
      try {
        const sections = await getList(authStore.user.id);
        if (sections) {
          setThumbnails(sectionToThumb(sections));
        }
      } catch (error) {
        console.error('Error fetching sections:', error);
      } finally {
        setLoading(false);
      }
    }
  }, []);

  const sectionToThumb = (sections: ISection[]):BasicThumbnailProps[] => {
    const thumbnailProps = sections.map((section: ISection): BasicThumbnailProps => ({
      label: section.label,
      img_url: section.sec_thumb_path,
      background_color: '#FFFFFF', // 또는 원하는 기본 색상 설정
    }));
    return thumbnailProps;
  }

  useEffect(() => {
    const initializeAuth = async () => {
      if (authStore.isLoading) {
        await authStore.loadUser();
      }
      fetchSections();
    };

    initializeAuth();
  }, [fetchSections]);
  return (
    <Container>
      {/* {authStore.user ? (
        <>
          <p>Welcome, {authStore.user.email}</p>
        </>
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
      <ImageSelectorModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        title="Section 추가"
        userId={authStore.user.id}
        sectionCount={thumbnails.length}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
      <BasicButton background_color={'green'} label={'Library 추가'} onClick={handleOpenModal} /> */}

      {authStore.user ? (
        <>
          <p>Welcome, {authStore.user.email}</p>
          {loading ? (
            <p>Loading sections...</p>
          ) : (
            <>
              <Suspense fallback={<div>Loading button...</div>}>
                <ThumbListComponent thumbnails={thumbnails} />
              </Suspense>
              <ImageSelectorModal
                isVisible={isModalVisible}
                setIsVisible={setIsModalVisible}
                title="Section 추가"
                userId={authStore.user.id}
                sectionCount={thumbnails.length}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
              />
              <BasicButton background_color={'green'} label={'Library 추가'} onClick={handleOpenModal} />
            </>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
});

export default List;