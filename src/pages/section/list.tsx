import React, { Suspense, useState, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import authStore from '@store/authStore';
import sectionStore from '@store/sectionStore'
import styled from 'styled-components';
import { fetchSectionList, deleteSection, updateSection } from '@api/SectionApi';
import { BasicThumbnailProps, BasicButton } from '@view/atoms';
import { ThumbListComponent } from '@view/compoments';
import { ImageSelectorModal, ImageUpdateDeleteModal, useError } from '@view/etc';
import { printLog } from '@util/Utils';
import { ISection } from '@/apis/models/ISection';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 'calc(100% - 64px)'; 
  width: 100%; 
  overflow: 'auto',
`;

const List: React.FC = observer(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUDModalVisible, setIsUDModalVisible] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState<number | null>(null);
  const { setErrorState } = useError();

  const handleOpenModal = () => setIsModalVisible(true);

  const handleCancel = () => {
    console.log('Modal cancelled');
  };

  const handleConfirm = (s3Path: string, inputValue: string) => {};

  const handleUpdateConfirm = async(section: ISection) => {
    await updateSection(section);
  };

  const handleDelete = async(id: number) => {
    await deleteSection(id);
  };

  const handleMenu = useCallback((id: number) => {
    setSelectedSectionId(id);
    setIsUDModalVisible(true);
  }, []);

  useEffect(() => {
    const initAllData = async () => {
      if (authStore.isLoading) 
        await authStore.loadUser();
      if (!authStore.isLoading && authStore.user)
        await fetchSectionList(authStore.user.id);
    };

    initAllData();
  }, []);

  const thumbnails: BasicThumbnailProps[] = sectionStore.sections.map(section => ({
    label: section.label,
    target_id: section.id as number,
    menu_click_event: handleMenu,
    thumb_img_url: section.sec_thumb_path,
    background_color: '#FFFFFF',
    move_to_where: `/section/book/list?sectionId=${section.id}`,
  }));

  return (
    <Container>
      {authStore.user ? (
        <>
          <p>Welcome, {authStore.user.email}</p>
          {sectionStore.loading ? (
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
                sectionCount={sectionStore.sections.length}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
              />
              {selectedSectionId !== null && 
                <ImageUpdateDeleteModal
                  key={selectedSectionId}
                  isVisible={isUDModalVisible}
                  title="Section 설정"
                  userId={authStore.user.id}
                  section={sectionStore.getSection(selectedSectionId)}
                  onConfirm={handleUpdateConfirm}
                  onCancel={handleCancel}
                  onDelete={handleDelete}
                  setIsVisible={setIsUDModalVisible}
                />
              }
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