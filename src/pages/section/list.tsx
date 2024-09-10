import React, { Suspense, useState, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { authStore, sectionStore } from '@store';
import { fetchSectionList, deleteSection, updateSection, createSection, ISectionNLabel } from '@api/SectionApi';
import { BasicThumbnailProps, BasicButton, BasicContainer } from '@view/atoms';
import { ThumbListComponent } from '@view/compoments';
import { ImageSelectorModal, ImageUpdateDeleteModal, ConfirmModal, useError } from '@view/etc';
import { printLog } from '@util/Utils';
import { ISection } from '@api/SectionApi';
import Router from 'next/router';

const List: React.FC = observer(() => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [isUDModalVisible, setIsUDModalVisible] = useState(false);
  const [isUConfirmModalVisible, setIsUConfirmModalVisible] = useState(false);
  const [isDConfirmModalVisible, setIsDConfirmModalVisible] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState<number | null>(null);
  const [selectedSection, setSelectedSection] = useState<ISectionNLabel | null>(null);
  const { setErrorState } = useError();

  const handleOpenModal = () => setIsModalVisible(true);

  const handleCancel = () => {
    console.log('Modal cancelled');
  };

  const handleConfirm = (s3Path: string, inputValue: string, user_id: number, order: number) => {
    setIsModalVisible(false);
    const section = {
      user_id,
      order,
      label: inputValue,
      sec_thumb_path: s3Path,
    }
    setSelectedSection(section);
    setIsConfirmModalVisible(true);
  };

  const handleDelete = async(id: number) => {
    setSelectedSectionId(id);
    setIsUDModalVisible(false);
    setIsDConfirmModalVisible(true);
  };

  const handleUpdate = async(section: ISection) => {
    // setIsUDModalVisible(false);
    // setSelectedSection(section);
    // setIsUConfirmModalVisible(true);
    Router.push(`/section/update?sectionId=${section.id}`);
  }

  const handleCreateConfirm = async() => {
    if(!selectedSection)
      return;
    try{
      await createSection(selectedSection);
    }catch(error){
      if (error instanceof Error) {
        setErrorState(error, 'section 생성 중 오류가 발생했습니다.');
      } else {
        setErrorState(new Error('An unknown error occurred'));
      }
    }
    setIsConfirmModalVisible(false);
  }

  const handleUpdateConfirm = async() => {
    if(!selectedSection)
      return;
    try{
      await updateSection(selectedSection);
    }catch(error){
      if (error instanceof Error) {
        setErrorState(error, 'section 수정 중 오류가 발생했습니다.');
      } else {
        setErrorState(new Error('An unknown error occurred'));
      }
    }
    setIsUConfirmModalVisible(false);
  }

  const handleDeleteConfirm = async() => {
    if(!selectedSectionId)
      return;
    try{
      await deleteSection(selectedSectionId)
    }catch(error){
      if (error instanceof Error) {
        setErrorState(error, 'section 삭제 중 오류가 발생했습니다.');
      } else {
        setErrorState(new Error('An unknown error occurred'));
      }
    }
    setIsDConfirmModalVisible(false);
  }

  const handleCancelConfirm = () => {
    setIsConfirmModalVisible(false);
    setIsModalVisible(true);
  }

  const handleCancelUConfirm = () => {
    setIsUConfirmModalVisible(false);
    setIsUDModalVisible(true);
  }

  const handleCancelDConfirm = () => {
    setIsDConfirmModalVisible(false);
    setIsUDModalVisible(true);
  }

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
    <BasicContainer>
      {authStore.user ? (
        <>
          <BasicButton 
            background_color={'green'} 
            label={'Library 추가'} 
            onClick={handleOpenModal} />
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
              <ConfirmModal 
                isVisible={isConfirmModalVisible}
                setIsVisible={setIsConfirmModalVisible}
                title="Section 추가 확인"
                message="Section을 추가 하시겠습니까?"
                cancelName="취소"
                confirmName="확인"
                onConfirm={handleCreateConfirm}
                onCancel={handleCancelConfirm}
              />
              {selectedSectionId !== null && 
                <>
                  <ImageUpdateDeleteModal
                    key={selectedSectionId}
                    isVisible={isUDModalVisible}
                    title="Section 설정"
                    userId={authStore.user.id}
                    section={sectionStore.getSection(selectedSectionId)}
                    onConfirm={handleUpdate}
                    onCancel={handleCancel}
                    onDelete={handleDelete}
                    setIsVisible={setIsUDModalVisible}
                  />
                  <ConfirmModal 
                    isVisible={isUConfirmModalVisible}
                    setIsVisible={setIsUConfirmModalVisible}
                    title="Section 수정 확인"
                    message="Section을 수정 하시겠습니까?"
                    cancelName="취소"
                    confirmName="수정"
                    onConfirm={handleUpdateConfirm}
                    onCancel={handleCancelUConfirm}
                  />
                  <ConfirmModal 
                    isVisible={isDConfirmModalVisible}
                    setIsVisible={setIsDConfirmModalVisible}
                    title="Section 삭제 확인"
                    message="Section을 삭제 하시겠습니까?"
                    cancelName="취소"
                    confirmName="삭제"
                    onConfirm={handleDeleteConfirm}
                    onCancel={handleCancelDConfirm}
                  />
                </>
              }
            </>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </BasicContainer>
  );
});

export default List;